import axios from 'axios';
import dependencies from "../dependencies.js";
import eventsRepo from "../Repo/repo.js";
import {syncEvents} from "./eventsAPI.js";

const health_check_route = 'http://192.168.0.32:5050/health'


async function healthCheck() {
    try {
        await axios.get(health_check_route, { timeout: 200 }); // Perform health check
        if (dependencies.isBackendOffline) {
            console.log("Backend is back online, syncing events...");
            try {
                const response = await syncEvents(eventsRepo.getEvents()); // Sync events if backend is back online
                console.log(response.data);
            } catch (err) {
                console.error("Error syncing events:", err.message);
                return; // Backend may still be unstable or offline
            }
        } else {
            console.log("Backend is online.");
        }
        dependencies.isBackendOffline = false; // Backend is now online
    } catch (err) {
        console.warn("Health check failed, backend is offline.");
        dependencies.isBackendOffline = true; // Mark backend as offline
    }
}

export {healthCheck};