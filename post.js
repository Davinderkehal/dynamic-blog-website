const URLParams = new URLSearchParams(window.location.search);
const postId = parseInt(URLParams.get('id'), 10);

const loadPost = () => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(po => po.id === postId);

    if (post) {
        document.getElementById('postInfo').innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" style="max-width: 100%; height: auto;">` : ''}
            <button id="editButton">Edit Post</button>
        `;

        document.getElementById('editButton').addEventListener('click', () => {
            document.getElementById('editTitle').value = post.title;
            document.getElementById('editContent').value = post.content;
            document.getElementById('editImageUrl').value = post.imageUrl;
            document.getElementById('formEdit').style.display = 'block';
        });

        document.getElementById('deleteButton').style.display = 'inline-block';
        document.getElementById('deleteButton').addEventListener('click', () => {
            const confirmDelete = confirm('Are you sure you want to delete this post?');
            if (confirmDelete) {
                const postIndex = posts.findIndex(po => po.id === postId);
                if (postIndex !== -1) {
                    posts.splice(postIndex, 1);
                    localStorage.setItem('posts', JSON.stringify(posts));
                    alert('Post deleted successfully');
                    window.location.href = 'index.html';
                }
            }
        });
    } else {
        document.getElementById('postInfo').innerHTML = '<p>Post not found.</p>';
    }
};

const savePost = (e) => {
    e.preventDefault();

    const postUpdate = {
        id: postId,
        title: document.getElementById('editTitle').value,
        content: document.getElementById('editContent').value,
        imageUrl: document.getElementById('editImageUrl').value
    };

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postIndex = posts.findIndex(po => po.id === postId);

    if (postIndex !== -1) {
        posts[postIndex] = postUpdate;
        localStorage.setItem('posts', JSON.stringify(posts));
        alert('Post updated successfully!');
        window.location.href = `post.html?id=${postId}`;
    }
};

document.addEventListener('DOMContentLoaded', loadPost);
document.getElementById('formEdit').addEventListener('submit', savePost);
