package com.project.votingsystem.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "blocks")
public class Block {

    @Id
    private String id;  

    private int index;
    private String previousHash;
    private String currentHash;
    private String voterIdHash;  // hashed voter id for privacy
    private String candidateId;
    private long timestamp;

    private String electionId;  // which election this vote/block belongs to
    private String type;        // e.g., "GENESIS", "VOTE"

    public Block() {}

    public Block(int index, String previousHash, String currentHash, String voterIdHash,
                 String candidateId, long timestamp, String electionId, String type) {
        this.index = index;
        this.previousHash = previousHash;
        this.currentHash = currentHash;
        this.voterIdHash = voterIdHash;
        this.candidateId = candidateId;
        this.timestamp = timestamp;
        this.electionId = electionId;
        this.type = type;
    }

    // Getters and setters

    public String getId() {
        return id;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getPreviousHash() {
        return previousHash;
    }

    public void setPreviousHash(String previousHash) {
        this.previousHash = previousHash;
    }

    public String getCurrentHash() {
        return currentHash;
    }

    public void setCurrentHash(String currentHash) {
        this.currentHash = currentHash;
    }

    public String getVoterIdHash() {
        return voterIdHash;
    }

    public void setVoterIdHash(String voterIdHash) {
        this.voterIdHash = voterIdHash;
    }

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public String getElectionId() {
        return electionId;
    }

    public void setElectionId(String electionId) {
        this.electionId = electionId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
