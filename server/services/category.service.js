// node_modules
const moment = require("moment");

// utils
const { DATABASE } = require("../utils");

const createCategory = async (categoryData) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector.returning("id").insert("category", categoryData);
    } catch (error) {
        throw error;
    }
};

const readCategoriesCount = async (searchKeyword) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .select(["COUNT (*) as count"])
            .like("title", `%${searchKeyword}%`, "none")
            .or_like("content", `%${searchKeyword}%`, "none")
            .get("category");
    } catch (error) {
        throw error;
    }
};

const readCategories = async (pageIndex, itemCount, searchKeyword, sortField, sortDir) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .select(["id", "userId", "title", "content", "imageUrl", "time", "likes"])
            .like("title", `%${searchKeyword}%`, "none")
            .or_like("content", `%${searchKeyword}%`, "none")
            .order_by(`${sortField}`, `${sortDir}`)
            .offset((pageIndex - 1) * itemCount)
            .limit(itemCount)
            .get("category");
    } catch (error) {
        throw error;
    }
};

const readCategory = async (id) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .select(["id", "userId", "title", "content", "imageUrl", "time", "likes"])
            .where(`id = ${id}`)
            .get("category");
    } catch (error) {
        throw error;
    }
};

const updateCategory = async (id, categoryData) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector.where({ id }).set(categoryData).update("category");
    } catch (error) {
        throw error;
    }
};

const deleteCategory = async (id) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .where({ id })
            .delete("category");
    } catch (error) {
        throw error;
    }
};

const increaseVote = async (id, currentVote) => {
    const voteCount = currentVote + 1;
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .where({ id })
            .set('likes',voteCount).update("category")
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createCategory,
    readCategoriesCount,
    readCategories,
    readCategory,
    updateCategory,
    deleteCategory,
    increaseVote,
};
