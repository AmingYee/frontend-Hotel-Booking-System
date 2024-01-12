import {
    createUser
} from './API.js';

document.addEventListener('DOMContentLoaded', function () {

    const registerBtn = document.getElementById("register");

    registerBtn.addEventListener('click', () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const pwdRe = document.getElementById("re-password").value;
        const responseMess = document.getElementById("response");

        if (password !== pwdRe) {
            responseMess.innerText = "Passwords do not match.";
            return;
        }

        const user = {
            username: username,
            pwd: password,
            role: "ROLE_ADMIN"
        };

        createUser(user)
            .then((data) => {
                console.log("response :", data);
                responseMess.innerText = data.message;

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 3000);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                responseMess.innerText = error.message;
            });
    });

});