import React, { useState, useEffect, createContext } from "react";
import images from "./assets/images";
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
        name: "HUST",
        icon: {uri : 'https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-9/93867899_1646923142112369_7514781935667773440_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFwQJKpyJi88dexGOxzsKj8mHdNmc8rd8qYd02Zzyt3ygBZG97QHLG7Q9HXrgkzV6m6bA-XF1ezxnr2P3UBReAP&_nc_ohc=yPNx4F8c-h0Q7kNvgEydc-2&_nc_ht=scontent.fhan14-1.fna&oh=00_AYAFlrooGw9Tka6dmeXKxxdf3_kZDTU9SvmuUL7EmpBm-w&oe=66877192'},
        topic: 'message',
        number: 0
    },
    {
        code: "gate_2",
        name: "Home",
        icon: {uri : 'https://bcp.cdnchinhphu.vn/thumb_w/640/334894974524682240/2022/12/5/dhbkhn-6920-1658994052-1-16702134834751920701721.jpg'},
        topic: 'message',
        number: 1
    },
    /*{
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
      const fetchData = () => {
          console.log("Fetching data from API...");
          try {
              fetch("https://api.thingspeak.com/channels/2552930/feeds.json?results=1")
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
      };

      // Fetch data initially
      fetchData();

      // Set up interval to fetch data every 30 seconds
      const interval = setInterval(() => {
          fetchData();
      }, 15000);

      // Clean up interval on component unmount
      return () => {
          clearInterval(interval);
      };
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
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
    },
});