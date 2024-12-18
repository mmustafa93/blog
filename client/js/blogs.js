const BASE_URL = "http://127.0.0.1:3000"; // Your backend base URL

// Fetch Blogs from Backend
async function fetchBlogs() {
    try {
        const response = await fetch(`${BASE_URL}/blogs`); // Fetch from the backend
        console.log(response)
        if (!response.ok) {
            throw new Error(`Failed to fetch blogs: ${response.statusText}`);
        }
        const blogs = await response.json(); // Parse the JSON response
        renderBlogs(blogs); // Render blogs to the page
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
}

// Render Blogs to the HTML Page
function renderBlogs(blogs) {
    const blogsList = document.querySelector(".blogs");

    if (!blogs.length) {
        blogsList.innerHTML = "<p>No blogs available at the moment.</p>";
        return;
    }

    blogs.forEach((blog) => {
        const blogElement = document.createElement("div");
        blogElement.className = "blog";

        blogElement.innerHTML = `
            <a href="/blog/client/blog.html?id=${blog._id}"><h2>${blog.title}</h2></a>
            <p>${new Date(blog.createdAt).toLocaleDateString()}</p>
        `;

        blogsList.appendChild(blogElement);
    });
}

// Initialize the Page
document.addEventListener("DOMContentLoaded", fetchBlogs);