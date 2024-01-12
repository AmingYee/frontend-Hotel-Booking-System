import {
    createHotel
} from './API.js';

document.getElementById('createHotelButton').addEventListener('click', createNewHotel);

async function createNewHotel() {
    const name = document.getElementById('name').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    const currentDate = new Date().toISOString();
    try {
        const newHotel = await createHotel({
            name,
            street,
            city,
            zip,
            country,
            created: currentDate,
            updated: currentDate
        });

        alert(`Hotel "${newHotel.name}" created successfully!`);
        setTimeout(() => {
            window.location.href = "hotel.html";
        }, 2000);
    } catch (error) {
        console.error('Error creating hotel:', error.message);
        alert('Error creating hotel. Please try again.');
    }
}
