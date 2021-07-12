const {
    create,
    getUsersById,
    getUsers,
    updateUser,
    getUserByUserEmail,
    deleteUser,
    searchUser
} = require("./user.service");

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");


module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const emailToValidate = body.email;
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@capgemini.com$/;
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt);
        if (emailRegexp.test(emailToValidate)){
        getUserByUserEmail(body.email, (error, results) => {
            if (error) {
                console.log(error);
            }
            if (results) {
                return res.json({
                    success: 0,
                    message: "User already exist! Please login."
                });        
            }
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });

            }
            return res.status(200).json({
                success: 1,
                message:"User created successfully",
                data: results
            });

        });
        });
    }
        else{
            return res.status(500).json({
                success: 0,
                message: "Email should be @capgemini.com domain"
            });
        }   
    },

    getUserByUserId: (req, res) => {
        const body = req.body;
        getUsersById(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                return console.log(err);
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        searchUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "User does not exist."
                });
            }
            else {
                updateUser(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    return res.json({
                        success: 1,
                        message: "Updated sucessfully"
                    });
                });
            }
        });
    },

    login: (req, res) => {
        const body = req.body;
        const emailToValidate = body.email;
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@capgemini.com$/;
        if (emailRegexp.test(emailToValidate)){
        getUserByUserEmail(body.email, (error, results) => {
            if (error) {
                console.log(error);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "User not found! Please register first with format- 'create user <username> <email> <password>'"
                });
                
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "Hi "+results.name+"! You are logged in successfully.",
                    token: jsontoken,
                    role:results.role,
                    email:results.email,
                    password:body.password
                });
            }
            else {
                return res.json({
                    success: 0,
                    message: "Incorrect password"
                });
            }
        });
    }
    else{
        return res.json({
            success: 0,
            message: "Email should be @capgemini.com domain."
        });
    }
    },

    deleteUser: (req, res) => {
        const data = req.body;
        searchUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "User does not exist."
                });
            }
            else {
                deleteUser(data, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.json({
                        success: 1,
                        message: "User deleted successfully."
                    });
                });
            }
        });
    }

};