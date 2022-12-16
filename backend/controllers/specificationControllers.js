import {
    getSpecificationByIdDB,
} from '../models/specificationModel.js';

const getSpecificationById = (req, res) => {
    const specificationId = req.params.id;
    getSpecificationByIdDB(specificationId, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.status(400).json({
                success: 0,
                data: "specification not found"
            });
        }
        return res.json({
            success: 1,
            message: "get specification successfully",
            promotion: results
        });
    });
}

export {
    getSpecificationById,
}
