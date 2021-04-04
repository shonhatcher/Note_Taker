// const path = require('path');
// const fs = require('fs'); 

// module.exports = (app) => {

//     fs.readFile("db/db.json","utf8", (err, data) => {
//         if (err) throw err;
//         var notesData = JSON.parse(data);
//     });

//     app.get('/', (req,res) => {
//         res.sendFile(path.join(__dirname, '../public/index.html'));
//     });

//     app.get('/notes', (req,res) => {
//         res.sendFile(path.join(__dirname, '../public/notes.html'));
//     })

//     app.get("api/notes", (req,res) => {
//         res.json(notesData);
//     })

//     app.get("/api/notes/:id", (req,res) => {
//         res.json(notedata[req.params.id]);
//     });

//     app.post('api/notes', (req,res) => {
//         let newNote = req.body
//         notesData.push(newNote); 
//         fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
//             if (err) throw err; 
//             return true; 
//         });
//     });
// }; 


const fs = require('fs');
const path = require('path');

module.exports = app => {

    // Setup notes variable
    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        // API ROUTES
        // ========================================================
    
        // Setup the /api/notes get route
        app.get("/api/notes", function(req, res) {
            // Read the db.json file and return all saved notes as JSON.
            res.json(notes);
        });

        // Setup the /api/notes post route
        app.post("/api/notes", function(req, res) {
            // Receives a new note, adds it to db.json, then returns the new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: "+newNote.title);
        });

        // Retrieves a note with specific id
        app.get("/api/notes/:id", function(req,res) {
            // display json for the notes array indices of the provided id
            res.json(notes[req.params.id]);
        });

        
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //updates the json file whenever a note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}