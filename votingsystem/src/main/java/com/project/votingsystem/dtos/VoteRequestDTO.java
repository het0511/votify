package com.project.votingsystem.dtos;

public class VoteRequestDTO {
    private String voterId;
    private String candidateId;
    private String electionId;

    public VoteRequestDTO() {}

    public VoteRequestDTO(String voterId, String candidateId, String electionId) {
        this.voterId = voterId;
        this.candidateId = candidateId;
        this.electionId = electionId;
    }

    public String getVoterId() {
        return voterId;
    }

    public void setVoterId(String voterId) {
        this.voterId = voterId;
    }

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public String getElectionId() {
        return electionId;
    }

    public void setElectionId(String electionId) {
        this.electionId = electionId;
    }
}