import {
    getPromotionByIdDB,
    getPromotionDB,
} from '../models/promotionModel.js';

const getPromotionById = (req, res) => {
    const promotionId = req.params.id;
    getPromotionByIdDB(promotionId, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.status(400).json({
                success: 0,
                data: "promotion not found"
            });
        }
        return res.json({
            success: 1,
            message: "get promotion successfully",
            data: results
        });
    });
}

const getPromotion = (req, res) => {
    getPromotionDB((err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.status(400).json({
                success: 0,
                data: "Cant get promotion list"
            });
        }
        return res.json({
            success: 1,
            message: "Get promotion list successfully",
            data: results
        });
    });
}

export {
    getPromotionById,
    getPromotion,
}
