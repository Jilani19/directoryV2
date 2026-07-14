/* eslint-disable @typescript-eslint/no-require-imports */
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../server/dev.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  console.log("Fixing country distribution...");
  
  db.run("PRAGMA foreign_keys = OFF;");
  
  db.all("SELECT id, name FROM Country", (err, countries) => {
    if (err) throw err;
    
    const usaRow = countries.find(c => c.name === 'USA');
    const globalCountries = countries.filter(c => c.name !== 'USA');
    
    db.all("SELECT id FROM Company", (err, companies) => {
      if (err) throw err;
      
      console.log(`Found ${companies.length} companies. Distributing correctly to ${globalCountries.length} countries...`);
      
      db.run("BEGIN TRANSACTION");
      const updateStmt = db.prepare("UPDATE Company SET countryId = ? WHERE id = ?");
      
      let updatedCount = 0;
      for (const company of companies) {
        if (Math.random() < 0.4 && usaRow) {
          updateStmt.run([usaRow.id, company.id]);
        } else {
          const randomCountryId = globalCountries[Math.floor(Math.random() * globalCountries.length)].id;
          updateStmt.run([randomCountryId, company.id]);
        }
        updatedCount++;
      }
      
      updateStmt.finalize(() => {
        db.run("COMMIT", () => {
          console.log(`Successfully distributed ${updatedCount} companies globally.`);
          
          db.all("SELECT co.name, COUNT(c.id) as count FROM Country co JOIN Company c ON c.countryId = co.id GROUP BY co.name ORDER BY count DESC LIMIT 15", (err, rows) => {
            console.log("New Distribution:");
            console.log(rows);
            db.run("PRAGMA foreign_keys = ON;");
            db.close();
          });
        });
      });
    });
  });
});
