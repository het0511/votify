import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useUserStore } from '../store/userStore';
import { User } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Users, User as UserIcon, Trash2, AlertCircle, Check } from 'lucide-react';
import { useCandidateStore } from '../store/candidateStore';

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const { users, fetchUsers, updateUserRole, deleteUser, isLoading } = useUserStore();
  const { candidates, fetchCandidates, voteResults, fetchResults } = useCandidateStore();

  const [activeTab, setActiveTab] = useState('users');
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [sortByVotes, setSortByVotes] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchCandidates();
    fetchResults("1");
  }, [fetchUsers, fetchCandidates, fetchResults]);

  const handleRoleChange = (userId: string, newRole: 'voter' | 'admin') => {
    updateUserRole(userId, newRole);
    fetchUsers();
    setNotification({
      type: 'success',
      message: `User role updated to ${newRole} successfully`
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const confirmDeleteUser = (user: User) => {
    setUserToDelete(user);
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      fetchUsers();
      setNotification({
        type: 'success',
        message: `User ${userToDelete.username} deleted successfully`
      });
      setUserToDelete(null);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const sortedCandidates = [...candidates].sort((a, b) => {
    const votesA = voteResults[a.id] ?? 0;
    const votesB = voteResults[b.id] ?? 0;
    return sortByVotes ? votesB - votesA : 0;
  });

  if (isLoading && users.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage users and monitor voting results.
          </p>

          {notification && (
            <div className={`mt-4 p-4 rounded-lg border flex items-center
              ${notification.type === 'success' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
              {notification.type === 'success' ? (
                <Check className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              )}
              <span className={notification.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                {notification.message}
              </span>
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'users'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                onClick={() => setActiveTab('users')}
              >
                <Users className="inline-block mr-2 h-5 w-5" />
                Registered Users
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'candidates'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                onClick={() => setActiveTab('candidates')}
              >
                <UserIcon className="inline-block mr-2 h-5 w-5" />
                Candidates & Results
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'users' ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <select
                          value={user.role.toLowerCase()}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as 'voter' | 'admin')}
                          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          disabled={user.role.toLowerCase() === 'admin'}
                        >
                          <option value="voter">Voter</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => confirmDeleteUser(user)}
                          className={`hover:text-red-800 focus:outline-none transition-colors duration-200 ${user.role.toLowerCase() === 'admin'
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-red-600'}`}
                          disabled={user.role.toLowerCase() === 'admin'}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setSortByVotes(!sortByVotes)}
                className="px-4 py-2 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
              >
                {sortByVotes ? 'Clear Sort' : 'Sort by Vote Count'}
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Candidate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Party
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Votes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedCandidates.map(candidate => (
                      <tr key={candidate.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={candidate.imageUrl}
                                alt={candidate.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {candidate.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <img
                              src={candidate.symbol}
                              alt="Party Symbol"
                              className="w-8 h-8 object-contain"
                            />
                            <span className="text-sm text-gray-900">{candidate.party}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {voteResults[candidate.id] ?? 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete user <span className="font-medium">{userToDelete.username}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
