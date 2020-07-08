const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");
//middleware
app.use(cors());
app.use(express.json());

//get Count
app.get('/count', async (req, res) =>{
    try{
        const Count = await pool.query("SELECT COUNT(*) FROM questions");
        res.json(Count.rows)
    }catch(err){
        console.error(err.message);
    }
})

//get one question

app.get('/', async (req, res) =>{
    try{
        const Count = await pool.query("SELECT question FROM questions");
        res.json(Count.rows)
    }catch(err){
        console.error(err.message);
    }
})

app.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const Question = await pool.query("SELECT * FROM questions WHERE id = $1", [id]);
        res.json(Question.rows)
    }catch (err){
        console.error(err.message);
    }
});


app.listen(4000, () => {
    console.log("server has started on port 5000");
})