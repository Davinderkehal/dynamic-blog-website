const URL = new URLSearchParams(window.location.search);
const postId = URL.get('id');

const loadPost = () => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(po => po.id === postId);
    
    if (post) {
        document.getElementById('postInfo').innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <img src="${post.imageUrl}" alt="${post.title}" style="max-width: 100%; height: auto;">
            <button id="editButton">Edit Post</button>
        `;
        
        document.getElementById('editButton').addEventListener('click', () => {
            document.getElementById('editTitle').value = post.title;
            document.getElementById('editContent').value = post.content;
            document.getElementById('editImageUrl').value = post.imageUrl;
            document.getElementById('formEdit').style.display = 'block'; // Corrected ID
        });
    } else {
        document.getElementById('postInfo').innerHTML = '<p>Post not found.</p>'; // Corrected ID
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
        window.location.href = `post.html?id=${postId}`; // Reload to show the updated post
    }
};

document.addEventListener('DOMContentLoaded', loadPost);

document.getElementById('formEdit').addEventListener('submit', savePost); // Corrected event type
