const express = require('express');
const app = express();
const multer  = require('multer')
const bodyparser = require('body-parser');
const sqlite3 = require('sqlite3').verbose()
app.use(express.static("./public"));
const upload = multer({ dest: './images/' });
app.use(multer({storage: upload}).single('photo'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err;
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            phone text, 
            picture text
            )`,
        (err) => {
            console.error(err);
        });  
    }
});

app.post("/upload", upload.single('image'), (req, res) => {
    if (!req.body.name) {
        console.log("No file to upload");
    } else {
        var values = [req.body.name, req.body.email, req.body.phone, req.body.picture];
        var insertData = "INSERT INTO user(name, email, phone, picture)VALUES(?,?,?,?)";
        db.run(insertData, values, function (err, result) {
            if (err){
                console.log(err);
                res.status(400).json({"error": err.message})
                return;
            } 
        });   
        res.status(200).json({});
    }
});

app.get("/download", async (req, res) => {
    var selectQuery = "SELECT * FROM user";
    let result = [];
    await db.all(selectQuery, (err, row) => {
        res.status(200).json({ data: row });
    });  
});

app.delete('/delete/:name', function (req, res) {
    db.run(`DELETE FROM user WHERE name=?`, req.params.name, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) deleted ${this.changes}`);
    });
    res.status(200).json({});
  })

app.listen(3001,() => console.log("Server listening at port 3001"));
    