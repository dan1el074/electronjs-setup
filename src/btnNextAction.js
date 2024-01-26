const btnNext = document.getElementById("btn-next");
const actionWindow = document.getElementById("action-window");

btnNext.addEventListener("click", () => {
  actionWindow.classList.add("active");
});
