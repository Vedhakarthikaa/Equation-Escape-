function goToDashboard() {
  document.body.style.opacity = "0";
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 400);
}

window.onload = () => {
  document.body.style.opacity = "1";
};
