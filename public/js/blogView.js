// Connect HTML
const leaveCommentButton = document.getElementById('leave-comment-button');
const editBlogFormDiv = document.getElementById('edit-blog-form-div');

const thisBlogID = window.location.href.slice(-1);

async function createComment(event) {
    event.preventDefault();
    const commentTitle = document.getElementById('comment-title').value;
    const commentContent = document.getElementById('comment-content').value;
    const comment = {
        title: commentTitle,
        description: commentContent,
        blog_id: thisBlogID
        // ******** Put the user_id for the blog here **************************************
    };

    //// On submit, post the comment
    if (commentContent && commentTitle) {
        const response = await fetch(`/api/blogs/comment/${thisBlogID}`, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            setTimeout(() => {
                document.location.replace(`/blog/${thisBlogID}`);
            }, 200)
        } else {
            alert(response.statusText);
        }
    }
};

// Delete functionality
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete blog');
        }
    }
};

if (document.querySelector('.btn-danger')) {
    document
        .querySelector('.btn-danger')
        .addEventListener('click', delButtonHandler)
}

// toggle edit blog form on 
function editBlogFormVisible() {
    editBlogFormDiv.removeAttribute('style')
    document
        .querySelector('.edit-blog-form')
        .addEventListener('submit', editFormHandler);
}


// Edit functionality --------------------------------------
const editFormHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        let title = document.getElementById('edit-blog-title').value.trim();
        let description = document.getElementById('edit-blog-desc').value.trim();

        console.log(title, description)

        const response = await fetch(`/api/blogs/${thisBlogID}`, {
            method: 'PUT',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to edit blog');
        }
    }
};

if (document.querySelector('.btn-secondary')) {
    document
        .querySelector('.btn-secondary')
        .addEventListener('click', editBlogFormVisible)
}

leaveCommentButton.addEventListener('click', createComment);

