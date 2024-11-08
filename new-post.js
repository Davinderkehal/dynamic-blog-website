document.addEventListener('DOMContentLoaded', () => {
    const formPost = document.getElementById('formPost');

    formPost.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        const imageUrl = document.getElementById('imageUrl').value.trim();

        if (title === "" || content === "") {
            alert("Fill in both title and content.");
            return;
        }

        const postNew = {
            id: Date.now(),
            title: title,
            content: content,
            imageUrl: imageUrl || null,
            createdAt: new Date().toISOString()
        };

        const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
        existingPosts.push(postNew);
        localStorage.setItem('posts', JSON.stringify(existingPosts));

        window.location.href = 'index.html';
    });
});
