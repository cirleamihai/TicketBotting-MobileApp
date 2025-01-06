const { addEvent, updateEvent, deleteEvent, fetchAllEvents } = require('../database/eventQueries.js');

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

}

module.exports = new EventsRepo();