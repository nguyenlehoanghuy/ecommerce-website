import {
    getCategoryByIdDB,
    getCategoryDB,
    addCategoryDB,
    deleteAllCategoryDB,
    updateSpecificCategoryDB,
    deleteSpecificCategoryDB
} from '../models/categoryModel.js';

const getCategoryById = (req, res) => {
    const promotionId = req.params.id;
    getCategoryByIdDB(promotionId, (err, results) => {
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
            promotion: results
        });
    });
}

const getCategory = (req, res) => {
    const category_name = req.query.category_name
    const option = {
        category_name,
    }
    getCategoryDB(option, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.status(400).json({
                success: 0,
                data: "Cant get category"
            });
        }
        return res.json({
            success: 1,
            message: "Get category successfully",
            data: results
        });
    });
}

const addCategory = (req, res) => {
    const data = {
        category_name: req.body.category_name
    }

    addCategoryDB(data, (err, results) => {
        if (err) {
            return res.status(501).json({
                success: 0,
                message: err
            });
        }

        if (results.affectedRows === 0) {
            return res.status(400).json({
                success: 0,
                message: "Can not add category"
            });
        } else {
            return res.status(201).json({
                success: 1,
                message: "Add category successfully",
                data: results
            });
        }
    });
}

const deleteAllCategory = (req, res) => {
    const data = {}

    deleteAllCategoryDB(data, (err, results) => {
        if (err) {
            return res.status(501).json({
                success: 0,
                message: err
            });
        }

        if (results.affectedRows === 0) {
            return res.status(400).json({
                success: 0,
                message: "Can not delete categories"
            });
        } else {
            return res.status(201).json({
                success: 1,
                message: "Delete categories successfully",
                data: results
            });
        }
    });
}

const updateSpecificCategory = (req, res) => {
    const data = {
        category_name: req.body.category_name,
        category_id: req.params.id
    }

    updateSpecificCategoryDB(data, (err, results) => {
        if (err) {
            return res.status(501).json({
                success: 0,
                message: err
            });
        }

        if (results.affectedRows === 0) {
            return res.status(400).json({
                success: 0,
                message: "Can not update category"
            });
        } else {
            return res.status(201).json({
                success: 1,
                message: "Update category successfully",
                data: results
            });
        }
    });
}

const deleteSpecificCategory = (req, res) => {
    const data = {
        category_id: req.params.id
    }

    deleteSpecificCategoryDB(data, (err, results) => {
        if (err) {
            return res.status(501).json({
                success: 0,
                message: err
            });
        }

        if (results.affectedRows === 0) {
            return res.status(400).json({
                success: 0,
                message: "Can not delete category"
            });
        } else {
            return res.status(201).json({
                success: 1,
                message: "Delete category successfully",
                data: results
            });
        }
    });
}

export {
    getCategoryById,
    getCategory,
    addCategory,
    deleteAllCategory,
    updateSpecificCategory,
    deleteSpecificCategory
}
