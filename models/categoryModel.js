const db = require('../config/database');

class Category {
    static async create(name) {
        try {
            const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
            return result.insertId;

        } catch (error) {
            console.error('Error creating categories:', error);
            throw error;
        }
    }


    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM categories');
            return rows;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }


    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM categories WHERE id=?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error finding category by ID: ', error);
            throw error;
        }
    }


    static async update(id, name) {
        try {
            await db.query('UPDATE categories SET name=? WHERE id=?', [name, id]);
        } catch (error) {
            console.error('Error updating categories:', error);
            throw error;
        }
    }


    static async delete(id) {
        try {
            await db.query('DELETE FROM categories WHERE id=?', [id]);
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    }

}

module.exports = Category;