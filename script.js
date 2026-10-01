document.getElementById('flamesForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent page refresh

    let name1 = document.getElementById('name1').value.trim();
    let name2 = document.getElementById('name2').value.trim();

    // Validate input first
    if (!name1 || !name2) {
        showResult("❌ Please enter both names.", "error");
        return;
    }

    if (name1.toLowerCase() === name2.toLowerCase()) {
        showResult("❌ Please enter different names.", "error");
        return;
    }

    // Clean names: Convert to lowercase and remove spaces
    name1 = name1.replace(/\s+/g, "").toLowerCase();
    name2 = name2.replace(/\s+/g, "").toLowerCase();

    // Validate Input: Ensure names contain only letters
    if (!/^[a-zA-Z]+$/.test(name1) || !/^[a-zA-Z]+$/.test(name2)) {
        showResult("❌ Please enter valid names (only letters).", "error");
        return;
    }

    // Show loading animation
    showLoading();

    // Simulate processing time for better UX
    setTimeout(() => {
        const result = calculateFlames(name1, name2);
        showResult(result.message, result.type, result.emoji, result.resultType);
        document.getElementById('restartBtn').style.display = 'block';
    }, 1500);
});

function calculateFlames(name1, name2) {
    // Store original names for display
    const originalName1 = name1;
    const originalName2 = name2;

    // Remove common letters (improved algorithm)
    let name1Array = name1.split('');
    let name2Array = name2.split('');

    // Remove common letters more efficiently
    for (let i = name1Array.length - 1; i >= 0; i--) {
        const letter = name1Array[i];
        const index2 = name2Array.indexOf(letter);
        if (index2 !== -1) {
            name1Array.splice(i, 1);
            name2Array.splice(index2, 1);
        }
    }

    // Count remaining letters
    let totalLetters = name1Array.length + name2Array.length;

    // Handle edge case where all letters are common
    if (totalLetters === 0) {
        return {
            message: "💫 Perfect Match! You're meant for each other!",
            type: "perfect",
            emoji: "💫",
            resultType: "perfect"
        };
    }

    // FLAMES options with better descriptions and emojis
    let flames = [
        { name: 'Friendship', emoji: '🤘', description: 'You make great friends!' },
        { name: 'Love', emoji: '❤️', description: 'True love awaits!' },
        { name: 'Affection', emoji: '💕', description: 'Sweet affection between you!' },
        { name: 'Marriage', emoji: '💍', description: 'Wedding bells are ringing!' },
        { name: 'Enemy', emoji: '😈', description: 'Opposites attract... or repel!' },
        { name: 'Siblings', emoji: '👩‍👦', description: 'Like family to each other!' }
    ];

    // Find the FLAMES result using the traditional algorithm
    let index = 0;
    while (flames.length > 1) {
        index = (index + totalLetters - 1) % flames.length;
        flames.splice(index, 1);
    }

    const result = flames[0];
    return {
        message: `${result.emoji} ${result.name} ${result.emoji}\n${result.description}`,
        type: "success",
        emoji: result.emoji,
        resultType: result.name
    };
}

function showResult(message, type, emoji = "", resultType = "") {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = message.replace('\n', '<br>');
    resultElement.className = `text-center mt-3 ${type}`;
    
    // Add animation
    resultElement.classList.add('pulse');
    setTimeout(() => resultElement.classList.remove('pulse'), 600);

    // Play audio based on result type
    if (resultType && type === "success") {
        playResultAudio(resultType);
    }

    // Hide loading if it was showing
    hideLoading();
}

const fallbackResultAudioTracks = window.FLAMES_AUDIO_TRACKS || {
    Friendship: ['Audio/Friendship/Friendship.mp3'],
    Love: ['Audio/Love/Love.mp3'],
    Affection: ['Audio/Affection/Affection.mp3'],
    Marriage: ['Audio/Marriage/Marriage.mp3'],
    Enemy: ['Audio/Enemy/Enemy.mp3'],
    Siblings: ['Audio/Siblings/Siblings.mp3']
};

