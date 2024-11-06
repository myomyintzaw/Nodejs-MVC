const User = require('../models/userModel');

exports.index = async (req, res) => {
    const users = await User.findAll();   //get all users from database
    res.render('users/list', { users });  //render to view(list.ejs)
};

exports.showCreateForm = (req, res) => {
    res.render('users/create');  //render to view(create.ejs)
};


exports.create = async (req, res) => {
    // console.log(req.body);
    const { name, email, password } = req.body;
    await User.create(name, email, password);
    res.redirect('/users');
    // res.render('/users');
};


exports.showEditForm = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('users/edit', { user });
};


exports.update = async (req, res) => {
    const { name, email } = req.body;
    await User.update(req.params.id, name, email);
    res.redirect('/users');
};


exports.delete = async (req, res) => {
    await User.delete(req.params.id);
    res.redirect('/users');
};

