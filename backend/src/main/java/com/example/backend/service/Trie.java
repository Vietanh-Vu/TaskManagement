package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.entity.Word;

import java.util.*;

public class Trie {

    private class TrieNode implements Comparable<TrieNode>, Comparator<TrieNode> {
        Integer id;
        Map<Character, TrieNode> children;
        boolean isEndOfWord;
        int frequency;

        public TrieNode() {
            this.children = new HashMap<>();
            this.isEndOfWord = false;
        }

        @Override
        public int compare(TrieNode o1, TrieNode o2) {
            return o1.frequency - o2.frequency;
        }

        @Override
        public int compareTo(TrieNode o) {
            return this.frequency - o.frequency;
        }
    }

    private TrieNode root = new TrieNode();

    public void insert(String word) {
        insert(word, null, null);
    }

    public void insert(String word, Integer frequency, Integer id) {
        TrieNode current = root;

        for (char ch : word.toCharArray()) {
            current.children.putIfAbsent(ch, new TrieNode());
            current = current.children.get(ch);
        }
        if (id != null) {
            current.id = id;
        }
        if (frequency == null) {
            current.frequency++;
        } else {
            current.frequency = frequency;
        }
        current.isEndOfWord = true;
    }

    public List<String> autoComplete(String prefix) {
        List<Word> words = new ArrayList<>();
        TrieNode current = root;

        for (char ch : prefix.toCharArray()) {
            if (!current.children.containsKey(ch)) {
                return List.of();
            }
            current = current.children.get(ch);
        }

        findAllWordsWithPrefix(current, prefix, words);
        words.sort(Comparator.comparingInt(Word::getFrequency).reversed());
        return words.stream().map(Word::getWord).toList();
    }

    private void findAllWordsWithPrefix(TrieNode node, String currentPrefix, List<Word> suggestions) {
        if (node.isEndOfWord) {
            Word word = Word.builder()
                    .word(currentPrefix)
                    .frequency(node.frequency)
                    .id(node.id)
                    .build();
            suggestions.add(word);
        }

        for (Map.Entry<Character, TrieNode> entry : node.children.entrySet()) {
            findAllWordsWithPrefix(entry.getValue(), currentPrefix + entry.getKey(), suggestions);
        }
    }

    public List<Word> toWordList(Integer userId) {
        List<Word> words = new ArrayList<>();
        TrieNode current = root;
        findAllWords(current, "", words, userId);
        return words;
    }

    private void findAllWords(TrieNode current, String s, List<Word> words, Integer userId) {
        if (current.isEndOfWord) {
            Word word = Word.builder()
                    .word(s)
                    .frequency(current.frequency)
                    .id(current.id)
                    .user(User.builder().id(userId).build())
                    .build();
            words.add(word);
        }

        for (Map.Entry<Character, TrieNode> entry : current.children.entrySet()) {
            findAllWords(entry.getValue(), s + entry.getKey(), words, userId);
        }
    }

    public void buildTrie(List<Word> words) {
        for (Word word : words) {
            insert(word.getWord().toLowerCase(), word.getFrequency(), word.getId());
        }
    }
}
