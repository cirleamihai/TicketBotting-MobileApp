import {Alert, Animated, Button, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useState, useRef} from "react";

export default function ExpandableEventInfo(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const slideAnim = useRef(new Animated.Value(0)).current; // Animation ref for height
    const opacityAnim = useRef(new Animated.Value(0)).current; // Animation ref for opacity
    const [contentHeight, setContentHeight] = useState(0); // State to store content height

    const handlePress = () => {
        if (!isExpanded) {
            // Expand
            setIsExpanded(true); // set expanded FIRST so the child is rendered
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: contentHeight,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                })
            ]).start();
        } else {
            // Collapse
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                })
            ]).start(() => {
                // After collapsing, hide the child
                setIsExpanded(false);
            });
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this event?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => props.onDelete(props.concertEvent),
                },
            ],
            {cancelable: true}
        );
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
                    <Animated.View style={{opacity: opacityAnim, height: isExpanded ? 'auto' : 0, overflow: "hidden"}}>
                        <ExtendedEventInfo
                            {...props}
                            handleDelete={handleDelete}
                            setContentHeight={setContentHeight}
                        />
                    </Animated.View>
                )}
            </Pressable>


            <MeasuringContainer onMeasured={(h) => setContentHeight(h)}>
                <ExtendedEventInfo
                    {...props}
                    handleDelete={handleDelete}
                />
            </MeasuringContainer>
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
            <View style={styles.buttonsView}>
                <View style={styles.button}>
                    <Button title={"Edit Event"} onPress={() => props.onEdit(props.concertEvent)}/>
                </View>
                <View style={styles.button}>
                    <Button title={"Delete Event"} onPress={() => props.handleDelete(props.concertEvent)}></Button>
                </View>
            </View>
        </View>
    )
}

function MeasuringContainer({children, onMeasured}) {
    return (
        <View
            style={styles.hiddenContainer}
            // The onLayout callback is triggered once this component (and its children)
            // have been laid out by React Native
            onLayout={(e) => {
                const height = e.nativeEvent.layout.height;
                onMeasured(height);
            }}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    extendableContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: '#8a09bc',
        width: 300,
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
    },
    buttonsView: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginHorizontal: 25,
    },
    hiddenContainer: {
        position: 'absolute',
        top: -9999,
        left: -9999,
    }
})