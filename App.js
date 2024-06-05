import React, { useState, useEffect, createContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    Button,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/home";
import Info from "./screens/info";

const Stack = createNativeStackNavigator();

export const DataContext = createContext(null);

export const gates = [
    {
        code: "gate_1",
        name: "Cổng Parabol Giải Phóng",
        icon: require(`./assets/gate_1.jpeg`),
        topic: 'message'
    },
    /*{
        code: "gate_2",
        name: "Cổng Đại Cồ Việt",
        icon: require(`./assets/gate_2.jpeg`),
        topic: 'gate_2'
    },
    {
        code: "gate_3",
        name: "Cổng Trần Đại Nghĩa",
        icon: require(`./assets/gate_3.jpeg`),
        topic: 'hoanpx'
    },
    {
        code: "gate_4",
        name: "Cổng dẫn vào khu Kí túc xá",
        icon: require(`./assets/gate_4.jpeg`),
        topic: 'gate_4'
    },*/
];

export default function App() {
    const [dataByTopic, setDataByTopic] = useState({});

    useEffect(() => {
        console.log("Fetching data from API...");
        try {
            fetch("https://api.thingspeak.com/channels/2552930/feeds.json?results=2")
                .then(response => response.json())
                .then(data => {
                    console.log("Received data from API:", data);
                    // Process the received data and update state
                    const { feeds } = data;
                    if (feeds && feeds.length > 0) {
                        const latestFeed = feeds[0];
                        setDataByTopic({ message: latestFeed });
                        console.log("LatestFeed:", latestFeed);
                    }
                })
                .catch(error => {
                    console.error("Error fetching data from API:", error);
                });
        } catch (e) {
            console.error("Error in API request:", e);
        }
    }, []);

    return (
        <DataContext.Provider value={{ dataByTopic }}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="home" component={Home} />
                    <Stack.Screen name="info" component={Info} />
                </Stack.Navigator>
            </NavigationContainer>
        </DataContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});