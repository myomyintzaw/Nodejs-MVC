
const Category = require('../models/categoryModel');

exports.index = async (_, res) => {
    const categories = await Category.findAll();
    res.render('categories/categories_list', { categories });
};

exports.showCreateForm = (_req, res) => {
    res.render('categories/category_create');
};


exports.create = async (req, res) => {
    const { name } = req.body;
    try {
        // cname = null;
        // const categories = await Category.findAll();
        // const cname = categories.data.find(c => c.name === name);
        // if (cname) {
        //     res.render('categories/category_create', { cname });
        //     // return res.render('categories / category_create').send(cname)
        // } else {

        await Category.create(name);
        res.redirect('/categories');
        // }

    } catch (error) {
        return res.status(400).send('Category already exists')
    }
};


exports.showEditForm = async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.render('categories/category_edit', { category });
};


exports.update = async (req, res) => {
    const { name } = req.body;
    await Category.update(req.params.id, name);
    res.redirect('/categories');
};

exports.delete = async (req, res) => {
    await Category.delete(req.params.id);
    res.redirect('/categories');
};