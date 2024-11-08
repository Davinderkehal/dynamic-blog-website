function loadBlog() {
    const postDiv = document.getElementById('postList');
    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    if (posts.length === 0) {
        postDiv.innerHTML = "<p>No posts</p>";
        return;
    }

    posts.forEach(post => {
        const postPart = document.createElement('div');
        postPart.classList.add("post");

        postPart.innerHTML = `
            <h2>${post.title}</h2> 
            <p>${post.content.substring(0, 150)}...</p>
            <a href="post.html?id=${post.id}" class="view-link">Read Extra</a>
        `;
    
        postDiv.appendChild(postPart);
    });
}

document.addEventListener("DOMContentLoaded", loadBlog);


document.addEventListener("DOMContentLoaded", loadBlog);
