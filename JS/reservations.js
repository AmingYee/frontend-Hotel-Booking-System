import {
    fetchUserIdFromToken,
    getClientReservations,
    deleteReservation
} from './API.js';

document.addEventListener('DOMContentLoaded', async function () {
    const reservationsList = document.getElementById('reservationsList');

    try {
        const clientId = await fetchUserIdFromToken();

        const data = await getClientReservations(clientId);

        if (data.length > 0) {
            const ul = document.createElement('ul');
            data.forEach(reservation => {
                const li = document.createElement('li');
                li.textContent = `Reservation ID: ${reservation.id}, Reservation Date: ${reservation.reservationDate}`;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function () {
                    deleteReservation(reservation.id);
                };

                ul.appendChild(li);
                ul.appendChild(deleteButton)
            });
            reservationsList.appendChild(ul);
        } else {
            reservationsList.textContent = 'No reservations found for the user.';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching client reservations.');
    }
});