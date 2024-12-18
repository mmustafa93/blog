const BASE_URL = "http://127.0.0.1:3000"; // Your backend base URL

// Get the blog ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get('id');

// Fetch the blog content based on the ID
async function fetchBlog() {
    try {
        const response = await fetch(`${BASE_URL}/blogs/${blogId}`); // Fetch the specific blog by ID
        if (!response.ok) {
            throw new Error(`Failed to fetch blog: ${response.statusText}`);
        }
        const blog = await response.json(); // Parse the JSON response
        renderBlog(blog); // Render the blog content on the page
    } catch (error) {
        console.error("Error fetching blog:", error);
    }
}

// Render the blog content dynamically
function renderBlog(blog) {
    const singleBlogContainer = document.querySelector(".single-blog");

    // Check if blog exists
    if (!blog) {
        singleBlogContainer.innerHTML = "<p>Blog not found.</p>";
        return;
    }

    singleBlogContainer.innerHTML = `
        <div class="blog-header">
            <h2 class="blog-title">${blog.title}</h2>
            <p class="blog-publish-date">Published on: ${new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>
        <div class="blog-content">
            <p>${blog.content}</p>
        </div>
    `;
}

// Initialize the page by fetching the blog data
document.addEventListener("DOMContentLoaded", fetchBlog);