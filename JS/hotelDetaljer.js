import {
    getHotelById,
    createReservation,
    fetchUserIdFromToken
} from './API.js';

document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('hotelId');

    const updateBtn = document.getElementById('goToUpdate');
    const addRoomBtn = document.getElementById('addRoomBtn');
    const hotel = await getHotelById(hotelId);
    const userId = await fetchUserIdFromToken();

    document.getElementById('hotelName').textContent = hotel.name;
    document.getElementById('name').textContent = hotel.name;
    document.getElementById('street').textContent = hotel.street;
    document.getElementById('city').textContent = hotel.city;
    document.getElementById('zip').textContent = hotel.zip;
    document.getElementById('country').textContent = hotel.country;
    document.getElementById('nrOfRooms').textContent = "Number of rooms: " + hotel.rooms.length;

    updateBtn.addEventListener("click", () => {
        const hotelId = hotel.id;
        window.location.href = `updateHotel.html?hotelId=${hotelId}`;
    });

    addRoomBtn.addEventListener("click", () => {
        const hotelId = hotel.id;
        window.location.href = `addRoom.html?hotelId=${hotelId}`;
    });
    const roomsContainer = document.getElementById('roomsContainer');
    hotel.rooms.forEach(room => {
        const roomElement = createRoomElement(userId, room);
        roomsContainer.appendChild(roomElement);
    });

    function createRoomElement(userId, room) {
        const roomElement = document.createElement('div');

        const roomNumberLabel = document.createElement('p');
        roomNumberLabel.innerHTML = '<strong>Room Number:</strong> <span>' + room.roomNumber + '</span>';
        roomElement.appendChild(roomNumberLabel);

        const bedsLabel = document.createElement('p');
        bedsLabel.innerHTML = '<strong>Number of Beds:</strong> <span>' + room.numberOfBeds + '</span>';
        roomElement.appendChild(bedsLabel);

        const reserveButton = document.createElement('button');
        reserveButton.textContent = 'Reserve';
        reserveButton.addEventListener('click', async () => {
            const reservationDateInput = document.createElement('input');
            reservationDateInput.type = 'date';

            const confirmBtn = document.createElement('button');
            confirmBtn.textContent = 'Confirm';
            confirmBtn.addEventListener('click', async () => {
                const reservationDate = reservationDateInput.value;
                if (reservationDate) {
                    await reserveRoom(room.id, userId, reservationDate);
                    alert('Reservation created successfully!');
                } else {
                    alert('Please select a valid date.');
                }
            });

            const modalContainer = document.createElement('div'); //TODO: cleanup the container i created after use
            modalContainer.classList.add('modal-container');
            modalContainer.appendChild(reservationDateInput);
            modalContainer.appendChild(confirmBtn);

            document.body.appendChild(modalContainer);
        });
        roomElement.appendChild(reserveButton);

        return roomElement;
    }

    async function reserveRoom(roomId, userId,reservationDate) {
        try {
            console.log('roomId:', roomId);
            console.log('userId:', userId);
            console.log('reservationDate:', reservationDate);

            const dateparse = new Date(reservationDate);

            const formatdate = dateparse.toISOString();

            const reservationData = {
                reservationDate: formatdate
            };

            const data = createReservation(reservationData, roomId, userId);

            console.log('Reservation created:', data);
            alert('Reservation created successfully!');
        } catch (error) {
            console.error('Error creating reservation:', error);
            alert('Error creating reservation.');
        }
    }
});