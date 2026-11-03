
require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/db/db');

const PORT = 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server Started at port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
};

startServer();
