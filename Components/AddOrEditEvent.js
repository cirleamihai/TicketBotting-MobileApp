import {TextInput, View} from "react-native";
import {useState} from "react";

export default function AddOrEditEvent(props) {
    const [event, setEvent] = useState(props.event);

    return (
        <View>
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
            <TextInput
                placeholder={"Date"}
                value={event.date}
                onChangeText={(text) => setEvent({...event, date: text})}
            />
        </View>
    )
}