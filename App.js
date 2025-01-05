import {Button, StyleSheet, Text, View, Modal, Pressable, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import AddOrEditEvent from "./Components/AddOrEditEvent";
import Event from "./Entities/events";
import eventsRepo from "./Repo/repo";
import ExpandableEventInfo from "./Components/ExpandableEventInfo";

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
        eventsRepo.fetchAllEvents().then(r => console.log(r));
    }, []);
    console.log("PickedEvent: ", pickedEvent);
    console.log(Object.getOwnPropertyNames(pickedEvent));

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