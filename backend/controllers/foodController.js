const db = require("../config/db");

// GET all foods
exports.getFoods = (req, res) => {
    const sql = `
        SELECT food_items.*, categories.category_name
        FROM food_items
        JOIN categories
        ON food_items.category_id = categories.id
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(200).json(result);
    });
};
// GET food by ID
exports.getFoodById = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM food_items WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });

        res.json(result);
    });
};

// ADD food
exports.addFood = (req, res) => {
    const {
        food_name,
        category_id,
        quantity,
        purchase_date,
        expiry_date,
        storage_location
    } = req.body;

    const sql = `
        INSERT INTO food_items
        (food_name, category_id, quantity, purchase_date, expiry_date, storage_location)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            food_name,
            category_id,
            quantity,
            purchase_date,
            expiry_date,
            storage_location
        ],
        (err, result) => {
            if (err) return res.status(500).json({ message: err.message });

            res.status(201).json({
                message: "Food Added Successfully",
                id: result.insertId
            });
        }
    );
};

// UPDATE food (ONLY ONCE)
exports.updateFood = (req, res) => {
    const { id } = req.params;

    const {
        food_name,
        category_id,
        quantity,
        purchase_date,
        expiry_date,
        storage_location
    } = req.body;

    const sql = `
        UPDATE food_items
        SET food_name = ?,
            category_id = ?,
            quantity = ?,
            purchase_date = ?,
            expiry_date = ?,
            storage_location = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            food_name,
            category_id,
            quantity,
            purchase_date,
            expiry_date,
            storage_location,
            id
        ],
        (err) => {
            if (err) return res.status(500).json({ message: err.message });

            res.json({ message: "Food Updated Successfully" });
        }
    );
};

// DELETE food
exports.deleteFood = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM food_items WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Food Item Not Found" });
        }

        res.json({ message: "Food Deleted Successfully" });
    });
};