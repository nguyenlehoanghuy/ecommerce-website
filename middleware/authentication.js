import jwt from "jsonwebtoken";
import connection from "../config/database.js";

const checkAdmin = (req, res, next) => {
  const token = req.get("authorization");
  if (token) {
    // Verify the token using jwt.verify method
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decode);
    const results = connection.query(
      `SELECT role_id FROM users usr, roles rol, accounts acc WHERE acc.user_name = usr.user_name AND acc.user_name = rol.user_name AND usr.user_id = ?`,
      decode,
      (err, results, fields) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, results[0]);
      }
    );
    console.log(results.role_id);
    if (!results) {
      res.status(401).json({
        success: 0,
        data: "Invalid token.For bidden",
      });
    } else if (results.role_id === 4) {
      req.body.user_id = decode;
      next();
    } else {
      res.status(404).json({
        success: 0,
        data: "For bidden",
      });
    }
  } else {
    // Return response with error
    res.status(400).json({
      success: 0,
      data: "Error.",
    });
  }
};

const checkCustomer = (req, res, next) => {
  const token = req.get("authorization");
  if (token) {
    // Verify the token using jwt.verify method
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decode);
    const results = connection.query(
      `SELECT role_id FROM users usr, roles rol, accounts acc WHERE acc.user_name = usr.user_name AND acc.user_name = rol.user_name AND usr.user_id = ?`,
      decode,
      (err, results, fields) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, results[0]);
      }
    );
    console.log(results.role_id);
    if (!results) {
      res.status(401).json({
        success: 0,
        data: "Invalid token",
      });
    } else if (results.role_id === 4) {
      req.body.user_id = decode;
      next();
    } else {
      res.status(404).json({
        success: 0,
        data: "For bidden",
      });
    }
  } else {
    // Return response with error
    res.status(400).json({
      success: 0,
      data: "Error",
    });
  }
};

const checkRefreshToken = (req, res, next) => {
  const token = req.body.refresh_token;
  if (token) {
    // Verify the token using jwt.verify method
    const decode = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
    const results = connection.query(
      `SELECT * FROM users WHERE user_id  = ?`,
      decode,
      (err, results, fields) => {
        if (err) {
          callBack(err);
        }
        return callBack(null, results[0]);
      }
    );
    if (!results) {
      res.status(401).json({
        success: 0,
        data: "Invalid token.",
      });
    } else {
      req.body.user_id = decode;
      next();
    }
  } else {
    // Return response with error
    res.status(400).json({
      success: 0,
      data: "Error.",
    });
  }
};

export { checkAdmin, checkCustomer, checkRefreshToken };
