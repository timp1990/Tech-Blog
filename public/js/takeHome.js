const homeButton = document.getElementById("home-button");

function takeHome() {
    document.location.replace('/');
}
homeButton.addEventListener("click", takeHome);