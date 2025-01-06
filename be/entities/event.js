const { v4: uuidv4 } = require('uuid');

class Event {
    id
    eventName
    description
    artist
    date

    constructor(id=null, eventName, description, artist, date) {
        this.id = id || uuidv4();
        this.eventName = eventName;
        this.description = description;
        this.artist = artist;
        this.date = date;
    }

    static from_object(obj) {
        return new Event(obj.id, obj.eventName, obj.description, obj.artist, obj.date);
    }

    formatted_display() {
        return `${this.artist} | ${this.eventName}`;
    }

    formatted_date() {
        if (this.date) {
            return new Date(this.date).toISOString();
        }
        return '';
    }


}

module.exports = Event;