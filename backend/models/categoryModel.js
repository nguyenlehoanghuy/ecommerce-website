import connectDB from '../config/db.js';

const getCategoryByIdDB = (categoryId, callBack) => {
    connectDB.query(
        `select * from category where category_id = ?`,
        [categoryId],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
};

const getCategoryDB = (option, callBack) => {
    let dbQuery = `select * from category where 1=1`;
    if (option.category_name) {
        dbQuery += ` and category_name = "${option.category_name}"`;
    }

    connectDB.query(dbQuery, (error, results, fields) => {
        if (error) {
            callBack(error);
        }
        return callBack(null, results);
    });
};

const addCategoryDB = (data, callBack) => {
    connectDB.query(
        `INSERT INTO category (category_name) VALUES (?);`,
        [data.category_name],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const deleteAllCategoryDB = (data, callBack) => {
    connectDB.query(`DELETE FROM category;`, [], (error, results, fields) => {
        if (error) {
            callBack(error);
        }
        return callBack(null, results);
    });
};

const updateSpecificCategoryDB = (data, callBack) => {
    connectDB.query(
        `UPDATE category SET category_name = ? WHERE category_id = ?;`,
        [data.category_name, data.category_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const deleteSpecificCategoryDB = (data, callBack) => {
    connectDB.query(
        `DELETE FROM category WHERE category_id = ?;`,
        [data.category_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

export {
    getCategoryByIdDB,
    getCategoryDB,
    addCategoryDB,
    deleteAllCategoryDB,
    updateSpecificCategoryDB,
    deleteSpecificCategoryDB,
};
