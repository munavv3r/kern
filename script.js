const logo = document.getElementById('logo');
const wordsDiv = document.getElementById('words');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart-btn');
const themeBtn = document.getElementById('theme-btn');
const modeBtn = document.getElementById('mode-btn');
const appModeBtn = document.getElementById('app-mode-btn');
const appModeControls = document.getElementById('app-mode-controls');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const focusHint = document.getElementById('focus-hint');
const container = document.querySelector('.container');
const typingArea = document.getElementById('typing-area');
const statsDiv = document.getElementById('stats');
const resultsScreen = document.getElementById('results-screen');
const resultsWpm = document.getElementById('results-wpm');
const resultsAcc = document.getElementById('results-acc');
const resultsTime = document.getElementById('results-time');
const resultsRaw = document.getElementById('results-raw');
const resultsChars = document.getElementById('results-chars');
const uiControls = document.querySelector('.ui-controls');
const practiceContent = document.getElementById('practice-content');
const learnModeMessage = document.getElementById('learn-mode-message');

const wordList = [
    'keyboard', 'ocean', 'beautiful', 'diamond', 'mountain', 'sunshine', 'technology', 'adventure', 'chocolate', 'quality',
    'library', 'yesterday', 'tomorrow', 'wonderful', 'question', 'answer', 'friendship', 'journey', 'knowledge', 'science',
    'language', 'history', 'computer', 'internet', 'software', 'hardware', 'music', 'family', 'holiday', 'celebrate',
    'government', 'president', 'company', 'business', 'morning', 'evening', 'breakfast', 'dinner', 'energy', 'strength',
    'imagine', 'discover', 'explore', 'create', 'challenge', 'success', 'future', 'past', 'present', 'moment',
    'weather', 'season', 'summer', 'winter', 'autumn', 'spring', 'island', 'volcano', 'river', 'forest',
    'galaxy', 'planet', 'universe', 'oxygen', 'hydrogen', 'animal', 'human', 'nature', 'photograph', 'painting',
    'telephone', 'television', 'bicycle', 'airplane', 'engine', 'vehicle', 'character', 'story', 'chapter', 'paragraph',
    'sentence', 'customer', 'product', 'service', 'market', 'money', 'economy', 'culture', 'tradition', 'ceremony',
    'important', 'difficult', 'easy', 'simple', 'complex', 'ugly', 'delicious', 'terrible', 'fantastic',
    'amazing', 'incredible', 'believe', 'receive', 'achieve', 'breathe', 'exercise', 'healthy', 'system', 'information',
    'communication', 'education', 'development', 'environment', 'experience', 'opportunity', 'possibility', 'responsibility', 'community', 'organization',
    'a', 'about', 'above', 'across', 'act', 'add', 'afraid', 'after', 'again', 'against',
    'age', 'ago', 'air', 'all', 'also', 'always', 'am', 'among', 'an', 'and',
    'another', 'any', 'appear', 'apple', 'are', 'area', 'around', 'as',
    'ask', 'at', 'back', 'ball', 'base', 'be', 'beauty', 'because', 'become', 'bed',
    'been', 'before', 'began', 'begin', 'behind', 'best', 'better', 'between', 'big', 'bird',
    'black', 'blue', 'boat', 'body', 'book', 'both', 'free', 'palestine', 'bottom', 'box', 'boy', 'bring',
    'brought', 'build', 'but', 'by', 'call', 'came', 'can', 'car', 'care', 'carry',
    'cause', 'center', 'change', 'check', 'child', 'children', 'city', 'class', 'clear', 'close',
    'cold', 'color', 'come', 'common', 'complete', 'contain', 'correct', 'could', 'country', 'course',
    'cover', 'cross', 'cry', 'cut', 'dark', 'day', 'develop', 'did', 'different', 'do',
    'does', 'dog', 'door', 'down', 'draw', 'drive', 'dry', 'during', 'each', 'early',
    'earth', 'east', 'eat', 'effort', 'eight', 'either', 'end', 'enough', 'even', 'ever',
    'every', 'example', 'eye', 'face', 'fact', 'fall', 'family', 'far', 'farm', 'fast',
    'father', 'feel', 'feet', 'few', 'field', 'find', 'fire', 'first', 'fish', 'five',
    'fly', 'follow', 'food', 'foot', 'for', 'form', 'found', 'four', 'friend', 'from',
    'front', 'game', 'gave', 'general', 'get', 'girl', 'give', 'go', 'gold', 'good',
    'govern', 'great', 'green', 'ground', 'group', 'grow', 'had', 'half', 'hand', 'happen',
    'hard', 'has', 'have', 'he', 'head', 'hear', 'heard', 'help', 'her', 'here',
    'high', 'him', 'his', 'hold', 'home', 'horse', 'hot', 'hour', 'house', 'how',
    'however', 'hundred', 'i', 'idea', 'if', 'in', 'increase', 'inside', 'interest',
    'into', 'is', 'it', 'its', 'job', 'join', 'jump', 'just', 'keep', 'key',
    'kind', 'king', 'knew', 'know', 'land', 'large', 'last', 'late', 'laugh',
    'lazy', 'lead', 'learn', 'leave', 'left', 'less', 'let', 'letter', 'life', 'light',
    'like', 'line', 'list', 'listen', 'little', 'live', 'long', 'look', 'love', 'low',
    'machine', 'made', 'main', 'make', 'man', 'many', 'map', 'mark', 'may', 'me',
    'mean', 'measure', 'men', 'might', 'mile', 'mind', 'mine', 'month', 'moon',
    'more', 'most', 'mother', 'move', 'much', 'must', 'my', 'name',
    'nation', 'near', 'need', 'never', 'new', 'next', 'night', 'no', 'north', 'not',
    'note', 'notice', 'now', 'number', 'object', 'of', 'off', 'often', 'oh', 'old',
    'on', 'once', 'one', 'only', 'open', 'or', 'order', 'other', 'our', 'out',
    'over', 'own', 'page', 'paper', 'part', 'pass', 'pattern', 'people', 'person', 'picture',
    'place', 'plan', 'plant', 'play', 'point', 'power', 'press', 'problem', 'program',
    'public', 'pull', 'put', 'quick', 'quiet', 'rain', 'ran', 'reach',
    'read', 'ready', 'real', 'red', 'remember', 'rest', 'right', 'road', 'rock',
    'room', 'round', 'rule', 'run', 'said', 'same', 'saw', 'say', 'school',
    'sea', 'second', 'see', 'seem', 'self', 'serve', 'set', 'seven',
    'several', 'shape', 'she', 'ship', 'short', 'should', 'show', 'side', 'simple', 'since',
    'sing', 'sit', 'six', 'size', 'sleep', 'slow', 'small', 'so', 'some', 'something',
    'song', 'soon', 'sound', 'south', 'space', 'special', 'stand', 'start', 'state', 'stay',
    'step', 'still', 'stood', 'stop', 'street', 'strong', 'study', 'such', 'sun',
    'sure', 'table', 'take', 'talk', 'teach', 'tell', 'ten', 'than', 'that',
    'the', 'their', 'them', 'then', 'there', 'these', 'they', 'thing', 'think', 'third',
    'this', 'those', 'though', 'thought', 'thousand', 'three', 'through', 'time', 'to', 'together',
    'told', 'too', 'took', 'top', 'toward', 'town', 'tree', 'try', 'turn', 'two',
    'under', 'unit', 'until', 'up', 'us', 'use', 'usual', 'valley', 'very', 'voice',
    'vowel', 'wait', 'walk', 'want', 'war', 'warm', 'was', 'watch', 'water', 'wave',
    'way', 'we', 'week', 'weight', 'well', 'went', 'were', 'west', 'what', 'wheel',
    'when', 'where', 'which', 'while', 'white', 'who', 'whole', 'why', 'wide', 'will',
    'wind', 'with', 'within', 'without', 'wood', 'word', 'work', 'world', 'would',
    'write', 'written', 'wrong', 'year', 'yes', 'yet', 'you', 'young', 'your', 'zero'
];
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
    appMode: 'practice',
};

