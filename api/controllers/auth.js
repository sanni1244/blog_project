import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = (req, res) => {

    // Check existing user
    const checkQuery = 'SELECT * FROM `users` WHERE email = ? OR username = ?';
    db.query(checkQuery, [req.body.email, req.body.username], (error, data) => {
        if (error) throw error;
        // if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists");



        // hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // insert user to database
        const insertQuery = "INSERT INTO users(`email`, `username`, `password`) VALUES (?, ?, ?)";
        const values = [req.body.email, req.body.username, hash];
        db.query(insertQuery, values, (error, data) => {
            // if (err) return res.status(500).json(err);
            if (error) throw error;
            return res.status(200).json("User has been created");
        });
    }); 
  
 

}

export const login = (req, res) => {

    const checkQuery = 'SELECT * FROM `users` WHERE username = ?';
    db.query(checkQuery, [req.body.username], (err, data) => {
        if (err) throw err;
        if (data.length === 0) return res.status(404).json("User not found");

        // check password
        const isPass = bcrypt.compareSync(req.body.password, data[0].password)

        if(!isPass) return res.status(400).json("Wrong user details")

        const token = jwt.sign({id:data[0].id}, "jwtkey");
        const {password, ...other} = data[0]

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other)
    })
};

export const logout = (req, res) => { 
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out")
}