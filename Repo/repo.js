import {addEvent, deleteEvent, updateEvent, getEvents} from "../Api/eventsAPI";
import Event from "../Entities/events";

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

const sampleEvents = [
    new Event(null, "Rock Night", "A night of rock music.", "The Rockers", new Date(2025, 0, 15)),
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

const eventsRepo = new EventsRepo();
eventsRepo.events = sampleEvents;

export default eventsRepo;
