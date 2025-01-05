import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View, Modal} from 'react-native';
import React, {useState} from 'react';

export default function App() {
    const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);

    const handleAddEvent = () => {
        setIsAddButtonClicked(true);
    }

    const handleCancelAddEvent = () => {
        setIsAddButtonClicked(false);
    }

    return (
        <View style={styles.appLayover}>
            <Modal visible={isAddButtonClicked} animationType="slide">

            </Modal>
            <View style={styles.addButton}>
                <Button title={"Add Event"} onPress={handleAddEvent}/>
            </View>
            <View style={styles.eventsList}>
                {/* List of events */}

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