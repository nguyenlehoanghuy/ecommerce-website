import connection from "../config/database.js";

const insertUserDb = (data, callBack) => {
  connection.query(
    `START TRANSACTION;
    INSERT INTO accounts(user_name, user_password) VALUES (?, ?);
    INSERT INTO users(user_first_name, user_last_name, user_gender, user_date_birth, user_email, user_phone, user_name) VALUES (?, ?, ?, ?, ?, ?, ?);
    INSERT INTO carts(cart_total, user_id) VALUES (0, LAST_INSERT_ID());
    COMMIT;`,
    [
      data.user_name,
      data.user_password,
      data.user_first_name,
      data.user_last_name,
      data.user_gender,
      data.user_date_birth,
      data.user_email,
      data.user_phone,
      data.user_name,
    ],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
};

const getUsersDb = (data, callBack) => {
  connection.query(`SELECT * FROM users;`, [], (error, results, fields) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  });
};

const deleteUsersDb = (data, callBack) => {
  connection.query(`DELETE FROM users;`, [], (error, results, fields) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  });
};

export { insertUserDb, getUsersDb, deleteUsersDb };
