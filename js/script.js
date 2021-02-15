let colors = ['red', 'yellow', 'blue', 'green', 'violet'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;

// Funtion that creates a balloon
function createBalloon () {
    let div = document.createElement('div');
    let rand = Math.floor(Math.random() * colors.length);
    div.className = 'balloon balloon-' + colors[rand];
    
    rand = Math.floor(Math.random() * (windowWidth - 100));
    div.style.left = rand + 'px';
    
    // adding the balloon on the webpage
    body.appendChild(div);
    animateBalloon(div);
}

// Making the balloon float to the top
function animateBalloon(elem) {
    let pos = 0;
    let interval = setInterval(frame, 10);

    function frame() {
        if(pos >= windowHeight + 200) {
            clearInterval(interval);
            deleteBalloon(elem);
        } else {
            pos++;
            elem.style.top = windowHeight - pos + 'px';
        }
    }
}

// Removing the balloon when it reached the window height
function deleteBalloon(elem) {
    elem.remove();
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