package com.project.votingsystem.services;

import com.project.votingsystem.models.Block;
import com.project.votingsystem.repositories.BlockRepository;
import com.project.votingsystem.utils.HashUtil;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BlockchainService {

    @Autowired
    private BlockRepository blockRepository;

    public Block getLatestBlock() {
        return blockRepository.findTopByOrderByIndexDesc()
                .orElseGet(this::createGenesisBlock);
    }

    private Block createGenesisBlock() {
        Block genesis = new Block(
                0,
                "0",
                "0",
                "0",
                "GENESIS", 
                System.currentTimeMillis(),
                "GENESIS",
                "GENESIS"
        );
        return blockRepository.save(genesis);
    }

    public boolean hasVoted(String voterIdHash, String electionId) {
        return blockRepository.existsByVoterIdHashAndElectionId(voterIdHash, electionId);
    }

    public boolean checkVoted(String voterId, String electionId) {
        String voterIdHash = HashUtil.applySha256(voterId);
        return blockRepository.existsByVoterIdHashAndElectionId(voterIdHash, electionId);
    }

    public Block addVote(String voterId, String candidateId, String electionId) {
        String voterHash = HashUtil.applySha256(voterId);
        if (hasVoted(voterHash, electionId)) {
            throw new RuntimeException("Voter has already voted in this election");
        }

        Block lastBlock = getLatestBlock();
        int newIndex = lastBlock.getIndex() + 1;
        long timestamp = System.currentTimeMillis();

        String dataToHash = newIndex + lastBlock.getCurrentHash() + voterHash + candidateId + electionId + timestamp;
        String newHash = HashUtil.applySha256(dataToHash);

        Block newBlock = new Block(
                newIndex,
                lastBlock.getCurrentHash(),
                newHash,
                voterHash,
                candidateId,
                timestamp,
                electionId,
                "VOTE"
        );
        return blockRepository.save(newBlock);
    }

    public List<Block> getVotesByElection(String electionId) {
        return blockRepository.findByElectionId(electionId);
    }

    public Map<String, Long> getResultsByElection(String electionId) {
        return getVotesByElection(electionId).stream()
            .filter(block -> "VOTE".equals(block.getType()))
            .collect(Collectors.groupingBy(Block::getCandidateId, Collectors.counting()));
    }
    
    public boolean isChainValid() {
        List<Block> chain = blockRepository.findAll().stream()
                .sorted((a, b) -> Integer.compare(a.getIndex(), b.getIndex()))
                .collect(Collectors.toList());

        for (int i = 1; i < chain.size(); i++) {
            Block current = chain.get(i);
            Block previous = chain.get(i - 1);

            if (!current.getPreviousHash().equals(previous.getCurrentHash())) {
                System.out.println("❌ Chain broken at index " + current.getIndex() + ": previousHash mismatch.");
                return false;
            }

            String expectedHash = recalculateHash(current);
            if (!current.getCurrentHash().equals(expectedHash)) {
                System.out.println("Chain broken at index " + current.getIndex() + ": currentHash mismatch.");
                return false;
            }
        }

        System.out.println("Blockchain is valid.");
        return true;
    }

    private String recalculateHash(Block block) {
        String dataToHash = block.getIndex() +
                block.getPreviousHash() +
                block.getVoterIdHash() +
                block.getCandidateId() +
                block.getElectionId() +
                block.getTimestamp();
        return HashUtil.applySha256(dataToHash);
    }

    // Check at startup
    @PostConstruct
    public void verifyChainOnStartup() {
        if (!isChainValid()) {
            throw new IllegalStateException("Blockchain is tampered or corrupted!");
        }
    }
}
