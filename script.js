const logo = document.getElementById('logo');
const wordsDiv = document.getElementById('words');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart-btn');
const themeBtn = document.getElementById('theme-btn');
const modeBtn = document.getElementById('mode-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const focusHint = document.getElementById('focus-hint');
const container = document.querySelector('.container');
const typingArea = document.getElementById('typing-area');
const statsDiv = document.getElementById('stats');
const resultsScreen = document.getElementById('results-screen');
const resultsWpm = document.getElementById('results-wpm');
const resultsAcc = document.getElementById('results-acc');
const resultsTime = document.getElementById('results-time');
const resultsChars = document.getElementById('results-chars');
const uiControls = document.querySelector('.ui-controls');

const wordList = [ 'the', 'be', 'of', 'and', 'a', 'to', 'in', 'he', 'have', 'it', 'that', 'for', 'they', 'I', 'with', 'as', 'not', 'on', 'she', 'at', 'by', 'this', 'we', 'you', 'do', 'but', 'from', 'or', 'which', 'one', 'would', 'all', 'will', 'there', 'say', 'who', 'make', 'when', 'can', 'more', 'if', 'no', 'man', 'out', 'other', 'so', 'what', 'time', 'up', 'go', 'about', 'than', 'into', 'could', 'state', 'only', 'new', 'year', 'some', 'take', 'come', 'these', 'know', 'see', 'use', 'get', 'like', 'then', 'first', 'any', 'work', 'now', 'may', 'such', 'give', 'over', 'think', 'most', 'even', 'find', 'day', 'also', 'after', 'way', 'many', 'must', 'look', 'before', 'great', 'back', 'through', 'long', 'where', 'much', 'should', 'well', 'people', 'down', 'own', 'just', 'because', 'good', 'each', 'those', 'feel', 'seem', 'how', 'high', 'too', 'place', 'little', 'world', 'very', 'still', 'nation', 'hand', 'old', 'life', 'tell', 'write', 'become', 'here', 'show', 'house', 'both', 'between', 'need', 'mean', 'call', 'develop', 'under', 'last', 'right', 'move', 'thing', 'general', 'school', 'never', 'same', 'another', 'begin', 'while', 'number', 'part', 'turn', 'real', 'leave', 'might', 'want', 'point', 'form', 'off', 'child', 'few', 'small', 'since', 'against', 'ask', 'late', 'home', 'interest', 'large', 'person', 'end', 'open', 'public', 'follow', 'during', 'present', 'without', 'again', 'hold', 'govern', 'around', 'possible', 'head', 'consider', 'word', 'program', 'problem', 'however', 'lead', 'system', 'set', 'order', 'eye', 'plan', 'run', 'keep', 'face', 'fact', 'group', 'play', 'stand', 'increase', 'early', 'course', 'change', 'help', 'line' ];
const themes = ['light', 'dark', 'oled'];

const gameState = {
    active: false,
    startTime: null,
    endTime: null,
    charElements: [],
    currentIndex: 0,
    totalTyped: 0,
    errors: 0,
    mode: 'normal',
};

let statsInterval, mouseHideTimeout;
let currentThemeIndex = 1;

function animateLogo() {
    const logoText = "Kern";
    logo.innerHTML = '';
    logo.classList.remove('animate-in');
    logoText.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        logo.appendChild(span);
    });
    setTimeout(() => logo.classList.add('animate-in'), 10);
}

function initGame() {
    gameState.active = false;
    clearInterval(statsInterval);
    clearTimeout(mouseHideTimeout);

    document.body.classList.remove('hide-cursor');
    logo.classList.remove('faded-out');
    uiControls.classList.remove('faded-out');
    
    gameState.currentIndex = 0;
    gameState.totalTyped = 0;
    gameState.errors = 0;
    gameState.charElements = [];
    
    resultsScreen.classList.add('hidden');
    statsDiv.classList.remove('hidden');
    typingArea.classList.remove('hidden');
    container.classList.remove('typing');
    focusHint.classList.add('visible');
    
    wordsDiv.innerHTML = '';
    wordsDiv.style.top = '0px';
    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '100';
    
    const wordCount = gameState.mode === 'normal' ? 30 : 50;
    addWordsToDom(wordCount);
    updateCursor();
    
    mouseHideTimeout = setTimeout(() => document.body.classList.add('hide-cursor'), 2000);
}

function addWordsToDom(count) {
    const fragment = document.createDocumentFragment();
    const words = generateWords(count);

    words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';

        const chars = word.split('').map(char => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char;
            wordDiv.appendChild(span);
            return span;
        });
        const spaceSpan = document.createElement('span');
        spaceSpan.className = 'char';
        spaceSpan.textContent = ' ';
        wordDiv.appendChild(spaceSpan);
        
        fragment.appendChild(wordDiv);
        gameState.charElements.push(...chars, spaceSpan);
    });

    wordsDiv.appendChild(fragment);
}

function generateWords(count) {
    const words = [];
    for (let i = 0; i < count; i++) {
        words.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }
    return words;
}

