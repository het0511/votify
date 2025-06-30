package com.project.votingsystem.dtos;

public class CandidateRequestDTO {
    private String constituency;
    private String electionId = "1"; // default value

    public String getConstituency() {
        return constituency;
    }

    public void setConstituency(String constituency) {
        this.constituency = constituency;
    }

    public String getElectionId() {
        return electionId;
    }

    public void setElectionId(String electionId) {
        this.electionId = electionId;
    }
}
