import {addEvent, deleteEvent, updateEvent, getEvents} from "../Api/eventsAPI";
import Event from "../Entities/events";

class EventsRepo {
    events = [];

    async addEvent(event) {
        this.events.push(event);
        await addEvent(event);
    }

    async updateEvent(event) {
        const index = this.events.findIndex(e => e.id === event.id);
        this.events[index] = event;
        await updateEvent(event);
    }

    async deleteEvent(event) {
        this.events = this.events.filter(e => e.id !== event.id);
        try {
            const response = await deleteEvent(event);
            console.log(response.data);
        } catch (err) {
            console.log("Error deleting event:", err);
        }
    }

    async fetchAllEvents() {
        try {
            const response = await getEvents(); // Await the axios.get() Promise
            this.events = response.data.map((jsonEvent) => Event.from_object(jsonEvent)); // Store the actual list of events
            console.log(this.events[1].formatted_date())
        } catch (err) {
            console.log("Error fetching events:", err);
        }
    }

    getEvents() {
        return this.events;
    }
}

const eventsRepo = new EventsRepo();

export default eventsRepo;
