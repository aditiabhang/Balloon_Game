let colors = ['red', 'yellow', 'blue', 'green', 'violet'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let num = 0;
let total = 10;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');

// Function that creates a balloon
function createBalloon () {
    let div = document.createElement('div');
    let rand = Math.floor(Math.random() * colors.length);
    div.className = 'balloon balloon-' + colors[rand];
    
    rand = Math.floor(Math.random() * (windowWidth - 100));
    div.style.left = rand + 'px';
    div.dataset.number = currentBalloon;
    currentBalloon++;
    
    // adding the balloon on the webpage
    body.appendChild(div);
    animateBalloon(div);
}

// Making the balloon float to the top
function animateBalloon(elem) {
    let pos = 0;
    let interval = setInterval(frame, 10);

    function frame() {
        if(pos >= windowHeight + 200 && document.querySelector('[data-number="'+elem.dataset.number+'"]') != null) {
            clearInterval(interval);
            gameOver = true;
        } else {
            pos++;
            elem.style.top = windowHeight - pos + 'px';
        }
    }
}

// Removing the balloon when it reached the window height
function deleteBalloon(elem) {
    elem.remove();
    num++;
    updateScore();
}

function updateScore() {
    for(let i=0; i<scores.length; i++) {
        scores[i].textContent = num;
    }
}

function startGame() {
    let loop = setInterval(function() {
        if(!gameOver && num !== total) {
            createBalloon();
        } else if(num !== total) {
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.lose').style.display = 'block';
        } else if(num == total) {
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.win').style.display = 'block';
        }
    }, 800);
}
// ----Event Delegation -----
// Attaching an event listener on a web page not only 
// to an existing element but also the elements that are not yet created.
// --------------------------
document.addEventListener('click', function(event) {
    if(event.target.classList.contains('balloon')) {
        deleteBalloon(event.target);
    }
});

startGame();