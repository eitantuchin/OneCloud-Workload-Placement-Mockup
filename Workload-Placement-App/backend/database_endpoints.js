const express = require("express");
const db = require("./db.js");
const cors = require("cors");
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 } 
const app = express();
const PORT = 3000;
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});



app.post("/addResponse", async (req, res) => {
    try {
        const { User_ID, VSAD, RESPONSES, REC } = req.body; 
        const query = "INSERT INTO userdata (User_ID, VSAD, RESPONSES, REC) VALUES (?, ?, ?, ?)";
        await db.query(query, [User_ID, VSAD, RESPONSES, REC]);
        console.log("Success in creating a new response");
        res.status(201).send({ message: 'Response created successfully' });
    } catch (err) {
        console.error("Error in creating a new response:", err);
        res.status(500).send({ error: 'An error occurred while creating a new response.' });
    }
});