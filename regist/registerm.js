function nextStep(currentStep) {
  if (currentStep === 1) {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const validEmail = email.endsWith("@gmail.com") || email.endsWith("@mail.ru");
    const validPhone = phone.startsWith("+373");

    if (!username || !validEmail || !validPhone) {
      alert("Te rog completează corect câmpurile! Email-ul trebuie să fie @gmail.com sau @mail.ru și telefonul să înceapă cu +373.");
      return;
    }

    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step2").classList.remove("hidden");
  } 
  
  else if (currentStep === 2) {
    const password = document.getElementById("password").value.trim();
    const email = document.getElementById("email").value.trim();

    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;"'|<>,.?/~`-]).{5,}$/;
    if (!selectedAvatar) {
      alert("Te rog selectează un avatar!");
      return;
    }
    
    localStorage.setItem('user', JSON.stringify({
      username: document.getElementById("username").value.trim(),
      email: email,
      phone: document.getElementById("phone").value.trim(),
      password: password,
      avatar: selectedAvatar
    }));
    if (!passwordRegex.test(password)) {
      alert("Parola trebuie să conțină cel puțin 5 caractere, o literă mare, o cifră și un simbol.");
      return;
    }

    localStorage.setItem('user', JSON.stringify({
      email: email,
      password: password
    }));
    

    document.getElementById("step2").classList.add("hidden");
    document.getElementById("step3").classList.remove("hidden");
  }
}
let selectedAvatar = '';
let generatedCaptcha = 0;

function selectAvatar(imgElement) {
  selectedAvatar = imgElement.src;
  document.querySelectorAll('.avatar').forEach(img => img.classList.remove('selected'));
  imgElement.classList.add('selected');
}

function nextStep(currentStep) {
  if (currentStep === 1) {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const validEmail = email.endsWith("@gmail.com") || email.endsWith("@mail.ru");
    const validPhone = phone.startsWith("+373");

    if (!username || !validEmail || !validPhone) {
      alert("Te rog completează corect câmpurile!");
      return;
    }

    generateCaptcha(); 
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step2").classList.remove("hidden");
  }

  else if (currentStep === 2) {
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const captchaInput = document.getElementById("captchaAnswer").value.trim();
    const email = document.getElementById("email").value.trim();

    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;"'|<>,.?/~`-]).{5,}$/;

    if (password !== confirmPassword) {
      alert("Parolele nu coincid!");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("Parola trebuie să conțină minim 5 caractere, o literă mare, o cifră și un simbol.");
      return;
    }

    if (parseInt(captchaInput) !== generatedCaptcha) {
      alert("Captcha greșită!");
      return;
    }

    if (!selectedAvatar) {
      alert("Te rog selectează un avatar!");
      return;
    }

    const user = {
      username: document.getElementById("username").value.trim(),
      email: email,
      phone: document.getElementById("phone").value.trim(),
      password: password,
      avatar: selectedAvatar
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById("step2").classList.add("hidden");
    document.getElementById("step3").classList.remove("hidden");
  }
}

function generateCaptcha() {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const ops = ['+', '-', '*'];
  const op = ops[Math.floor(Math.random() * ops.length)];

  let result;
  if (op === '+') result = a + b;
  else if (op === '-') result = a - b;
  else result = a * b;

  generatedCaptcha = result;
  document.getElementById('captchaQuestion').textContent = `Cât face ${a} ${op} ${b}?`;
}

document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  window.location.href = "../continut/OSNOVNOE.html";
});
