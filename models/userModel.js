const db = require('../config/db');

const getUserByUserName = (username, callback) => {
    const sql = 'SELECT * FROM tbl_admin WHERE fld_username = ? LIMIT 1';
    db.query(sql, [username], (err, results) => {
        if (err) return callback(err, null);
        if (results.length === 0) return callback(null, null);
        return callback(null, results[0]);
    });
};


const getAllUsers = (callback) =>{
    const sql = 'SELECT * from tbl_admin where fld_admin_type != ?';
    db.query(sql, ['SUPERADMIN'] , (err, results) => {
        if(err) return callback(err, null);
        return callback(null, results);
    })
}

const getAllUsersIncludingAdmin = (callback) =>{
    const sql = 'SELECT * from tbl_admin';
    db.query(sql, (err, results) => {
        if(err) return callback(err, null);
        return callback(null, results);
    })
}

// Add new user
const addUser = (userData, callback) => {
    const sql = 'INSERT INTO tbl_admin (fld_first_name, fld_email, fld_decrypt_password, fld_admin_type) VALUES (?, ?, ?, ?)';
    const { name, email, password, user_type } = userData;
    db.query(sql, [name, email, password, user_type], (err, result) => {
        if (err) return callback(err, null);
        return callback(null, result);
    });
};

// Update user
const updateUser = (id, userData, callback) => {
    const sql = 'UPDATE tbl_admin SET fld_first_name = ?, fld_email = ?, fld_decrypt_password = ?, fld_admin_type = ? WHERE id = ?';
    const { name, email, password, user_type } = userData;
    db.query(sql, [name, email, password, user_type, id], (err, result) => {
        if (err) return callback(err, null);
        return callback(null, result);
    });
};

// Delete user
const deleteUser = (id, callback) => {
    const sql = 'DELETE FROM tbl_admin WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return callback(err, null);
        return callback(null, result);
    });
};

module.exports = {
    getUserByUserName,
    getAllUsers,
    getAllUsersIncludingAdmin,
    addUser,
    updateUser,
    deleteUser
};
