const db = require("../config/db");

// GET categories
exports.getCategories = (req, res) => {
    db.query("SELECT * FROM categories", (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        const formatted = result.map((item) => ({
            id: item.id,
            name: item.category_name,
            description: item.description,
        }));

        res.status(200).json(formatted);
    });
};

// ADD category
exports.addCategory = (req, res) => {
    let { name, description } = req.body;

    name = name?.trim();
    description = description?.trim();

    if (!name) {
        return res.status(400).json({ message: "Category name required" });
    }

    const sql =
        "INSERT INTO categories (category_name, description) VALUES (?, ?)";

    db.query(sql, [name, description], (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(201).json({
            message: "Category Added Successfully",
        });
    });
};

// UPDATE category
exports.updateCategory = (req, res) => {
    const { id } = req.params;
    let { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Category name required" });
    }

    const sql =
        "UPDATE categories SET category_name=?, description=? WHERE id=?";

    db.query(sql, [name, description, id], (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.json({
            message: "Category Updated Successfully",
        });
    });
};

// DELETE category
exports.deleteCategory = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM categories WHERE id=?", [id], (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.json({
            message: "Category Deleted Successfully",
        });
    });
};