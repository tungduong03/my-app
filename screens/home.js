//import Paho from "paho-mqtt";

import { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    Button,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Task from "../components/Task";
import { DataContext, gates } from "../App";


export default function Home({ navigation }) {
    const {dataByTopic, updateDataByTopic} = useContext(DataContext);
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.header}>
                    {" "}
                    Hệ thống quan trắc giao thông tại các điểm{" "}
                </Text>
                <View style={styles.items}>
                    {gates.map((item) => {
                        return (
                            <Task
                                navigation={navigation}
                                data={item}
                                key={item.code}
                                message={dataByTopic ? dataByTopic[item.topic] : undefined}
                            />
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#c1e4f5",
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    congTranDaiNghia: {},
    congParabol: {},
    body: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 18,
    },
    header: {
        fontSize: 24,
        color: "#21a3d0",
        fontWeight: "bold",
        textAlign: 'center'
    },
    items: {
        marginTop: 25,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
        // justifyContent: "space-around",
    },
    item: {
        height: "100%",
    },
});
