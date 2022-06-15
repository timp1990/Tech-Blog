const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // Not reloading the page *************************************************************************************************************
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      setTimeout(() => {
        document.location.replace('/profile');
      }, 200)


    } else {
      alert(response.statusText);
    }
    // ******************************************************************************************
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document.getElementById('takeToSignup').addEventListener('click', () => document.location.replace('/signup'));
