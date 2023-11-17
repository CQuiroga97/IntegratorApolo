const jwt = require("jsonwebtoken");
const md5 = require("md5");
exports.login = (req, res, con)=>{
    
    con.query(`exec loginAdmin "${req.body.name}", "${md5(req.body.pass)}"`, (err, result)=>{
        if(err){
            return res.status(401).send({msg:err})
        }
        const id = result.recordset[0]["resultado"];
        result.recordset[0]["rol"]="Admin";
        if(id){
            const token = jwt.sign({id:id, data:result.recordset[0]}, "the-super-strong-secret", {expiresIn:"1h"});
            return res.status(200).send({msg:"Logueado", token})
        }else{
            return res.status(401).send({msg:"Usuario no encontrado"})
        }
    })
    
    
}