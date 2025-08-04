require('dotenv').config();  // dotenv আগে লোড হবে
const app = require('./app');

const port = process.env.PORT || 5050;  // ডিফল্ট পোর্ট দেওয়া হলো

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
