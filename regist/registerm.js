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

document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  window.location.href = "../continut/OSNOVNOE.html";
});
