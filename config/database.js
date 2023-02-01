import mysql_connector from "mysql";

const connection = mysql_connector.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e-commerce",
});

export default connection;
