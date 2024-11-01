const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
    }
);

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to database established successfully.");
 
        await sequelize.sync({ force: false });
        console.log("Database & tables synced!");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
};

module.exports = { sequelize, connect };