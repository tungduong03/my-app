//import Paho from "paho-mqtt";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    Button,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import { DataContext } from "../App";

const labels = [
    {
        code: "field1",
        name: "Temp",
        //icon: require("./../assets/field1.jpeg"),
        unit: "độ C"
    },
    {
        code: "field2",
        name: "MQ135",
        //icon: require("./../assets/field2.jpeg"),
        unit: "unit2"
    },
    {
        code: "field3",
        name: "TD0772",
        //icon: require("./../assets/field3.jpeg"),
        unit: "unit3"
    },
    {
        code: "field4",
        name: "Humi",
        //icon: require("./../assets/field4.jpeg"),
        unit: "unit4"
    },
];

export default function Info({ route, navigation }) {
    const { data, message } = route.params;
    const {dataByTopic} = useContext(DataContext);

    const [value, setValue] = useState({
        field1: parseFloat(dataByTopic[data.topic].field1),
        field2: dataByTopic[data.topic].field2,
        field3: dataByTopic[data.topic].field3,
        field4: dataByTopic[data.topic].field4,
    });
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    style={styles.backIcon}
                    name="arrow-back"
                    size={32}
                    color="#21a3d0"
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Text style={styles.titleText}>Thông số chi tiết</Text>
            </View>
            <Text style={styles.nameText}>{data.name}</Text>
            <View style={styles.iconWrapper}>
                <Image style={styles.icon} source={data.icon} />
            </View>
            <View>
                {labels.map((item, index) => {
                    return (
                        <View style={styles.item}>
                            <View style={styles.labelItem}>
                                <View style={styles.labelIconWrapper}>
                                    <Image
                                        style={styles.labelIcon}
                                        source={item.icon}
                                    />
                                </View>
                                <Text style={styles.labelText}>
                                    {item.name}
                                </Text>
                            </View>
                            <View style={styles.contentItem}>
                                <Text style={styles.contentText}>
                                    {value[item.code] === null ? "_" : value[item.code]}
                                </Text>
                                <Text style={styles.unitText}>
                                    {item.unit}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        padding: 20,
        backgroundColor: "#eff7f8",
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    header: {
        padding: 10,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    backIcon: {
        position: "absolute",
        left: 0,
    },
    titleText: {
        fontWeight: "600",
        fontSize: 18,
        color: "#21a3d0",
    },
    iconWrapper: {
        width: "100%",
        height: 180,
    },
    icon: {
        width: "100%",
        height: "100%",
        borderRadius: 24,
        overflow: "hidden",
    },
    nameText: {
        fontWeight: "700",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10,
    },
    item: {
        paddingVertical: 10,
    },
    labelItem: {
        flexDirection: "row",
        paddingBottom: 5,
    },
    labelIconWrapper: {
       width: 24,
        height: 24,
    },
    labelIcon: {
        width: "100%",
        height: "100%",
    },
    labelText: {
        fontSize: 15,
        fontWeight: "600",
        paddingHorizontal: 5,
    },
    contentItem: {
        paddingLeft: 40,
        flexDirection: "row"
    },
    contentText: {
        fontStyle: "bold",
        fontSize: 20,
        fontWeight: "300",
    },
    unitText: {
        fontSize: 16,
        fontWeight: "500",
        color: "green",
        paddingLeft: 5
    }
});