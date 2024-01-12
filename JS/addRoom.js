import {
    createRoom
} from "./API.js";

document.addEventListener('DOMContentLoaded', function() {
    const addRoomButton = document.getElementById('addRoomButton');
    addRoomButton.addEventListener('click', addRoom);
});

async function addRoom() {
    const roomNumber = document.getElementById('roomNumber').value;
    const numberOfBeds = document.getElementById('numberOfBeds').value;
    const hotelId = getUrlParameter('hotelId');

    const roomData = {
        roomNumber: roomNumber,
        numberOfBeds: numberOfBeds,
    };

    try {
        const result = await createRoom(roomData, hotelId);

        alert('Room added successfully! Room ID: ' + result.id);
        setTimeout(() => {
            window.location.href = "hotel.html";
        }, 2000);
    } catch (error) {
        console.error('Error adding room:', error);
        alert(`Error adding room: ${error.message}`);
    }
}

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}