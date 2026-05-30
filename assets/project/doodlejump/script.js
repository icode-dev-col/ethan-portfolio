// ============================================
// SECTION 1: GAME VARIABLES
// ============================================

// Game container dimensions
const gameWidth = 400;
const gameHeight = 600;

// Player variables
let player = {
    x: 175,  // Starting x position (center)
    y: 450,  // Starting y position
    width: 50,
    height: 50,
    velocityY: 0,  // Vertical speed
    velocityX: 5,
    jumpPower: -15  // Jump strength (negative = up)
};

// Game state variables
let score = 0;
let gameRunning = false;
let platforms = [];
let camera = 0;  // For scrolling effect

// Movement variables
let moveLeft = false;
let moveRight = false;

// Get HTML elements
const playerElement = document.getElementById('player');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const startScreenElement = document.getElementById('startScreen');
const gameContainer = document.getElementById('gameContainer');

// ============================================
// SECTION 2: PLATFORM MANAGEMENT
// ============================================

// Create a single platform
function createPlatform(x, y) {
    const isBreakable = Math.random() < 0.2; // 20% chance of being breakable
    const isBouncy = Math.random() < 0.15; // 15% chance of being bouncy
    const platform = {
        x: x,
        y: y,
        width: Math.random() * 40 + 50,
        height: 15,
        element: null,
        isBreakable: isBreakable,
        isBouncy: isBouncy,
        isBroken: false,
        isSpeedBoost: false
    };

    // Create HTML element for platform
    const platformElement = document.createElement('div');
    platformElement.className = 'platform';
    if (platform.isBreakable) {
        platformElement.classList.add('breaking-platform');
    }
    if (platform.isBouncy) {
        platformElement.classList.add('bouncy-platform');
    }

    if (Math.random() < 0.10) {
        platformElement.classList.add('speed-platform');
        platform.isSpeedBoost = true;
    }

    platformElement.style.left = platform.x + 'px';
    platformElement.style.top = platform.y + 'px';
    gameContainer.appendChild(platformElement);

    platform.element = platformElement;
    return platform;
}

// Initialize platforms at game start
function initializePlatforms() {
    platforms = [];

    // Create starting platforms
    for (let i = 0; i < 7; i++) {
        const x = Math.random() * (gameWidth - 70);
        const y = i * 90 + 50;
        platforms.push(createPlatform(x, y));
    }

    // Make sure there's a platform under the player
    platforms.push(createPlatform(player.x - 10, player.y + player.height));
}

// ============================================
// SECTION 3: PLAYER MOVEMENT
// ============================================

// Handle keyboard input
document.addEventListener('keydown', function (e) {
    const key = e.key
    if (!gameRunning) return;

    if (e.key === 'ArrowLeft' || e.key === 'a') {
        moveLeft = true;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        moveRight = true;
    }
});

document.addEventListener('keyup', function (e) {
    const key = e.key
    
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        moveLeft = false;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        moveRight = false;
    }
});

// Update player position
function updatePlayer() {
    // Apply gravity
    player.velocityY += 0.6;  // Gravity strength
    player.y += player.velocityY;

    // Horizontal movement
    if (moveLeft) {
        player.x -= player.velocityX;
    }
    if (moveRight) {
        player.x += player.velocityX;
    }

    // Wrap around screen edges
    if (player.x < -player.width) {
        player.x = gameWidth;
    } else if (player.x > gameWidth) {
        player.x = -player.width;
    }

    // Update player visual position
    playerElement.style.left = player.x + 'px';
    playerElement.style.top = player.y + 'px';
}

// ============================================
// SECTION 4: COLLISION DETECTION
// ============================================

function checkCollisions() {
    // Only check collisions when falling down
    if (player.velocityY <= 0) return;

    for (let i = platforms.length - 1; i >= 0; i--) {
        let platform = platforms[i];

        // Check collision
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y + player.height < platform.y + platform.height + 10) {

            // Make player jump
            player.velocityY = player.jumpPower;

            // Add score
            if(platform.isBreakable && !platform.isBroken){
                score += 10;
            }else{
                score += 1;
            }
            scoreElement.textContent = 'Score: ' + score;

            // If platform is breakable, break it after bounce
            if (platform.isBreakable && !platform.isBroken) {
                platform.isBroken = true; // Mark as broken to prevent re-trigger
                platform.element.classList.add('breaking'); // Optional CSS animation

                // Remove from array immediately so it stops moving & colliding
                platforms.splice(i, 1);

                // Remove DOM element after short delay for visual effect
                setTimeout(() => {
                    platform.element.remove();
                }, 300);
            }

            if(platform.isBouncy){
                player.velocityY = player.jumpPower * 1.8;
            }else{
                player.velocityY = player.jumpPower;
            }

            if(platform.isSpeedBoost){
                player.velocityX = 8; 
                setTimeout(() => {
                    player.velocityX = 5;
                }, 3000);
            }
        }
    }
}

// ============================================
// SECTION 5: GAME LOOP / START / RESTART
// ============================================

let animationId = null;

function gameLoop() {
    if (!gameRunning) return;

    updatePlayer();
    checkCollisions();

    // Simple camera: if player is above a threshold, move platforms down
    const scrollThreshold = 200;
    if (player.y < scrollThreshold) {
        const dy = scrollThreshold - player.y;
        player.y = scrollThreshold;
        // move platforms down (visually up as player goes up)
        for (let p of platforms) {
            p.y += dy;
            if (p.element) p.element.style.top = p.y + 'px';
        }
        // reward score as we scroll upward
        score += Math.floor(dy);
        scoreElement.textContent = 'Score: ' + score;
    }

    // Remove platforms that went off the bottom
    for (let i = platforms.length - 1; i >= 0; i--) {
        if (platforms[i].y > gameHeight + 50) {
            if (platforms[i].element) platforms[i].element.remove();
            platforms.splice(i, 1);
        }
    }

    // Ensure there's always a handful of platforms
    while (platforms.length < 7) {
        const x = Math.random() * (gameWidth - 70);
        const y = (platforms[0] ? platforms[0].y - 90 : -50) - Math.random() * 50;
        platforms.push(createPlatform(x, y));
    }

    // Game over condition: player falls below the bottom of container
    if (player.y > gameHeight) {
        gameRunning = false;
        gameOverElement.style.display = 'block';
        finalScoreElement.textContent = score;
        cancelAnimationFrame(animationId);
        return;
    }

    animationId = requestAnimationFrame(gameLoop);
}

// Define startGame and restartGame as global function declarations so
// inline onclick attributes in the HTML can access them.
function startGame() {
    startScreenElement.style.display = 'none';
    gameOverElement.style.display = 'none';

    // reset state
    score = 0;
    scoreElement.textContent = 'Score: ' + score;
    player.x = 175;
    player.y = 450;
    player.velocityY = 0;
    player.velocityX = 5;

    // remove existing platforms from DOM
    for (let p of platforms) {
        if (p.element) p.element.remove();
    }
    initializePlatforms();

    gameRunning = true;
    // ensure player element is positioned correctly
    playerElement.style.left = player.x + 'px';
    playerElement.style.top = player.y + 'px';

    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(gameLoop);
}

function restartGame() {
    // For a restart we simply re-run startGame, but keep the UX of showing/hiding screens
    startGame();
}