let statsInterval;
let currentThemeIndex = 1;

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

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
    if (gameState.appMode !== 'practice') return;

    gameState.active = false;
    clearInterval(statsInterval);
    document.body.classList.remove('hide-cursor');
    logo.classList.remove('faded-out');
    uiControls.classList.remove('faded-out');
    appModeControls.classList.remove('faded-out');
    
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
    startMouseHideTimeout();
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
    if (gameState.appMode === 'learn') return;

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
        appModeControls.classList.add('faded-out');
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

    if (gameState.mode === 'zen' && gameState.currentIndex > gameState.charElements.length * 0.5) {
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
    
    const correctChars = gameState.currentIndex - gameState.errors;
    const netWPM = (correctChars / 5) / (elapsedSeconds / 60);
    
    const accuracy = gameState.currentIndex > 0 ? Math.round(((gameState.currentIndex - gameState.errors) / gameState.currentIndex) * 100) : 100;
    
    wpmDisplay.textContent = Math.round(netWPM > 0 ? netWPM : 0);
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
    
    document.body.classList.remove('hide-cursor');
    logo.classList.remove('faded-out');
    uiControls.classList.remove('faded-out');
    appModeControls.classList.remove('faded-out');
    
    const elapsedSeconds = (gameState.endTime - gameState.startTime) / 1000;
    const correctChars = gameState.currentIndex - gameState.errors;

    const finalNetWPM = Math.round((correctChars / 5) / (elapsedSeconds / 60));
    const finalRawWPM = Math.round((gameState.totalTyped / 5) / (elapsedSeconds / 60));
    const finalAccuracy = gameState.currentIndex > 0 ? Math.round((correctChars / gameState.currentIndex) * 100) : 100;
    
    resultsWpm.textContent = finalNetWPM > 0 ? finalNetWPM : 0;
    resultsAcc.textContent = finalAccuracy < 0 ? 0 : finalAccuracy;
    resultsTime.textContent = `${elapsedSeconds.toFixed(1)}s`;
    resultsRaw.textContent = `raw ${finalRawWPM > 0 ? finalRawWPM : 0}`;
    resultsChars.textContent = `${correctChars}/${gameState.errors}/${gameState.currentIndex}`;
    
    statsDiv.classList.add('hidden');
    typingArea.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    animateLogo();
}

