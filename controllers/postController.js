const Post = require('../models/postModel');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');
const multer = require('multer');
const path = require('path');    //Add this to handel file extensions

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (_req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('photo');



exports.index = async (req, res) => {
    try {
        const posts = await Post.findAll();
        const categories = await Category.findAll();
        res.render('posts/list', { posts, categories });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Server Error');
    }
};


exports.showCreateForm = async (req, res) => {
    try {
        const users = await User.findAll();
        const categories = await Category.findAll();
        res.render('posts/create', { users, categories });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Server Error');
    }
};


exports.create = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error uploading photo:', err);
            return res.status(500).send('Error uploading photo');
        }

        const { user_id, category_id, title, content } = req.body;
        const photo = req.file ? req.file.filename : null;
        try {
            await Post.create(user_id, category_id, title, content, photo);
            res.redirect('/posts');
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).send('Server Error');
        }
    });
};



exports.showEditForm = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const users = await User.findAll();
        const categories = await Category.findAll();
        res.render('posts/edit', { post, users, categories });
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).send('Server Error');
    }
};



exports.update = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error uploading photo:', err);
            return res.status(500).send('Error uploading photo');
        }

        const { category_id, title, content } = req.body;
        const photo = req.file ? req.file.filename : null;
        try {
            await Post.update(req.params.id, category_id, title, content, photo);
            res.redirect('/posts');
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).send('Server Error');
        }
    });
};



exports.delete = async (req, res) => {
    try {
        await Post.delete(req.params.id);
        res.redirect('/posts');
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send('Server Error');
    }
};