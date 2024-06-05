import {
    View,
    Text,
    TouchableOpacity,
    Button,
    Dimensions,
    Image,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";

import { StyleSheet } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const LEVEL_LOW = 'low';
const LEVEL_MEDIUM = 'medium';
const LEVEL_HIGH = 'high';

const styleByLevel = {
    [LEVEL_LOW]: {
        color: '#fff',
        backgroundColor: 'green',
        text: 'Safe'
    },
    [LEVEL_MEDIUM]: {
        color: 'grey',
        backgroundColor: 'yellow',
        text: 'Be Careful'
    },
    [LEVEL_HIGH]: {
        color: '#fff',
        backgroundColor: 'red',
        text: 'Dangerous'
    }
}

const Task = ({ data, navigation, message }) => {
    const [value, setValue] = useState({
        field1: null,
        field2: null,
        field3: null,
        field4: null,
    });
    
    useEffect(() => {
        if (message && data.number != 1) {
            try {
                console.log("message",message);
                const field1 = message.field1;
                const field2 = message.field2;
                const field3 = message.field3;
                const field4 = message.field4;

                setValue({
                    field1: parseFloat(field1),
                    field2: parseFloat(field2),
                    field3: parseFloat(field3),
                    field4: parseFloat(field4),
                });
            } catch (e) {
                console.error("Error parsing message:", e);
            }
        }
    }, [message])

    const {
        field1,
        field2,
        field3,
        field4
    } = value;

    let level = null;
    if (field2 <= 1000 && field1 <= 35 && field3 < 12) 
        level = LEVEL_LOW;
    if ( (field2 > 1000 && field2 < 5000) || (field3 > 13 && field3 < 36) || (field1 > 35 && field1 <= 41) )  
        level = LEVEL_MEDIUM;
    if ( field2 >= 5000 || field3 > 36 || field1 > 41) 
        level = LEVEL_HIGH;

    if (level) {
        level = styleByLevel[level]
    }

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("info", {
                    data,
                    message
                });
            }}
        >
            <View style={styles.item}>
                {level ? <View style={{ ...styles.square, ...({ backgroundColor: level.backgroundColor }) }}>
                    <Text numberOfLines={1} style={{ ...styles.number, ...({ color: level.color }) }}>{level.text}</Text>
                </View> : <View style={styles.square}></View>}
                <Text style={styles.content}>{data.name}</Text>
                <View style={styles.iconWrapper}>
                    <Image style={styles.icon} source={data.icon} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Task;
const styles = StyleSheet.create({
    item: {
        backgroundColor: "#eff7f8",
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "space-between",
        width: width / 2 - 40,
    },
    square: {
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    number: {
        fontSize: 16,
        fontWeight: "700",
    },
    content: {
        width: "80%",
        fontSize: 16,
        height: 80,
        textAlign: "center",
        fontWeight: "600",
    },
    iconWrapper: {
        width: "100%",
        height: 120,
    },
    icon: {
        width: "100%",
        height: "100%",
    },
});