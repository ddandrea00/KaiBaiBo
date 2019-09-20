
const writeEvent = (text) => {
    // <ul> element
    const parent = document.querySelector('#events');
    // <h1> element
    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);
};

const onFormSubmitted = (e) => {
    e.preventDefault();

    const input = document.querySelector('#chat');
    const text = input.value;
    const messageSound = document.getElementById("message");
    input.value = '';
    
    sock.emit('message', text);
    messageSound.play();
};

const addButtonListeners = () => {
    ['kai', 'bai', 'bo'].forEach((id) => {
        const button = document.getElementById(id);
        button.addEventListener('mouseenter', () => {
            const hoverSound = document.getElementById("hover");
            hoverSound.play();
        });
        button.addEventListener('click', () => {
            const clickSound = document.getElementById("hah");
            clickSound.play();
            sock.emit('turn', id);
        });
    });
};

const sock = io();
sock.on('message', writeEvent);

document
.querySelector('#chat-form')
.addEventListener('submit', onFormSubmitted);

addButtonListeners();