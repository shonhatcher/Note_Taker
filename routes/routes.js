const path = require('path');
const fs = require('fs'); 

module.exports = (app) => {

    fs.readFile("db/db.json","utf8", (err, data) => {
        if (err) throw err;
        var notesData = JSON.parse(data);
    });

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    app.get('/notes', (req,res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    })

    app.get("api/notes", (req,res) => {
        res.json(notesData);
    })

    app.get("/api/notes/:id", (req,res) => {
        res.json(notedata[req.params.id]);
    });

    app.post('api/notes', (req,res) => {
        let newNote = req.body
        notesData.push(newNote); 
        fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
            if (err) throw err; 
            return true; 
        });
    });
}; 