function handleKeyPress(e) {
    if (!gameState.active && !resultsScreen.classList.contains('hidden')) {
        if (e.key === 'Enter') initGame();
        return;
    }
    if (gameState.currentIndex >= gameState.charElements.length) return;

    if (!gameState.active) {
        gameState.active = true;
        gameState.startTime = new Date();
        statsInterval = setInterval(updateStats, 1000);
        focusHint.classList.remove('visible');
        container.classList.add('typing');
        logo.classList.add('faded-out');
        uiControls.classList.add('faded-out');
    }

    if (e.key.length > 1 && e.key !== 'Backspace') return;
    e.preventDefault();

    if (e.key === 'Backspace') {
        handleBackspace();
    } else {
        handleCharacter(e.key);
    }

    updateCursor();
    checkLineScroll();

    if (gameState.mode === 'zen' && gameState.currentIndex > gameState.charElements.length * 0.7) {
        addWordsToDom(30);
    }
    if (gameState.mode === 'normal' && gameState.currentIndex === gameState.charElements.length - 1) {
        endGame();
    }
}

function handleCharacter(typedChar) {
    const charSpan = gameState.charElements[gameState.currentIndex];
    gameState.totalTyped++;
    if (typedChar === charSpan.textContent) {
        charSpan.classList.add('correct');
    } else {
        charSpan.classList.add('incorrect');
        gameState.errors++;
    }
    gameState.currentIndex++;
}

function handleBackspace() {
    if (gameState.currentIndex > 0) {
        gameState.currentIndex--;
        gameState.totalTyped--;
        const charSpan = gameState.charElements[gameState.currentIndex];
        if (charSpan.classList.contains('incorrect')) {
            gameState.errors--;
        }
        charSpan.className = 'char';
    }
}

function updateCursor() {
    gameState.charElements.forEach(el => el.classList.remove('cursor'));
    if (gameState.currentIndex < gameState.charElements.length) {
        gameState.charElements[gameState.currentIndex].classList.add('cursor');
    }
}

function updateStats() {
    if (!gameState.active) return;
    const elapsedSeconds = (new Date() - gameState.startTime) / 1000;
    const grossWPM = (gameState.totalTyped / 5) / (elapsedSeconds / 60);
    const accuracy = gameState.totalTyped > 0 ? Math.round(((gameState.totalTyped - gameState.errors) / gameState.totalTyped) * 100) : 100;
    
    wpmDisplay.textContent = Math.round(grossWPM > 0 ? grossWPM : 0);
    accuracyDisplay.textContent = accuracy < 0 ? 0 : accuracy;
}

function checkLineScroll() {
    if (gameState.currentIndex > 0 && gameState.charElements[gameState.currentIndex]) {
        const currentWordDiv = gameState.charElements[gameState.currentIndex].parentElement;
        if (currentWordDiv.offsetTop > gameState.charElements[gameState.currentIndex - 1].parentElement.offsetTop) {
            wordsDiv.style.top = `-${currentWordDiv.offsetTop}px`;
        }
    }
}

function endGame() {
    gameState.active = false;
    gameState.endTime = new Date();
    clearInterval(statsInterval);
    clearTimeout(mouseHideTimeout);

    document.body.classList.remove('hide-cursor');
    logo.classList.remove('faded-out');
    uiControls.classList.remove('faded-out');
    
    const elapsedSeconds = (gameState.endTime - gameState.startTime) / 1000;
    const finalWPM = Math.round((gameState.totalTyped / 5) / (elapsedSeconds / 60));
    const finalAccuracy = gameState.totalTyped > 0 ? Math.round(((gameState.totalTyped - gameState.errors) / gameState.totalTyped) * 100) : 100;
    const correctChars = gameState.totalTyped - gameState.errors;
    
    resultsWpm.textContent = finalWPM > 0 ? finalWPM : 0;
    resultsAcc.textContent = finalAccuracy < 0 ? 0 : finalAccuracy;
    resultsTime.textContent = `${elapsedSeconds.toFixed(1)}s`;
    resultsChars.textContent = `${correctChars}/${gameState.errors}/${gameState.totalTyped}`;
    
    statsDiv.classList.add('hidden');
    typingArea.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    animateLogo();
}

function toggleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    document.body.className = newTheme === 'dark' ? '' : `${newTheme}-mode`;
    themeBtn.textContent = newTheme;
    localStorage.setItem('typing-theme', newTheme);
}

function toggleMode() {
    gameState.mode = gameState.mode === 'normal' ? 'zen' : 'normal';
    modeBtn.textContent = gameState.mode;
    initGame();
}

function updateFullscreenButton() {
    fullscreenBtn.textContent = document.fullscreenElement ? 'exit' : 'fullscreen';
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.error(err));
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener('keydown', handleKeyPress);
restartBtn.addEventListener('click', initGame);
themeBtn.addEventListener('click', toggleTheme);
modeBtn.addEventListener('click', toggleMode);
fullscreenBtn.addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', updateFullscreenButton);
document.addEventListener('mousemove', () => {
    document.body.classList.remove('hide-cursor');
    if (gameState.active) {
        logo.classList.remove('faded-out');
        uiControls.classList.remove('faded-out');
    }
    clearTimeout(mouseHideTimeout);
    mouseHideTimeout = setTimeout(() => {
        document.body.classList.add('hide-cursor');
        if (gameState.active) {
            logo.classList.add('faded-out');
            uiControls.classList.add('faded-out');
        }
    }, 1500);
});

const savedTheme = localStorage.getItem('typing-theme') || 'dark';
currentThemeIndex = themes.indexOf(savedTheme);
document.body.className = savedTheme === 'dark' ? '' : `${savedTheme}-mode`;
themeBtn.textContent = savedTheme;

initGame();
animateLogo();