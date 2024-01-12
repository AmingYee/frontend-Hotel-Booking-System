let seconds = 5;
const countdownElement = document.getElementById('countdown');

function updateCountdown() {
    countdownElement.textContent = `Redirecting to the login page in ${seconds} seconds...`;
}

function countdown() {
    updateCountdown();
    if (seconds === 0) {
        window.top.location.href = '../Guest/login.html';
    } else {
        seconds--;
        setTimeout(countdown, 1000);
    }
}

countdown();