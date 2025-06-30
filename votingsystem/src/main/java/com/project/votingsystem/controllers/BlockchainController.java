package com.project.votingsystem.controllers;

import com.project.votingsystem.dtos.VoteRequestDTO;
import com.project.votingsystem.dtos.VoteCheckRequestDTO;
import com.project.votingsystem.models.Block;
import com.project.votingsystem.services.BlockchainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blockchain")
public class BlockchainController {

    @Autowired
    private BlockchainService blockchainService;

    @PostMapping("/vote")
    public ResponseEntity<?> castVote(@RequestBody VoteRequestDTO voteRequest) {
        try {
            Block voteBlock = blockchainService.addVote(
                voteRequest.getVoterId(),
                voteRequest.getCandidateId(),
                voteRequest.getElectionId()
            );
            return ResponseEntity.ok(voteBlock);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/has-voted")
    public ResponseEntity<?> hasVoted(@RequestBody VoteCheckRequestDTO request) {
        boolean hasVoted = blockchainService.checkVoted(request.getVoterId(), request.getElectionId());
        return ResponseEntity.ok(hasVoted);
    }

    @GetMapping("/votes/{electionId}")
    public ResponseEntity<?> getVotes(@PathVariable String electionId) {
        return ResponseEntity.ok(blockchainService.getVotesByElection(electionId));
    }

    @GetMapping("/results/{electionId}")
    public ResponseEntity<?> getResults(@PathVariable String electionId) {
        return ResponseEntity.ok(blockchainService.getResultsByElection(electionId));
    }
}