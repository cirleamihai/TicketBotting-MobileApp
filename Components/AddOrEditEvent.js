import {Button, TextInput, Text, View, StyleSheet, Pressable} from "react-native";
import {useState} from "react";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";

export default function AddOrEditEvent(props) {
    const [event, setEvent] = useState(props.event);
    const [openDatePicker, setOpenDatePicker] = useState(false);
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
                if (selectedDate) {
                    setDate(selectedDate);
                    setEvent({...event, date: selectedDate});
                }
            },
        });
    };

    return (
        <View style={styles.appLayover}>
            <TextInput
                placeholder={"Event Name"}
                value={event.eventName}
                onChangeText={(text) => setEvent({...event, eventName: text})}
            />
            <TextInput
                placeholder={"Description"}
                value={event.description}
                onChangeText={(text) => setEvent({...event, description: text})}
            />
            <TextInput
                placeholder={"Artist"}
                value={event.artist}
                onChangeText={(text) => setEvent({...event, artist: text})}
            />
            <View>
                <Pressable onPress={openDatePickerSelector}>
                    <TextInput
                        placeholder={"Select a date"}
                        value={date ? date.toDateString(): ''}
                        editable={false}
                    />
                </Pressable>
            </View>
            <View>
                <Button title={"Save Event"} onPress={handleSave}/>
                <Button title={"Cancel"} onPress={props.onClose}/>
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

})