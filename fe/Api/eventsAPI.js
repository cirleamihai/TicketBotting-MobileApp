import axios from 'axios';

const be_route = 'http://192.168.0.32:5050/events'

async function addEvent(event) {
    return axios.post(be_route, {event});
}


async function updateEvent(event) {
    return axios.put(`${be_route}/${event.id}`, {event});
}

async function deleteEvent(event) {
    return axios.delete(`${be_route}/${event.id}`);
}

async function getEvents() {
    return axios.get(be_route);
}

export {addEvent, updateEvent, deleteEvent, getEvents};