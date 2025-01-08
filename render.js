var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

db.serialize(function() {
    db.run("CREATE TABLE lorem (info TEXT)");
    
    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    
    stmt.finalize();
    
    var rows = document.getElementById("decks");
    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        var item = document.createElement("li");
        item.textContent = "" + row.id + ": " + row.info;
        rows.appendChild(item);
    });
});

db.close();