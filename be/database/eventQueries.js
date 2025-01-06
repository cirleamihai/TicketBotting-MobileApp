const sqlite3 = require('sqlite3').verbose();
const Event = require('../entities/event'); // Import your Event class
const db_name = './events.db';
const open_db = require('./initDB.js');

async function fetchAllEvents() {
    const db = open_db();
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM events', (err, rows) => {
            db.close(); // Close the database connection

            if (err) {
                reject(err);
            } else {
                resolve(rows.map(row => Event.from_object(row)));
            }
        });
    });
}

async function addEvent(event) {
    const db = open_db();
    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`
            INSERT INTO events (id, eventName, description, artist, date)
            VALUES (?, ?, ?, ?, ?)
        `);
        stmt.run(event.id, event.eventName, event.description, event.artist, event.formatted_date(), function (err) {
            db.close(); // Close the database connection
            stmt.finalize(); // Close the statement

            if (err) {
                reject(err);
            } else {
                resolve(`Successfully added event ${event.formatted_display()}.`);
            }
        });
    })
}

async function updateEvent(event) {
    const db = open_db();
    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`
            UPDATE events
            SET eventName   = ?,
                description = ?,
                artist      = ?,
                date        = ?
            WHERE id = ?
        `);
        stmt.run(event.eventName, event.description, event.artist, event.formatted_date(), event.id, function (err) {
            db.close(); // Close the database connection
            stmt.finalize(); // Close the statement

            if (err) {
                reject(err);
            } else {
                resolve(`Successfully updated event ${event.formatted_display()}.`);
            }
        });
    })
}

async function deleteEvent(eventId) {
    const db = open_db();

    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`
            DELETE
            FROM events
            WHERE id = ?
        `)

        stmt.run(eventId, function (err) {
            db.close(); // Close the database connection
            stmt.finalize(); // Close the statement

            if (err) {
                reject(err);
            } else {
                resolve(`Successfully deleted event ${eventId}.`);
            }
        });
    })
}

async function syncEvents(events) {
    const db = open_db();

    return new Promise((resolve, reject) => {
        if (events.length === 0) {
            // If the events list is empty, delete all records
            db.run(`DELETE FROM events`, (err) => {
                if (err) {
                    db.close();
                    return reject(err);
                }
                db.close();
                return resolve("All events deleted from database.");
            });
            return;
        }

        const eventIds = events.map(e => e.id); // List of IDs
        const placeholders = eventIds.map(() => '?').join(','); // Create ?,?,? placeholders

        const deleteStmt = db.prepare(`
            DELETE FROM events WHERE id NOT IN (${placeholders})
        `);

        deleteStmt.run(eventIds, function (err) {
            if (err) {
                deleteStmt.finalize(); // Close the statement
                db.close(); // Close the DB if there's an error
                return reject(err);
            }

            const stmt = db.prepare(`
                INSERT OR REPLACE INTO events (id, eventName, description, artist, date)
                VALUES (?, ?, ?, ?, ?)
            `);

            events.forEach(event => {
                stmt.run(event.id, event.eventName, event.description, event.artist, event.formatted_date());
            });

            stmt.finalize(); // Finalize the `INSERT` statement
            deleteStmt.finalize(); // Finalize the `DELETE` statement
            db.close(); // Close the DB connection after everything
            resolve("Events synchronized successfully.");
        });
    });
}

module.exports = {fetchAllEvents, addEvent, updateEvent, deleteEvent, syncEvents};
