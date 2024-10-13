const express = require('express');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createPost).get(protect, getPosts);
router.route('/:id').put(protect, updatePost).delete(protect, deletePost);

module.exports = router;
