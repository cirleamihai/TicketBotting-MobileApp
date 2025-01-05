import {Animated, Button, Pressable, StyleSheet, Text} from "react-native";
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
                    toValue: 100, // Adjust height for expanded content
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
        <Pressable key={props.concertEvent.id} onPress={handlePress} style={{ padding: 10 }}>
            <Text>{props.concertEvent.artist} | {props.concertEvent.eventName}</Text>
            {isExpanded && (
                <Animated.View style={{ height: slideAnim, opacity: opacityAnim }}>
                    <Text>{props.concertEvent.description}</Text>
                    <Text>{props.concertEvent.date}</Text>
                    <Button title={"Edit"} onPress={() => props.onEdit(props.concertEvent)} />
                </Animated.View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({

})