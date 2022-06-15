// Link to HTML
const newBlogButton = document.getElementById('new-blog-button');
const createBlogFormDiv = document.getElementById('create-blog-form-div');

function createBlogFormVisible() {
  createBlogFormDiv.removeAttribute('style')
  document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);
}

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();

  if (title && description) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create blog');
    }
  }
};

newBlogButton.addEventListener('click', createBlogFormVisible);
