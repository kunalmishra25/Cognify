require('dotenv').config();
const app = require('./src/app');

app.listen(5000, () => {
    console.log('Server Started at port 5000');

})