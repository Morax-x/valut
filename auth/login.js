document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === email && user.password === password) {
        alert('Conectare reușită!');
        
        window.location.href = '../continut/OSNOVNOE.html';
    } else {
        alert('Email sau parolă incorecte.');
    }
});
