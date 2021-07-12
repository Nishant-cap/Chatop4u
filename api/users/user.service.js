const pool = require("../../config/database");

module.exports = {
    create: (data, callback) => {
        pool.query(
            `insert into registration(name,email,password,role)
             values(?,?,?,?)`,
            [
                data.name,
                data.email,
                data.password,
                data.role
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getUsers: callback => {
        pool.query(`select id,name,email from registration`,
            [

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },

    getUsersById: (data, callback) => {
        pool.query(`select id,name,email,password from registration where id=?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            });
    },

    updateUser: (data, callback) => {
        
        pool.query(`update registration set name=?,password=? where email=?`,
            [
                data.name,
                data.password,
                data.email
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },

    getUserByUserEmail: (email, callback) => {
        pool.query(`select * from registration where email=?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            });
    },
    searchUser: (data, callBack) => {
        pool.query(`select * from registration where email = ?`,
            [data.email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    deleteUser: (data, callBack) => {
        pool.query(
            `delete from registration where email = ?`,
            [data.email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
};