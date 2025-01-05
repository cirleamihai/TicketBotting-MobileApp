import {Button, TextInput, Text, View, StyleSheet, Pressable} from "react-native";
import {useState} from "react";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";

export default function AddOrEditEvent(props) {
    let isEmptyEvent = props.event.is_empty();
    const [event, setEvent] = useState(props.event);
    const [date, setDate] = useState(event.date);

    const handleSave = () => {
        {/* Save the event in the repo*/
        }
        props.onClose();
    }

    const openDatePickerSelector = () => {
        DateTimePickerAndroid.open({
            value: new Date(),
            mode: 'date',
            display: 'default',
            onChange: (event, selectedDate) => {
                if (event.type === "set" && selectedDate) {
                    setDate(selectedDate);
                    setEvent({...event, date: selectedDate});
                }
            },
        });
    };

    return (
        <View style={styles.appLayover}>
            <View style={styles.batchOf2Inputs}>
                <TextInput
                    placeholder={"Event Name"}
                    value={event.eventName}
                    onChangeText={(text) => setEvent({...event, eventName: text})}
                    style={styles.input}
                />
                <TextInput
                    placeholder={"Description"}
                    value={event.description}
                    onChangeText={(text) => setEvent({...event, description: text})}
                    style={styles.input}
                />
            </View>
            <View style={[styles.batchOf2Inputs]}>
                <View style={styles.input}>
                    <TextInput
                        placeholder={"Artist"}
                        value={event.artist}
                        onChangeText={(text) => setEvent({...event, artist: text})}
                    />
                </View>
                <View style={styles.input}>
                    <Pressable onPress={openDatePickerSelector}>
                        <TextInput
                            placeholder={"Select a date"}
                            value={date ? date.toDateString() : ''}
                            editable={false}
                        />
                    </Pressable>
                </View>
            </View>

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button title={"Save Event"} onPress={handleSave}/>
                </View>
                <View style={styles.button}>
                    <Button title={"Cancel"} onPress={props.onClose}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    appLayover: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    batchOf2Inputs: {

        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        padding: 10,
    },
    input: {
        flex: 1,
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom: 10,
        borderWidth: 0.5,
        borderColor: "#cccccc",
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',  // Adds equal space between buttons

    },
    button: {
        marginHorizontal: 20,
        width: '35%',
    }

})