require('dotenv').config()
const { Pool } = require("pg");
const con = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: process.env.DB_PASSWORD,
  database: "contact",
});
con.connect()
.then(() => console.log("connected"))// permet de connecter postgresql au serveur
.catch((err)=> console.error("erreur de connexion :",err))

module.exports=con