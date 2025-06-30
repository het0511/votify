package com.project.votingsystem.controllers;

import com.project.votingsystem.dtos.CandidateRequestDTO;
import com.project.votingsystem.models.Candidate;
import com.project.votingsystem.services.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @PostMapping
    public ResponseEntity<List<Candidate>> getCandidatesForVoter(@RequestBody CandidateRequestDTO request) {
        String constituency = request.getConstituency();
        String electionId = request.getElectionId(); // will default to "1" if not provided

        if (constituency == null || constituency.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        List<Candidate> candidates = candidateService.getCandidatesByConstituencyAndElection(constituency, electionId);
        return ResponseEntity.ok(candidates);
    }
}
