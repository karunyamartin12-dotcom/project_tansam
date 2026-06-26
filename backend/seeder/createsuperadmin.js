require("dotenv").config();

const bcrypt = require("bcrypt");
const db = require("../config/db");

const createSuperAdmin = async () => {

    const hashedPassword =
        await bcrypt.hash("123456", 10);

    const sql = `
    INSERT INTO users
    (
        name,
        email,
        password,
        age,
        role
    )
    VALUES
    (
        'Super Admin',
        'superadmin@gmail.com',
        ?,
        30,
        'superadmin'
    )
    `;

    db.query(
        sql,
        [hashedPassword],
        (err) => {

            if (err) {
                console.log(err);
            } else {
                console.log(
                    "Super Admin Created Successfully"
                );
            }

            process.exit();
        }
    );

};

createSuperAdmin();