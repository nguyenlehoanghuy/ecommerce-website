import connectDB from "../config/db.js";

const getSpecificationByIdDB = (specificationId, callBack) => {
    connectDB.query(
        `select * from specification where specification_id = ?`,
        [specificationId],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
}

export {
    getSpecificationByIdDB,
}
