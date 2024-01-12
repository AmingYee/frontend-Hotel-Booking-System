const logoutBtn = document.getElementById("logout")
const reservationBtn = document.getElementById("Reservation")

logoutBtn.addEventListener('click',()=>{
    sessionStorage.removeItem('jwtToken');
    window.top.location.href ="../Fragments/logout.html"
})

reservationBtn.addEventListener('click',()=>{
    window.top.location.href ="../Reservation/reservation.html"
})