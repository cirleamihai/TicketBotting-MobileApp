import {addEvent, deleteEvent, updateEvent, getEvents} from "../Api/eventsAPI";
import Event from "../Entities/events";
import dependencies from "../dependencies.js";

class EventsRepo {
    events = [];

    async addEvent(event) {
        this.events.push(event);

        if (dependencies.isBackendOffline) {
            console.log("Backend is offline, event will be added locally.");
            return;
        }

        try {
            await addEvent(event);
        } catch (err) {
            console.log("Error adding event:", err);
        }
    }

    async updateEvent(event) {
        const index = this.events.findIndex(e => e.id === event.id);
        this.events[index] = event;
        if (dependencies.isBackendOffline) {
            console.log("Backend is offline, event will be updated locally.");
            return;
        }

        try {
            await updateEvent(event);
        } catch (err) {
            console.log("Error updating event:", err);
        }
    }

    async deleteEvent(event) {
        this.events = this.events.filter(e => e.id !== event.id);

        if (dependencies.isBackendOffline) {
            console.log("Backend is offline, event will be deleted locally.");
            return;
        }

        try {
            await deleteEvent(event);
        } catch (err) {
            console.log("Error deleting event:", err);
        }
    }

    async fetchAllEvents() {
        if (dependencies.isBackendOffline) {
            console.log("Backend is offline, using local events.");
            return;
        }

        try {
            const response = await getEvents(); // Await the axios.get() Promise
            this.events = response.data.map((jsonEvent) => Event.from_object(jsonEvent)); // Store the actual list of events
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
