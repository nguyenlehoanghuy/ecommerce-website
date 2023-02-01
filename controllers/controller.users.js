import {
  insertUserDb,
  getUsersDb,
  deleteUsersDb,
} from "../models/model.users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { hashSync, genSaltSync, compareSync } = bcrypt;

const register = (req, res) => {
  const salt = genSaltSync(10);
  const data = req.body;
  data.user_password = hashSync(data.user_password, salt);
  insertUserDb(data, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    console.log(results);
    const token = jwt.sign(results.insertId, process.env.TOKEN_KEY, {
      expiresIn: "3d",
    });
    return res.status(201).json({
      success: 1,
      message: "Register user successfully",
      token: token,
    });
  });
};

const getUsers = (req, res) => {
  const data = req.body;
  getUsersDb(data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    if (!results) {
      return res.status(200).json({
        success: 1,
        message: "Get 0",
      });
    } else {
      return res.status(200).json({
        success: 1,
        message: "Get all user successfully",
      });
    }
  });
};

const deleteUsers = (req, res) => {
  const data = req.body;
  deleteUsersDb(data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    if (results.affectedRows === 0) {
      return res.status(200).json({
        success: 1,
        message: "Deleted 0",
      });
    } else {
      return res.status(200).json({
        success: 1,
        message: "Delete all user successfully",
      });
    }
  });
};

export { register, getUsers, deleteUsers };
