const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    commentedAt: {
        type: Date,
        default: Date.now
    }
});

const BlogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        minlength: 5,
        required: true
    },
    content: {
        type: String,
        minlength: 50,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        default: 'General'
    },
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    comments: [CommentSchema]
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;

// CRUD Operations

// Create a new blog post
async function createPost(data) {
    const post = new BlogPost(data);
    return await post.save();
}

// Read all blog posts
async function getAllPosts() {
    return await BlogPost.find();
}

// Read a single blog post by ID
async function getPostById(postId) {
    return await BlogPost.findById(postId);
}

// Update a blog post by ID
async function updatePost(postId, updateData) {
    return await BlogPost.findByIdAndUpdate(postId, updateData, { new: true });
}

// Delete a blog post by ID
async function deletePost(postId) {
    return await BlogPost.findByIdAndDelete(postId);
}

// Add a comment to a blog post
async function addComment(postId, commentData) {
    const post = await BlogPost.findById(postId);
    if (!post) throw new Error('Post not found');
    post.comments.push(commentData);
    return await post.save();
}

// Export functions
module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    addComment
};
