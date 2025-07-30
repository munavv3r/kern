const wordsDiv = document.getElementById('words');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');

const wordList = [ 'the', 'be', 'of', 'and', 'a', 'to', 'in', 'he', 'have', 'it', 'that', 'for', 'they', 'I', 'with', 'as', 'not', 'on', 'she', 'at', 'by', 'this', 'we', 'you', 'do', 'but', 'from', 'or', 'which', 'one', 'would', 'all', 'will', 'there', 'say', 'who', 'make', 'when', 'can', 'more', 'if', 'no', 'man', 'out', 'other', 'so', 'what', 'time', 'up', 'go', 'about', 'than', 'into', 'could', 'state', 'only', 'new', 'year', 'some', 'take', 'come', 'these', 'know', 'see', 'use', 'get', 'like', 'then', 'first', 'any', 'work', 'now', 'may', 'such', 'give', 'over', 'think', 'most', 'even', 'find', 'day', 'also', 'after', 'way', 'many', 'must', 'look', 'before', 'great', 'back', 'through', 'long', 'where', 'much', 'should', 'well', 'people', 'down', 'own', 'just', 'because', 'good', 'each', 'those', 'feel', 'seem', 'how', 'high', 'too', 'place', 'little', 'world', 'very', 'still', 'nation', 'hand', 'old', 'life', 'tell', 'write', 'become', 'here', 'show', 'house', 'both', 'between', 'need', 'mean', 'call', 'develop', 'under', 'last', 'right', 'move', 'thing', 'general', 'school', 'never', 'same', 'another', 'begin', 'while', 'number', 'part', 'turn', 'real', 'leave', 'might', 'want', 'point', 'form', 'off', 'child', 'few', 'small', 'since', 'against', 'ask', 'late', 'home', 'interest', 'large', 'person', 'end', 'open', 'public', 'follow', 'during', 'present', 'without', 'again', 'hold', 'govern', 'around', 'possible', 'head', 'consider', 'word', 'program', 'problem', 'however', 'lead', 'system', 'set', 'order', 'eye', 'plan', 'run', 'keep', 'face', 'fact', 'group', 'play', 'stand', 'increase', 'early', 'course', 'change', 'help', 'line' ];

let charElements = [];
let currentIndex = 0, totalTyped = 0, errors = 0;

function initGame() {
    currentIndex = 0; totalTyped = 0; errors = 0; charElements = [];
    wordsDiv.innerHTML = ''; addWordsToDom(30); updateCursor();
}
function addWordsToDom(count) {
    const words = generateWords(count);
    words.forEach(word => {
        const wordDiv = document.createElement('div'); wordDiv.className = 'word';
        const chars = word.split('').map(char => {
            const span = document.createElement('span'); span.className = 'char'; span.textContent = char; wordDiv.appendChild(span); return span;
        });
        const spaceSpan = document.createElement('span'); spaceSpan.className = 'char'; spaceSpan.textContent = ' '; wordDiv.appendChild(spaceSpan);
        wordsDiv.appendChild(wordDiv); charElements.push(...chars, spaceSpan);
    });
}
function generateWords(count) {
    const words = []; for (let i = 0; i < count; i++) { words.push(wordList[Math.floor(Math.random() * wordList.length)]); } return words;
}

function handleKeyPress(e) {
    if (currentIndex >= charElements.length) return;
    if (e.key.length > 1 && e.key !== 'Backspace') return;
    e.preventDefault();
    if (e.key === 'Backspace') { handleBackspace(); } else { handleCharacter(e.key); }
    updateCursor();
}

function handleCharacter(typedChar) {
    const charSpan = charElements[currentIndex]; totalTyped++;
    if (typedChar === charSpan.textContent) { charSpan.classList.add('correct'); } else { charSpan.classList.add('incorrect'); errors++; }
    currentIndex++;
}

function handleBackspace() {
    if (currentIndex > 0) { currentIndex--; totalTyped--; const charSpan = charElements[currentIndex]; if (charSpan.classList.contains('incorrect')) errors--; charSpan.className = 'char'; }
}

function updateCursor() {
    charElements.forEach(el => el.classList.remove('cursor'));
    if (currentIndex < charElements.length) { charElements[currentIndex].classList.add('cursor'); }
}

document.addEventListener('keydown', handleKeyPress);
initGame();