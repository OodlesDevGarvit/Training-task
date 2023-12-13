import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

const Userlist = ({ navigation }) => {
    const userinfo = useSelector(state => state.user);
    console.log('saved user info from redux', userinfo);
    // console.log('information',userinfo.data[0].deviceid);

    // const firstUserInfo = userinfo[0];

    // Extracting values
    // const deviceid = firstUserInfo["data"]["deviceid"];
    // const lat = firstUserInfo["data"]["lat"];
    // const long = firstUserInfo["data"]["long"];

    // Log the extracted values
    // console.log("Device ID:", deviceid);
    // console.log("Latitude:", lat);
    // console.log("Longitude:", long);
    return (

        // <View>
        //     {
        //         userinfo.map((item) => {
        //             return (<View>

        //                 <View>
        //                     <Text>{item.photo}</Text>
        //                 </View>

        //                 <View>
        //                     <Text>Device id:{item.deviceid}</Text>
        //                     <Text>lat:{item.lat}</Text>
        //                     <Text>long{item.long}</Text>
        //                 </View>


        //             </View>)
        //         })
        //     }

        // </View>

        <View style={{ padding: 10, flex: 1, color: 'black' }}>
            {userinfo.map((userData, index) => (
                <View key={index}>
                    <View>
                        <Text>{userData?.photo}</Text>
                    </View>

                    <View>
                        <Text> Device id: {userData.deviceid}</Text>
                        <Text> lat: {userData.lat}</Text>
                        <Text> long: {userData.long}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
}

export default Userlist;