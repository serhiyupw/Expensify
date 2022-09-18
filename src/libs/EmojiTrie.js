import emojis from '../../assets/emojis';
import Trie from './Trie';

// Create a Trie object
const emojisTrie = new Trie();

// Inserting all emojis into the Trie object
for (let i = 0; i < emojis.length; i++) {
    if (emojis[i].name) {
        const node = emojisTrie.isWord(emojis[i].name);
        if (!node) {
            emojisTrie.add(emojis[i].name, {code: emojis[i].code, suggestions: []});
        } else {
            emojisTrie.update(emojis[i].name, {code: emojis[i].code, suggestions: node.getMetaData().suggestions});
        }

        if (emojis[i].keywords) {
            for (let j = 0; j < emojis[i].keywords.length; j++) {
                const keywordNode = emojisTrie.isWord(emojis[i].keywords[j]);
                if (!keywordNode) {
                    emojisTrie.add(emojis[i].keywords[j], {suggestions: [{code: emojis[i].code, name: emojis[i].name}]});
                } else {
                    emojisTrie.update(emojis[i].keywords[j],
                        {...keywordNode.getMetaData(), suggestions: [...keywordNode.getMetaData().suggestions, {code: emojis[i].code, name: emojis[i].name}]});
                }
            }
        }
    }
}

export default emojisTrie;
