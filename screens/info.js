import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useContext } from "react";
import num_fake from "../num_fake";
import {
    StyleSheet,
    Text,
    Button,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    Modal,
    TouchableHighlight,
} from "react-native";
import { DataContext } from "../App";
import { WebView } from 'react-native-webview';

const labels = [
    {
        code: "field1",
        name: "Temperature",
        unit: "°C"
    },
    {
        code: "field2",
        name: "CO",
        unit: "PPM"
    },
    {
        code: "field3",
        name: "PM2.5",
        unit: "µg/l"
    },
    {
        code: "field4",
        name: "Humidity",
        unit: "%"
    },
];

export default function Info({ route, navigation }) {
    const { data, message } = route.params;
    const { dataByTopic } = useContext(DataContext);

    const initialValue = data.number === 1 ? {
        field1: num_fake.field1,
        field2: num_fake.field2,
        field3: num_fake.field3,
        field4: num_fake.field4,
    } : {
        field1: parseFloat(dataByTopic[data.topic].field1),
        field2: dataByTopic[data.topic].field2,
        field3: dataByTopic[data.topic].field3,
        field4: dataByTopic[data.topic].field4,
    };

    const [value, setValue] = useState(initialValue);
    const [showCharts, setShowCharts] = useState(false); // State to toggle chart visibility
    const [modalVisible, setModalVisible] = useState(false); // State to toggle modal visibility
    const [modalUrl, setModalUrl] = useState(''); // State to hold the URL for the zoomed WebView

    const openModal = (url) => {
        setModalUrl(url);
        setModalVisible(true);
    };

    const injectedJavaScript = `
        document.body.style.transform = 'scale(1.5)';
        document.body.style.transformOrigin = '0 0';
        true;
    `;

    return (
        <ScrollView style={styles.container}>
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
                <Text style={styles.titleText}>Detail information</Text>
            </View>
            <Text style={styles.nameText}>{data.name}</Text>
            <View style={styles.iconWrapper}>
                <Image style={styles.icon} source={data.icon} />
            </View>
            <View>
                {labels.map((item, index) => {
                    return (
                        <View style={styles.item} key={index}>
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
            <Button
                title="Biểu đồ"
                onPress={() => setShowCharts(!showCharts)} // Toggle chart visibility
            />
            {showCharts && (
                <View style={styles.webviewContainer}>
                    <View style={styles.row}>
                        <WebView
                            style={styles.webview}
                            source={{ uri: "https://thingspeak.com/channels/2552930/charts/1?bgcolor=ffffff&color=%23d62020&dynamic=true&results=100&type=line" }}
                            injectedJavaScript={injectedJavaScript}
                        />
                        <TouchableHighlight style={styles.zoom} onPress={() => openModal("https://thingspeak.com/channels/2552930/charts/1?bgcolor=ffffff&color=%23d62020&dynamic=true&results=100&type=line")}>
                            <Text>↖</Text>
                        </TouchableHighlight>
                        <WebView
                            style={styles.webview}
                            source={{ uri: "https://thingspeak.com/channels/2552930/charts/2?bgcolor=ffffff&color=%23d62020&dynamic=true&results=6000&type=line" }}
                            injectedJavaScript={injectedJavaScript}
                        />
                        <TouchableHighlight style={styles.zoom} onPress={() => openModal("https://thingspeak.com/channels/2552930/charts/2?bgcolor=ffffff&color=%23d62020&dynamic=true&results=6000&type=line")}>
                            <Text>↖</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.row}>
                        <WebView
                            style={styles.webview}
                            source={{ uri: "https://thingspeak.com/channels/2552930/charts/3?bgcolor=ffffff&color=%23d62020&dynamic=true&results=100&type=line" }}
                            injectedJavaScript={injectedJavaScript}
                        />
                        <TouchableHighlight style={styles.zoom} onPress={() => openModal("https://thingspeak.com/channels/2552930/charts/3?bgcolor=ffffff&color=%23d62020&dynamic=true&results=100&type=line")}>
                            <Text>↖</Text>
                        </TouchableHighlight>
                        <WebView
                            style={styles.webview}
                            source={{ uri: "https://thingspeak.com/channels/2552930/charts/4?bgcolor=ffffff&color=%23d62020&dynamic=true&results=100&type=line" }}
                            injectedJavaScript={injectedJavaScript}
                        />
                        <TouchableHighlight style={styles.zoom} onPress={() => openModal("https://thingspeak.com/channels/2552930/charts/4?bgcolor=ffffff&color=%23d62020&dynamic=true&results=100&type=line")}>
                            <Text>↖</Text>
                        </TouchableHighlight>
                    </View>
                    <Text style={styles.header}>
                        {" "}
                        {" "}
                        {" "}
                        {" "}
                        {" "}
                        {" "}
                    </Text>
                    <Text style={styles.header}>
                        {" "}
                        {" "}
                        {" "}
                        {" "}
                        {" "}
                        {" "}
                    </Text>
                </View>
            )}
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={styles.header}>
                        {" "}
                        {" "}
                    </Text>
                    <WebView
                        style={{ flex: 1, width: '220%', maxWidth: 'auto',}}
                        source={{ uri: modalUrl }}
                        injectedJavaScript={injectedJavaScript}
                    />
                    <TouchableHighlight
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={styles.closeButton}>Close</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        padding: 20,
        backgroundColor: "#c1e4f5",
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
    },
    webviewContainer: {
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 10,
        justifyContent: 'center',
    },
    webview: {
        width: '90%',
        height: 70,
    },
    closeButton: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        padding: 10,
    },
    zoom: {
        //backgroundColor: '',
        width: 20,
        textAlign: 'center',
        height: 20,
        marginRight: 10,
        marginLeft: -10,
    }
});
