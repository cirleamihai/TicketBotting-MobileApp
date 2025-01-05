import {addEvent, deleteEvent, updateEvent, getEvents} from "../Api/eventsAPI";

class EventsRepo {
    events = [];

    async addEvent(event) {
        this.events.push(event);
        // await addEvent(event);
    }

    async updateEvent(event) {
        const index = this.events.findIndex(e => e.id === event.id);
        this.events[index] = event;
        // await updateEvent(event);
    }

    async deleteEvent(event) {
        this.events = this.events.filter(e => e.id !== event.id);
        // await deleteEvent(event);
    }

    async fetchAllEvents() {
        this.events = await getEvents();
    }

    getEvents() {
        return this.events;
    }
}

const eventsRepo = new EventsRepo();
export default eventsRepo;