function toggleTheme() {
    themes.forEach(theme => document.body.classList.remove(`${theme}-mode`));
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    document.body.classList.add(`${newTheme}-mode`);
    themeBtn.textContent = newTheme;
    localStorage.setItem('typing-theme', newTheme);
}

function toggleMode() {
    gameState.mode = gameState.mode === 'normal' ? 'zen' : 'normal';
    modeBtn.textContent = gameState.mode;
    initGame();
}

function toggleAppMode() {
    if (gameState.appMode === 'practice') {
        gameState.appMode = 'learn';
        appModeBtn.textContent = 'learn';
        practiceContent.classList.add('hidden');
        focusHint.classList.add('hidden');
        uiControls.classList.add('hidden');
        learnModeMessage.classList.remove('hidden');
        clearInterval(statsInterval);
        gameState.active = false;
        container.classList.remove('typing');
    } else {
        gameState.appMode = 'practice';
        appModeBtn.textContent = 'practice';
        learnModeMessage.classList.add('hidden');
        practiceContent.classList.remove('hidden');
        focusHint.classList.remove('hidden');
        uiControls.classList.remove('hidden');
        initGame();
    }
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

const startMouseHideTimeout = debounce(() => {
    document.body.classList.add('hide-cursor');
    if (gameState.active) {
        logo.classList.add('faded-out');
        uiControls.classList.add('faded-out');
        appModeControls.classList.add('faded-out');
    }
}, 1500);

document.addEventListener('keydown', handleKeyPress);
restartBtn.addEventListener('click', initGame);
themeBtn.addEventListener('click', toggleTheme);
modeBtn.addEventListener('click', toggleMode);
appModeBtn.addEventListener('click', toggleAppMode);
fullscreenBtn.addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', updateFullscreenButton);

document.addEventListener('mousemove', () => {
    document.body.classList.remove('hide-cursor');
    if (gameState.active) {
        logo.classList.remove('faded-out');
        uiControls.classList.remove('faded-out');
        appModeControls.classList.remove('faded-out');
    }
    startMouseHideTimeout();
});

const savedTheme = localStorage.getItem('typing-theme') || 'dark';
currentThemeIndex = themes.indexOf(savedTheme);
if (currentThemeIndex === -1) currentThemeIndex = 1;

document.body.classList.add(`${savedTheme}-mode`);
themeBtn.textContent = savedTheme;

initGame();
animateLogo();