async function getResultAudioTracks(resultType) {
    const folderPath = `Audio/${resultType}/`;
    const fallbackTracks = fallbackResultAudioTracks[resultType] || [];

    try {
        const response = await fetch(folderPath);
        if (!response.ok) {
            return fallbackTracks;
        }

        const folderDocument = new DOMParser().parseFromString(await response.text(), 'text/html');
        const tracks = Array.from(folderDocument.querySelectorAll('a[href]'))
            .map(link => new URL(link.getAttribute('href'), new URL(folderPath, document.baseURI)).href)
            .filter(track => /\.(mp3|wav|ogg|m4a|aac|webm)(?:[?#]|$)/i.test(track));

        return tracks.length > 0 ? tracks : fallbackTracks;
    } catch (error) {
        return fallbackTracks;
    }
}

async function playResultAudio(resultType) {
    // Check if audio is enabled
    if (!isAudioEnabled) {
        return;
    }

    // For perfect match, play love audio as fallback
    if (resultType === "perfect") {
        resultType = "Love";
    }

    const tracks = await getResultAudioTracks(resultType);
    if (!isAudioEnabled) {
        return;
    }

    if (!tracks || tracks.length === 0) {
        return;
    }

    const audio = document.getElementById('resultAudio');
    const previousTrack = audio.dataset.track;
    let availableTracks = tracks.filter(track => track !== previousTrack);
    if (availableTracks.length === 0) {
        availableTracks = tracks;
    }

    const selectedTrack = availableTracks[Math.floor(Math.random() * availableTracks.length)];
    audio.pause();
    audio.currentTime = 0;
    audio.src = selectedTrack;
    audio.dataset.track = selectedTrack;
    audio.load();
    audio.play().catch(error => {
        console.log('Audio playback failed:', error);
        // This is normal on some browsers due to autoplay policies
    });
}

function showLoading() {
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Calculating... 🔮';
}

function hideLoading() {
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Find Result 🔮';
}

// Restart Button Functionality
document.getElementById('restartBtn').addEventListener('click', function() {
    document.querySelectorAll('audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });

    // Add fade out animation
    const appShell = document.querySelector('.app-shell');
    appShell.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        // Reset fields
        document.getElementById('name1').value = '';
        document.getElementById('name2').value = '';
        document.getElementById('result').innerHTML = '';
        document.getElementById('result').className = 'text-center mt-3';

        // Hide Restart Button
        document.getElementById('restartBtn').style.display = 'none';
        
        // Reset shell animation
        appShell.style.transform = 'scale(1)';
        
        // Focus on first input
        document.getElementById('name1').focus();
    }, 200);
});

// Add input validation and formatting
document.getElementById('name1').addEventListener('input', formatNameInput);
document.getElementById('name2').addEventListener('input', formatNameInput);

function formatNameInput(event) {
    // Remove numbers and special characters as user types
    event.target.value = event.target.value.replace(/[^a-zA-Z\s]/g, '');
}

// Add Enter key support for better UX
document.getElementById('name1').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('name2').focus();
    }
});

document.getElementById('name2').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('flamesForm').dispatchEvent(new Event('submit'));
    }
});

// Audio control functionality
let isAudioEnabled = true;

document.getElementById('audioToggle').addEventListener('click', function() {
    isAudioEnabled = !isAudioEnabled;
    const toggleBtn = document.getElementById('audioToggle');
    
    if (isAudioEnabled) {
        toggleBtn.innerHTML = '🔊 Audio: ON';
        toggleBtn.className = 'btn btn-outline-secondary btn-sm';
    } else {
        toggleBtn.innerHTML = '🔇 Audio: OFF';
        toggleBtn.className = 'btn btn-outline-danger btn-sm';
        // Stop any currently playing audio
        const allAudios = document.querySelectorAll('audio');
        allAudios.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }
});
