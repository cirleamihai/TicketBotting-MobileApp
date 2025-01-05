import 'react-native-get-random-values';
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
        return new Event(null, '', '', '', null);
    }

    is_empty() {
        return !this.eventName && !this.description && !this.artist && !this.date;
    }

    formatted_date() {
        if (this.date) {
            return '{}-{}-{}'.format(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
        }
        return '';
    }
}

export default Event;