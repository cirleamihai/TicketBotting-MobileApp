import axios from 'axios';

const be_route = 'http://192.168.0.32:5050/events'

async function addEvent(event) {
    return axios.post(be_route, {event: event}, {timeout: 200});
}


async function updateEvent(event) {
    return axios.put(`${be_route}/${event.id}`, {event: event}, {timeout: 200});
}

async function deleteEvent(event) {
    return axios.delete(`${be_route}/${event.id}`, {timeout: 200});
}

async function getEvents() {
    return axios.get(be_route, {timeout: 200});
}

async function syncEvents(events) {
    return axios.post(`${be_route}/sync`, {events: events}, {timeout: 200});
}

export {addEvent, updateEvent, deleteEvent, getEvents, syncEvents};