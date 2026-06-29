const db = require("../config/db");

// Get all categories
exports.getCategories = (req, res) => {
    db.query("SELECT * FROM categories", (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        // map DB fields → frontend fields
        const formatted = result.map((item) => ({
            id: item.id,
            name: item.category_name,
            description: item.description,
        }));

        res.status(200).json(formatted);
    });
};
// Add category
exports.addCategory = (req, res) => {
    const { name, description } = req.body;

    const sql =
        "INSERT INTO categories(category_name, description) VALUES (?, ?)";

    db.query(sql, [name, description], (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(201).json({
            message: "Category Added Successfully"
        });
    });
};
// Update category

exports.updateCategory = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const sql =
        "UPDATE categories SET category_name=?, description=? WHERE id=?";

    db.query(sql, [name, description, id], (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.json({
            message: "Category Updated Successfully"
        });
    });
};

// Delete category
exports.deleteCategory = (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM categories WHERE id=?",
        [id],
        (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            res.json({
                message: "Category Deleted Successfully"
            });
        }
    );
};