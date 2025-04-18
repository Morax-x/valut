document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
  
    if (user) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', user.username);
      localStorage.setItem('avatar', user.avatar);
      alert('Conectare reușită!');
      window.location.href = '../continut/OSNOVNOE.html';
    } else {
      alert('Email sau parolă incorecte.');
    }
  });
  