document.addEventListener('DOMContentLoaded', function() {
    const sortBtn = document.getElementById('sortBtn');
    const jumbledLettersInput = document.getElementById('jumbledLetters');
    const wordResults = document.getElementById('wordResults');
    
    if (sortBtn) {
        sortBtn.addEventListener('click', sortLetters);
    }
    
    function sortLetters() {
        const letters = jumbledLettersInput.value.toLowerCase().replace(/[^a-z]/g, '');
        
        if (!letters) {
            wordResults.innerHTML = '<p>Please enter some letters to sort.</p>';
            return;
        }
        
        // Simple sorting - in a real app you might use a dictionary API
        const sortedLetters = letters.split('').sort().join('');
        
        // Find possible words (this is a simple example)
        const possibleWords = findPossibleWords(letters);
        
        displayResults(possibleWords);
    }
    
    function findPossibleWords(letters) {
        const smallWords = [
            'bad', 'bag', 'bat', 'bed', 'beg', 'bet', 'bid', 'big', 'bit',
            'dad', 'day', 'dig', 'did', 'die', 'eat', 'fed', 'few', 'fit',
            'get', 'got', 'had', 'hat', 'hid', 'hit', 'raw', 'rat', 'red',
            'tie', 'tag', 'tar', 'tea', 'ted', 'tie', 'try', 'wet', 'wit',
            'dirty', 'great', 'water', 'write', 'grew', 'drew', 'tried'
        ];
        
        const letterCounts = {};
        letters.split('').forEach(letter => {
            letterCounts[letter] = (letterCounts[letter] || 0) + 1;
        });
        
        return smallWords.filter(word => {
            const wordLetterCounts = {};
            for (const letter of word) {
                wordLetterCounts[letter] = (wordLetterCounts[letter] || 0) + 1;
                if (!letterCounts[letter] || wordLetterCounts[letter] > letterCounts[letter]) {
                    return false;
                }
            }
            return true;
        });
    }
    
    function displayResults(words) {
        if (words.length === 0) {
            wordResults.innerHTML = '<p>No valid words found from these letters.</p>';
            return;
        }
        
        wordResults.innerHTML = '';
        words.forEach(word => {
            const wordElement = document.createElement('span');
            wordElement.textContent = word;
            wordResults.appendChild(wordElement);
        });
    }
});