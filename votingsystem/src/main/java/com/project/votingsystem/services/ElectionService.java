package com.project.votingsystem.services;

import com.project.votingsystem.models.Election;
import com.project.votingsystem.repositories.ElectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ElectionService {

    @Autowired
    private ElectionRepository electionRepository;

    public Election createElection(Election election) {
        return electionRepository.save(election);
    }

    public List<Election> getAllElections() {
        return electionRepository.findAll();
    }

    public Election getElectionById(String id) {
        return electionRepository.findById(id).orElseThrow(() -> new RuntimeException("Election not found"));
    }
}
