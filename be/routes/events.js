const express = require('express');
const router = express.Router();
const eventsRepo = require('../repo/eventRepo.js');
const Event = require('../entities/event.js');

router.get('/', async (req, res) => {
    try {
        const events = await eventsRepo.fetchAllEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const events = await eventsRepo.fetchAllEvents();
        const event = events.find(e => e.id === eventId);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({error: 'Event not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.post('/', async (req, res) => {
    try {
        const event = req.body.event; // Assuming the event is sent in the request body
        const result = await eventsRepo.addEvent(Event.from_object(event));
        res.status(201).json({message: result});
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const event = req.body.event;
        const result = await eventsRepo.updateEvent(Event.from_object(event));
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const result = await eventsRepo.deleteEvent(eventId);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.post('/sync', async (req, res) => {
    try {
        const events = req.body.events.map(event => Event.from_object(event));
        const result = await eventsRepo.syncEvents(events);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;