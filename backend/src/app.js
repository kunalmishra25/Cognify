const express = require('express')

const cors = require('cors')

const authRoutes = require('./routes/auth.routes')
const summaryRoutes = require('./routes/summary.routes')
const cookieParser = require('cookie-parser')


const app = express()

//MIDDLEWARE
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://cognify-study.vercel.app"
    ],
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())


app.use('/api/auth', authRoutes);
app.use('/api/summary', summaryRoutes);

module.exports = app