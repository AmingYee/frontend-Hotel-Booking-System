import {
    getHotels,
    deleteHotel,
    updateHotel, getHotelById
} from "../JS/API.js";

document.addEventListener('DOMContentLoaded', async function () {
    await getAllHotels();

    const createHotelBtn = document.getElementById('goToCreateHotelBtn');

    createHotelBtn.addEventListener("click", () =>{
        window.location.href = `createHotel.html`;
    });
});

async function getAllHotels() {
    const hotelList = document.getElementById('hotelList');
    hotelList.innerHTML = '';

    try {
        const hotels = await getHotels();

        hotels.forEach((hotel) => {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${hotel.id}, Name: ${hotel.name}, Address: ${hotel.street}, Room Count: ${hotel.rooms.length}`;

            const updateForm = document.createElement('form');


            const detailButton = document.createElement('button')
            detailButton.textContent = 'Detaljer';
            detailButton.onclick = function (){
                const hotelId = hotel.id;
                window.location.href = `detaljerHotel.html?hotelId=${hotelId}`;
            }

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function () {
                deleteH(hotel.id);
            };

            listItem.appendChild(updateForm);
            listItem.appendChild(detailButton);
            listItem.appendChild(deleteButton);
            hotelList.appendChild(listItem);
        });

        document.querySelectorAll('.updateButton').forEach(button => {
            button.addEventListener('click', function () {
                const hotelId = this.getAttribute('data-hotel-id');
                console.log(hotelId)
                updateH(hotelId);
            });
        });

    } catch (error) {
        console.error('Error fetching hotels:', error);
        alert('Error fetching hotels. Please try again.');
    }
}

async function deleteH(hotelId) {
    const confirmDelete = confirm('Are you sure you want to delete this hotel?');

    if (confirmDelete) {
        try {
            const response = await deleteHotel(hotelId);
            //TODO: its not checking the status from server and need to add functionality that says when user doesn't have authority to delete
            if (response.status === 200) {
                alert('Hotel deleted successfully!');
                await getAllHotels();
            } else {
                console.error('Error deleting hotel. Server response:', response);
                alert('Error deleting hotel. Please try again.');
            }
        } finally {
            alert('Hotel deleted successfully!');
            await getAllHotels();
        }
    }
}