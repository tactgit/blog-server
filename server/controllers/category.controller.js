const { Response, DATABASE } = require("../utils");

// services
const { categoryService} = require("../services");

// utils
const { errorHandler } = require("../utils");

// config
const { MESSAGES } = require("../consts");

const createCategory = async (req, res, next) => {
    try {
        console.log('------------username----------------: ' + req.user.username)
        const { title, content, imageUrl, time, ...rest } = req.body;
        const id = Number(req.query.id);
        if ( id > 0 ) {
            let data = {};
            if(imageUrl == "") {
                data = {
                    title: title,
                    content: content,
                }
            } else {
                data = {
                    title: title,
                    content: content,
                    imageUrl: imageUrl
                }
            }
            await categoryService.updateCategory(id, data);
        } else {
            await categoryService.createCategory({
                userId: req.user.id,
                title,
                content,
                imageUrl,
                time,
            });
        }


        Response(res, 200, {}, "category create success!");
    } catch (error) {
        errorHandler(res, error);
    }
};

const readCategories = async (req, res, next) => {
    try {
        const pageIndex = req.query.pageIndex ? Number(req.query.pageIndex) : 1;
        const itemCount = req.query.itemCount ? Number(req.query.itemCount) : 5;
        const searchKeyword = req.query.searchKeyword;
        const sortField = req.query.sortField;
        const sortDir = req.query.sortDir;

        const [categoriesCount] = await categoryService.readCategoriesCount(searchKeyword);
        const categories = await categoryService.readCategories(
            pageIndex,
            itemCount,
            searchKeyword,
            sortField, 
            sortDir
        );

        Response(res, 200, {
            categories,
            count: categoriesCount.count,
        }, "readCategories success!");
    } catch (error) {
        errorHandler(res, error);
    }
};

const readCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [category] = await categoryService.readCategory(id);

        Response(res, 200, {
            category,
        });
    } catch (error) {
        errorHandler(res, error);
    }
};


const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content, imageUrl, time, ...rest } = req.body;

        await categoryService.updateCategory(id, {
            title,
            content,
            imageUrl,
            time,
        });

        Response(res, 200, {}, "category update success!");
    } catch (error) {
        errorHandler(res, error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        await categoryService.deleteCategory(id);

        Response(res, 200, {}, "category delete success!");
    } catch (error) {
        errorHandler(res, error);
    }
};

const increaseVote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentVote = Number(req.query.currentVote);

        await categoryService.increaseVote(id, currentVote);

        Response(res, 200, {}, "vote increase success!");
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports = {
    createCategory,
    readCategories,
    readCategory,
    updateCategory,
    deleteCategory,
    increaseVote,
}