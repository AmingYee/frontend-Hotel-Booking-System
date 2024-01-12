import {
    getHotelById,
    updateHotel
} from "./API.js";

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get("hotelId");
    const confirmationMessage = document.getElementById("confirmation-message");

    getHotelById(hotelId)
        .then(data => {
            document.getElementById("name").value = data.name;
            document.getElementById("street").value = data.street;
            document.getElementById("city").value = data.city;
            document.getElementById("zip").value = data.zip;
            document.getElementById("country").value = data.country;
        })
        .catch(error => {
            console.error("Error fetching hotel for editing:", error);
        });

    const updateHotelButton = document.getElementById("updateHotelButton");

    updateHotelButton.addEventListener("click", (event) => {
        event.preventDefault();

        const updatedHotelData = {
            name: document.getElementById("name").value,
            street: document.getElementById('street').value,
            city: document.getElementById('city').value,
            zip: document.getElementById('zip').value,
            country: document.getElementById('country').value,
        };

        updatedHotelData.id = hotelId;

        updateHotel(updatedHotelData)
            .then((data) => {
                console.log("Hotel updated successfully:", data);
                confirmationMessage.innerHTML = "Hotel updated successfully!";
                confirmationMessage.style.display = "block";
                setTimeout(() => {
                    window.location.href = "hotel.html";
                }, 2000);
            })
            .catch(error => {
                console.error("Error updating hotel:", error);
            });
    });
});