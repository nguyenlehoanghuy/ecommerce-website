import connectDB from "../config/db.js";

const getPromotionByIdDB = (promotionID, callBack) => {
    connectDB.query(
        `select * from promotion where promotion_id = ?`,
        [promotionID],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
}

const getPromotionDB = (callBack) => {
    connectDB.query(
        `select * from promotion`,
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}

export {
    getPromotionByIdDB,
    getPromotionDB,
}
