require('dotenv').config();
const app = require('./src/app');

console.log("GROQ_API:", process.env.GROQ_API);

app.listen(5000, () => {
    console.log('Server Started at port 5000');

})