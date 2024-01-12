import {
    login
} from './API.js';

const userName = document.getElementById("username");
const pwd = document.getElementById("password");
const loginBtn = document.getElementById("login");
const responseMess = document.getElementById("response");
const newUserBtn = document.getElementById('goToNewUser');
const newAdminBtn = document.getElementById('goToAdminUser');

newUserBtn.addEventListener("click", () =>{
    window.location.href = 'newGuest.html';
});

newAdminBtn.addEventListener("click", () =>{
    window.location.href = 'newAdmin.html';
});

loginBtn.addEventListener("click", () => {
    const user = {
        username: userName.value,
        pwd: pwd.value
    };

    login(user)
        .then((resp) => {
            console.log('JSON Body:', resp);
            responseMess.innerText = resp.message;

            setTimeout(() => {
                window.location.href = "../Hotel/hotel.html";
            }, 3000);
        })
        .catch((error) => {
            console.error('Error during login:', error);
            responseMess.innerText = "wrong username or password";
        });
});