const sqlite3 = require("sqlite3").verbose();

// Create and connect to the SQLite database
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");

    // Create users table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            address TEXT,
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("Users table ready.");

          // Insert some sample data if the table is empty
          db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
            if (err) {
              console.error("Error checking table:", err.message);
            } else if (row.count === 0) {
              console.log("Inserting sample data...");
              const sampleUsers = [
                ["John Doe", "john@example.com", "123-456-7890", "123 Main St"],
                [
                  "Jane Smith",
                  "jane@example.com",
                  "098-765-4321",
                  "456 Oak Ave",
                ],
                [
                  "Bob Johnson",
                  "bob@example.com",
                  "555-123-4567",
                  "789 Pine Rd",
                ],
              ];

              const insert = db.prepare(
                "INSERT INTO users (name, email, phone, address) VALUES (?, ?, ?, ?)"
              );
              sampleUsers.forEach((user) => {
                insert.run(user, (err) => {
                  if (err) {
                    console.error("Error inserting sample data:", err.message);
                  }
                });
              });
              insert.finalize();
            }
          });
        }
      }
    );
  }
});

module.exports = db;
