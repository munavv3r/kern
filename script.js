const wordsDiv = document.getElementById('words');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart-btn');
const themeBtn = document.getElementById('theme-btn');
const modeBtn = document.getElementById('mode-btn');

const wordList = [ 'the', 'be', 'of', 'and', 'a', 'to', 'in', 'he', 'have', 'it', 'that', 'for', 'they', 'I', 'with', 'as', 'not', 'on', 'she', 'at', 'by', 'this', 'we', 'you', 'do', 'but', 'from', 'or', 'which', 'one', 'would', 'all', 'will', 'there', 'say', 'who', 'make', 'when', 'can', 'more', 'if', 'no', 'man', 'out', 'other', 'so', 'what', 'time', 'up', 'go', 'about', 'than', 'into', 'could', 'state', 'only', 'new', 'year', 'some', 'take', 'come', 'these', 'know', 'see', 'use', 'get', 'like', 'then', 'first', 'any', 'work', 'now', 'may', 'such', 'give', 'over', 'think', 'most', 'even', 'find', 'day', 'also', 'after', 'way', 'many', 'must', 'look', 'before', 'great', 'back', 'through', 'long', 'where', 'much', 'should', 'well', 'people', 'down', 'own', 'just', 'because', 'good', 'each', 'those', 'feel', 'seem', 'how', 'high', 'too', 'place', 'little', 'world', 'very', 'still', 'nation', 'hand', 'old', 'life', 'tell', 'write', 'become', 'here', 'show', 'house', 'both', 'between', 'need', 'mean', 'call', 'develop', 'under', 'last', 'right', 'move', 'thing', 'general', 'school', 'never', 'same', 'another', 'begin', 'while', 'number', 'part', 'turn', 'real', 'leave', 'might', 'want', 'point', 'form', 'off', 'child', 'few', 'small', 'since', 'against', 'ask', 'late', 'home', 'interest', 'large', 'person', 'end', 'open', 'public', 'follow', 'during', 'present', 'without', 'again', 'hold', 'govern', 'around', 'possible', 'head', 'consider', 'word', 'program', 'problem', 'however', 'lead', 'system', 'set', 'order', 'eye', 'plan', 'run', 'keep', 'face', 'fact', 'group', 'play', 'stand', 'increase', 'early', 'course', 'change', 'help', 'line' ];

let gameActive = false; let startTime, statsInterval;
let charElements = []; let currentIndex = 0, totalTyped = 0, errors = 0;
let currentGameMode = 'normal';
const themes = ['light', 'dark', 'oled']; let currentThemeIndex = 1;

function initGame() {
    gameActive = false; clearInterval(statsInterval);
    currentIndex = 0; totalTyped = 0; errors = 0; charElements = [];
    wpmDisplay.textContent = '0'; accuracyDisplay.textContent = '100'; wordsDiv.innerHTML = ''; wordsDiv.style.top = '0px';
    const wordCount = currentGameMode === 'normal' ? 30 : 50;
    addWordsToDom(wordCount); updateCursor();
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
    if (!gameActive && currentIndex > 0) return;
    if (currentIndex >= charElements.length && currentGameMode === 'normal') return;
    if (!gameActive) {
        gameActive = true; startTime = new Date(); statsInterval = setInterval(updateStats, 1000);
    }
    if (e.key.length > 1 && e.key !== 'Backspace') return;
    e.preventDefault();
    if (e.key === 'Backspace') { handleBackspace(); } else { handleCharacter(e.key); }
    updateCursor(); checkLineScroll();
    if (currentGameMode === 'zen' && currentIndex > charElements.length * 0.7) { addWordsToDom(30); }
    if (currentGameMode === 'normal' && currentIndex === charElements.length - 1) { gameActive = false; clearInterval(statsInterval); }
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
function updateStats() {
    if (!gameActive) return;
    const elapsedSeconds = (new Date() - startTime) / 1000;
    const grossWPM = (totalTyped / 5) / (elapsedSeconds / 60);
    const accuracy = totalTyped > 0 ? Math.round(((totalTyped - errors) / totalTyped) * 100) : 100;
    wpmDisplay.textContent = Math.round(grossWPM > 0 ? grossWPM : 0);
    accuracyDisplay.textContent = accuracy < 0 ? 0 : accuracy;
}
function checkLineScroll() {
    if (currentIndex > 0 && charElements[currentIndex]) {
        const currentWordDiv = charElements[currentIndex].parentElement;
        if (currentWordDiv.offsetTop > charElements[currentIndex - 1].parentElement.offsetTop) {
            wordsDiv.style.top = `-${currentWordDiv.offsetTop}px`;
        }
    }
}
function handleKeyPress(e) {
    if (currentIndex >= charElements.length) return;
    if (!gameActive) {
        gameActive = true; startTime = new Date(); statsInterval = setInterval(updateStats, 1000);
    }
    if (e.key.length > 1 && e.key !== 'Backspace') return;
    e.preventDefault();
    if (e.key === 'Backspace') { handleBackspace(); } else { handleCharacter(e.key); }
    updateCursor();
    checkLineScroll();
    if (currentIndex === charElements.length - 1) { gameActive = false; clearInterval(statsInterval); }
}
function toggleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    document.body.className = newTheme === 'dark' ? '' : `${newTheme}-mode`;
    themeBtn.textContent = newTheme;
    localStorage.setItem('typing-theme', newTheme);
}
function toggleMode() {
    currentGameMode = currentGameMode === 'normal' ? 'zen' : 'normal';
    modeBtn.textContent = currentGameMode;
    initGame();
}

document.addEventListener('keydown', handleKeyPress);
restartBtn.addEventListener('click', initGame);
themeBtn.addEventListener('click', toggleTheme);
modeBtn.addEventListener('click', toggleMode);

const savedTheme = localStorage.getItem('typing-theme') || 'dark';
currentThemeIndex = themes.indexOf(savedTheme);
document.body.className = savedTheme === 'dark' ? '' : `${savedTheme}-mode`;
themeBtn.textContent = savedTheme;
initGame();