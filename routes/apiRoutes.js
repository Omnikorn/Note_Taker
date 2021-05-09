const path = require("path");
const db = require('../db/db')

module.exports = (app) => {
    
    app.get("/api/notes",(req,res)=>
    db.getNotes().then((notes) => {
        res.json(notes)
    }));

    app.post("/api/notes",(req,res)=>{
        db.noteHandle(req.body).then((note) => {
            res.json(note)
        })
    });
    app.delete("/api/notes/:id", (req,res) =>{
        const id = req.params.id;
        db.deleteNote(id).then(() => res.json({Response: "Successful"})).catch((error) => res.json(error))
    })
}   