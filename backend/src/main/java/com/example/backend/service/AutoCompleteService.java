package com.example.backend.service;

import com.example.backend.entity.Word;
import com.example.backend.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AutoCompleteService {

    private final WordRepository wordRepository;
    Map<Integer, Trie> trieUserMap = new HashMap<>();

    public void insert(String word, int userId) {
        Trie trie = trieUserMap.get(userId);
        trie.insert(word);
    }

    public void build(int userId) {
        Trie trie = new Trie();
        List<Word> words = wordRepository.findAllByUser_Id(userId);
        trie.buildTrie(words);
        trieUserMap.put(userId, trie);
    }

    public void updateDatabase(int userId) {
        Trie trie = trieUserMap.get(userId);
        List<Word> words = trie.toWordList(userId);
        wordRepository.saveAll(words);
        trieUserMap.remove(userId);
    }

    public List<String> autoComplete(String prefix, int userId) {
        Trie trie = trieUserMap.get(userId);
        return trie.autoComplete(prefix);
    }

}
