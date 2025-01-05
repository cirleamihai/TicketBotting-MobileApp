import {Button, StyleSheet, Text, View, Modal} from 'react-native';
import React, {useState, useEffect} from 'react';
import AddOrEditEvent from "./Components/AddOrEditEvent";
import Event from "./Entities/events";
import eventsRepo from "./Repo/repo";

export default function App() {
    const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);

    const handleAddEvent = () => {
        setIsAddButtonClicked(true);
    }

    const handleCancelAddEventModal = () => {
        setIsAddButtonClicked(false);
    }

    useEffect(() => {
        eventsRepo.fetchAllEvents();
    }, []);

    return (
        <View style={styles.appLayover}>
            <Modal visible={isAddButtonClicked} animationType="slide">
            <AddOrEditEvent event={Event.create_empty_event()} onClose={handleCancelAddEventModal}/>
            </Modal>
            <View style={styles.addButton}>
                <Button title={"Add Event"} onPress={handleAddEvent}/>
            </View>
            <View style={styles.eventsList}>
                {
                    eventsRepo.getEvents().map((concertEvent) => {
                        return (
                            <View key={concertEvent.id} style={{marginBottom: 20}}>
                                <Text>{concertEvent.eventName}</Text>
                                <Text>{concertEvent.description}</Text>
                                <Text>{concertEvent.artist}</Text>
                                <Text>{concertEvent.date.toString()}</Text>
                            </View>
                        )
                    })
                }

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