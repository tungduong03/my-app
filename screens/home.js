import { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Grid, Col, Row } from 'react-native-easy-grid';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Task from "../components/Task";
import { DataContext, gates } from "../App";
import { WebView } from 'react-native-webview';

export default function Home({ navigation }) {
    const { dataByTopic, updateDataByTopic } = useContext(DataContext);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.header}>
                    {" "}
                    The air quality monitoring system{" "}
                </Text>
                <View style={styles.items}>
                    {gates.map((item) => (
                        <Task
                            navigation={navigation}
                            data={item}
                            key={item.key}
                            message={dataByTopic ? dataByTopic[item.topic] : undefined}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#c1e4f5",
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingTop: 80,
        paddingHorizontal: 18,
    },
    header: {
        fontSize: 24,
        color: "#21a3d0",
        fontWeight: "bold",
        textAlign: 'center'
    },
    items: {
        marginTop: 50,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
    },
});