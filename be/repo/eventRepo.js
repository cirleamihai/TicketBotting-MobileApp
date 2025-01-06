const { addEvent, updateEvent, deleteEvent, fetchAllEvents, syncEvents } = require('../database/eventQueries.js');

class EventsRepo {

    async addEvent(event) {
        return addEvent(event); // Directly return the promise
    }

    async updateEvent(event) {
        return updateEvent(event);
    }

    async deleteEvent(eventId) {
        return deleteEvent(eventId);
    }

    async fetchAllEvents() {
        return fetchAllEvents();
    }

    async syncEvents(events) {
        return syncEvents(events)
    }

}

module.exports = new EventsRepo();