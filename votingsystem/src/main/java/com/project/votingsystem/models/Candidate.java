package com.project.votingsystem.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "candidates")
public class Candidate {

    @Id
    private String id;

    private String name;
    private String party;
    private String electionId; // reference to Election

    private String symbol;
    private String constituency;
    private int age;
    private String imageUrl;

    // Constructors
    public Candidate() {}

    public Candidate(String name, String party, String electionId, String symbol,
                     String constituency, int age, String imageUrl) {
        this.name = name;
        this.party = party;
        this.electionId = electionId;
        this.symbol = symbol;
        this.constituency = constituency;
        this.age = age;
        this.imageUrl = imageUrl;
    }

    // Getters and setters
    public String getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getParty() { return party; }
    public void setParty(String party) { this.party = party; }

    public String getElectionId() { return electionId; }
    public void setElectionId(String electionId) { this.electionId = electionId; }

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }

    public String getConstituency() { return constituency; }
    public void setConstituency(String constituency) { this.constituency = constituency; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
