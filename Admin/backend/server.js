import express from "express";


const app = express();
const port = 3000; 


// ROUTES:
app.get('/', (req, res) => {
 res.send('Home page (backend)');
});






// Start the server
app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`);
});