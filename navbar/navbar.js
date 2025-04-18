document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("link");
  
  
  document.head.appendChild(style);

  const avatar = localStorage.getItem("selectedAvatar");
  if (avatar) {
    const avatarImg = document.getElementById("user-avatar");
    if (avatarImg) avatarImg.src = avatar;
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      window.location.href = "http://127.0.0.1:5500/auth/login.html";
    });
  }
});
