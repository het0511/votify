import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Vote } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import FormInput from '../components/ui/FormInput';
import Select from 'react-select';
import { CONSTITUENCIES } from '../data/constituencies';

const Register = () => {
  const [username, setUsername] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [constituency, setConstituency] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  const { register, isLoading, error, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    if (!/^\d{12}$/.test(aadhaar)) {
      setFormError('Aadhaar number must be exactly 12 digits');
      return;
    }

    if (!constituency.trim()) {
      setFormError('Constituency is required');
      return;
    }

    // Make sure your register() accepts all four args (username, email, password, aadhaar)
    register(username, email, password, aadhaar, constituency);
  };

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-700 to-primary-900 px-4 sm:px-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="flex justify-center mb-8">
              <div className="p-3 rounded-full bg-primary-100">
                <Vote size={36} className="text-primary-700" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
              Create a new account
            </h2>

            {(error || formError) && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                {error || formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />

              <FormInput
                label="Aadhaar Number"
                type="text"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                placeholder="12-digit Aadhaar"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Constituency</label>
                <Select
                  options={CONSTITUENCIES.map(c => ({ label: c, value: c }))}
                  onChange={(option) => setConstituency(option?.value || '')}
                  placeholder="Select your constituency"
                  isSearchable
                  className="text-sm"
                />
              </div>

              <FormInput
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
              />

              <FormInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />

              <FormInput
                label="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
              />

              <Button type="submit" fullWidth isLoading={isLoading}>
                Sign up
              </Button>
            </form>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
