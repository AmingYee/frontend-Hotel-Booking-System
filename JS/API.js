const BASE_URL = 'http://localhost:8080';

const headers = {
    'Content-Type': 'application/json',
};

async function fetchFromApi(endpoint, options = {}) {
    const jwtToken = sessionStorage.getItem('jwtToken');

    if (jwtToken) {
        headers['Authorization'] = `${jwtToken}`;
    }

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        ...options,
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
    });

    const authorizationHeader = response.headers.get('Authorization');
    if (authorizationHeader) {
        const newJwtToken = authorizationHeader.replace('Bearer ', '');
        sessionStorage.setItem('jwtToken', newJwtToken);
        console.log('JWT Token:', newJwtToken);
    }

    if (!response.ok) {
        throw new Error(`Error fetching data from ${endpoint}`);
    }

    return response.json();
}

// Hotels
async function getHotels() {
    return fetchFromApi('hotels');
}

async function createHotel(hotelData) {
    return fetchFromApi('hotels', {
        method: 'POST',
        body: JSON.stringify(hotelData),
    });
}

async function updateHotel(hotelData) {
    return fetchFromApi(`hotels`, {
        method: 'PUT',
        body: JSON.stringify(hotelData),
    });
}

async function deleteHotel(id) {
    return fetchFromApi(`hotels/delete/${id}`, {
        method: 'DELETE',
    });
}

async function getHotelById(hotelId) {
    return fetchFromApi(`hotels/${hotelId}`);
}

// Users
async function createUser(userData) {
    return fetchFromApi('new-user', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
}

async function login(userData) {
    return fetchFromApi('login-user', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
}

// Rooms
async function createRoom(roomData, hotelId) {
    return fetchFromApi(`rooms?hotelId=${hotelId}`, {
        method: 'POST',
        body: JSON.stringify(roomData),
    });
}

// Reservations
async function createReservation(reservationData) {
    return fetchFromApi('reservations', {
        method: 'POST',
        body: JSON.stringify(reservationData),
    });
}

export {
    fetchFromApi,
    getHotels,
    createHotel,
    updateHotel,
    deleteHotel,
    getHotelById,
    createRoom,
    createUser,
    login,
    createReservation,
};