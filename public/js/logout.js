let startTime = Date.now();
let idleTime = 0;

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

// Logout if logout clicked
document.querySelector('#logout').addEventListener('click', logout);

// Logout if the user has been logged in for more than 5 minutes
window.addEventListener('mousemove', resetIdleTimer);
function resetIdleTimer() {
  lastMove = Date.now();
  console.log(lastMove, 'last moved')
}

function checkIdleTimeElapsed() {
  idleTime = Math.floor((Date.now() - startTime) / 1000);
  if (idleTime > 300) {
    document.querySelector('#logout').click();
  }
}

// Run the timeout check every 20 seconds
setInterval(checkIdleTimeElapsed, 20000);