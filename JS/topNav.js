const logoutBtn = document.getElementById("logout")

logoutBtn.addEventListener('click',()=>{
    sessionStorage.removeItem('jwtToken');
    window.top.location.href ="../Fragments/logout.html"
})

