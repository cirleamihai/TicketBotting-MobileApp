import axios from 'axios';

async function addEvent(event) {
    return axios.post('/events', event);
}


async function updateEvent(event) {
    return axios.put(`/events/${event.id}`, event);
}

async function deleteEvent(event) {
    return axios.delete(`/events/${event.id}`);
}

async function getEvents() {
    return axios.get('/events');
}

export {addEvent, updateEvent, deleteEvent, getEvents};