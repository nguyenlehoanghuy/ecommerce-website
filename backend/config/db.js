import { createPool } from "mysql"

const connectDB = createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'phone_ver1',
    multipleStatements: true
});

export default connectDB;

