const sqlite3 = require('sqlite3').verbose();
const Event = require('../entities/event'); // Import your Event class
const db_name = require('path').join(__dirname, 'events.db');

function open_db() {
    return new sqlite3.Database(db_name);
}


function initialize_db() {
    const db = open_db();
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS events
            (
                id TEXT PRIMARY KEY,
                eventName TEXT NOT NULL,
                description TEXT,
                artist TEXT,
                date TEXT
            )
        `);

        // Insert 10 rows into the "events" table
        const stmt = db.prepare(`
            INSERT INTO events (id, eventName, description, artist, date)
            VALUES (?, ?, ?, ?, ?)
        `);

        const sampleEvents = [
            new Event(null, "Rock Night", "A night of rock music. Tap into the universe of rock with us!", "The Rockers", new Date(2025, 0, 15)),
            new Event(null, "Jazz Evening", "An intimate evening with jazz classics.", "Smooth Jazz Trio", new Date(2025, 1, 20)),
            new Event(null, "Indie Vibes", "Indie artists showcasing their best work.", "IndieSound Collective", new Date(2025, 2, 10)),
            new Event(null, "Hip-Hop Beats", "The best hip-hop show of the year.", "DJ Flow", new Date(2025, 3, 5)),
            new Event(null, "Classical Gala", "An orchestral night of classical music.", "Philharmonic Symphony", new Date(2025, 4, 25)),
            new Event(null, "Pop Explosion", "The biggest pop hits performed live.", "Pop Stars United", new Date(2025, 5, 12)),
            new Event(null, "Acoustic Night", "A laid-back night of acoustic covers.", "Acoustic Wanderers", new Date(2025, 6, 18)),
            new Event(null, "EDM Festival", "An electrifying night of EDM music.", "DJ Electro", new Date(2025, 7, 30)),
            new Event(null, "Soul Sessions", "A soulful night of smooth vocals.", "Soul Singers Crew", new Date(2025, 8, 8)),
            new Event(null, "Blues Legends", "Blues legends performing live.", "Blues Revival Band", new Date(2025, 9, 20))
        ];

        // Insert each event into the database
        sampleEvents.forEach((event) => {
            stmt.run(event.id, event.eventName, event.description, event.artist, event.formatted_date());
        });

        stmt.finalize(); // Close the statement

        // Retrieve and display all inserted events
        db.all('SELECT * FROM events', (err, rows) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Inserted Events:', rows);
            }
        });
    });

    db.close(); // Close the database connection
}

// initialize_db()

module.exports = open_db;