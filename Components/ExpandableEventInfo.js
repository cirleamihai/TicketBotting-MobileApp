import {Animated, Button, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useState, useRef} from "react";

export default function ExpandableEventInfo(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const slideAnim = useRef(new Animated.Value(0)).current; // Animation ref for height
    const opacityAnim = useRef(new Animated.Value(0)).current; // Animation ref for opacity

    const handlePress = () => {
        if (isExpanded) {
            // Animate slide up (collapse)
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false, // Native driver doesn't support height animations
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start(() => setIsExpanded(false)); // Collapse fully before hiding content
        } else {
            setIsExpanded(true); // Expand before starting animation
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 150, // Adjust height for expanded content
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start();
        }
    };

    return (
        <View style={styles.extendableContainer}>
            <Pressable key={props.concertEvent.id} onPress={handlePress}>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <Text style={styles.whiteContrastTextColor}>
                        {props.concertEvent.artist} | {props.concertEvent.eventName}
                    </Text>
                </View>
                {isExpanded && (
                    <Animated.View style={{height: slideAnim, opacity: opacityAnim}}>
                        <ExtendedEventInfo concertEvent={props.concertEvent}/>
                    </Animated.View>
                )}
            </Pressable>
        </View>
    );
}

function ExtendedEventInfo(props) {
    return (
        <View>
            <View style={styles.propertyContainer}>
                <Text style={styles.titleProps}>Description</Text>
                <Text style={styles.descriptionText}>{props.concertEvent.description}</Text>
            </View>
            <View style={[styles.propertyContainer]}>
                <Text style={styles.titleProps}>Date</Text>
                <Text style={styles.descriptionText}>{props.concertEvent.formatted_date()}</Text>
            </View>
            <View style={styles.button}>
                <Button title={"Edit"} onPress={() => props.onEdit(props.concertEvent)}/>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    extendableContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: '#8a09bc',
    },
    whiteContrastTextColor: {
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: "bold",
        color: '#ffffff',
    },
    propertyContainer: {
        alignSelf: "flex-start",
        marginTop: 10,
        marginLeft: 5,
    },
    titleProps: {
        fontWeight: "bold",
        color: '#eceaea',
        borderBottomWidth: 0.5,
        borderBottomColor: '#eceaea',
        alignSelf: 'flex-start'
    },
    descriptionText: {
        marginTop: 5,
        marginLeft: 5,
        color: '#ffffff',
        flexWrap: "wrap",
        alignSelf: 'flex-start',
    },
    button: {
        marginTop: 10,
        alignItems: 'stretch',
        justifyContent: 'center',
        width: "40%"
    }
})