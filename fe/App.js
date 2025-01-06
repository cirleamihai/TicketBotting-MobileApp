import {Button, StyleSheet, View, Modal, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import AddOrEditEvent from "./Components/AddOrEditEvent";
import Event from "./Entities/events";
import eventsRepo from "./Repo/repo";
import ExpandableEventInfo from "./Components/ExpandableEventInfo";
import {healthCheck} from "./Api/healtcheckAPI";

export default function App() {
    const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
    const [pickedEvent, setPickedEvent] = useState(Event.create_empty_event());
    const [refreshKey, setRefreshKey] = useState(0);

    const handleAddEvent = () => {
        setIsAddButtonClicked(true);
    }

    const handleEditEvent = (event) => {
        setPickedEvent(event);
        setIsAddButtonClicked(true);
    }

    const handleCancelAddEventModal = () => {
        setIsAddButtonClicked(false);
        setPickedEvent(Event.create_empty_event());
    }

    const onDelete = async (event) => {
        await eventsRepo.deleteEvent(event);
        setRefreshKey(refreshKey + 1);
    }

    useEffect(() => {
        eventsRepo.fetchAllEvents().then(() => setRefreshKey(refreshKey + 1));
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            await healthCheck(); // Perform health check every 2 seconds
        }, 2000)

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    return (
        <View style={styles.appLayover}>
            <Modal visible={isAddButtonClicked} animationType="slide">
                <AddOrEditEvent
                    event={pickedEvent}
                    isEmpty={pickedEvent.is_empty()}
                    onClose={handleCancelAddEventModal}/>
            </Modal>
            <View style={styles.addButton}>
                <Button title={"Add Event"} onPress={handleAddEvent}/>
            </View>
            <View style={styles.eventsList}>
                <FlatList data={eventsRepo.getEvents()} renderItem={(pickedEvent) => {
                    return (
                        <ExpandableEventInfo
                            concertEvent={Event.from_object(pickedEvent.item)}
                            onEdit={handleEditEvent}
                            onDelete={onDelete}/>
                    );
                }}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appLayover: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        paddingTop: 50,
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    eventsList: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    }
})