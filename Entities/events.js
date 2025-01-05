import { v4 as uuidv4 } from 'uuid';

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

    static create_empty_event() {
        return new Event(null, '', '', '', '');
    }

    is_empty() {
        return this.eventName === '' && this.description === '' && this.artist === '' && this.date === '';
    }
}

export default Event;