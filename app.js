require('dotenv').config()
const con = require("./config/db")
const express =require("express")
const nodemailer= require("nodemailer")
const cors = require("cors")
const app =express()
app.use(cors())
app.use(express.json())

app.post("/contact", async (req,res) => {
  try {
     const{nom, email, messagers}= req.body
     const result= await con.query("INSERT INTO messages (nom, email, messagers) VALUES ($1, $2, $3) RETURNING *",
        [nom, email, messagers] )
     res.status(201).json(result.rows[0])
     const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD,
        }
    });
    await transporter.sendMail({
        from: email,
        to: process.env.EMAIL_TO,
        subject: `Nouveau message de ${nom}`,
        text: messagers,
    });
    
    } catch (err) {
     console.error(err);
    res.status(500).send("erreur dans le serveur"); 
    }
    
})

app.listen(process.env.PORT) 

