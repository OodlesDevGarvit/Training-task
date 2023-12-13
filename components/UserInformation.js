import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    PermissionsAndroid,
    Modal,
    TextInput,
    Dimensions
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Deviceinfo from "react-native-device-info";
import Geolocation from 'react-native-geolocation-service';
import { saveUserInformation1 } from "../Redux/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Userlist from "./Userlist";
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen";

const UserInformation = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch()

    const [cameraphoto, setCameraphoto] = useState();
    const [galleryphoto, setGalleryphoto] = useState();
    const [showmodal, setShowmodal] = useState(false);
    const [deviceid, setDeviceId] = useState("");
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const { width, height } = Dimensions.get('window');

    // const userInformation = useSelector(state => state.user);
    // console.log("saved user info redux : ", userInformation)

    const options = {
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
    };

    //launchcamera() to take photo or video
    const openCamera = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                const result = await launchCamera(options);
                console.log(result);
                setCameraphoto(result.assets[0].uri);
            }
        } catch (error) {
            console.log('Error in opening a Camera', error);
        }

    };

    //launchimagegallery() to pick image or video    
    const openGallery = async () => {
        try {
            const result = await launchImageLibrary(options);
            console.log(result);
            setGalleryphoto(result.assets[0].uri);
            console.log('value of img', result.assets[0].uri);
        } catch (error) {
            console.log('Error in open Gallery');
        }

    }
    //After click on image modal will open  
    const openModal = () => {
        setShowmodal(true);
    }

    const getdeviceid = () => {
        let id = Deviceinfo.getDeviceId();
        setDeviceId(id);
    }
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app requires access to your location.',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted');
                geoLocation();
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };
    const geoLocation = () => {

        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log('latitude', latitude);
                console.log('longitude', longitude);
                setLocation({ latitude, longitude });
            },
            (error) => {
                console.log('Error getting Location', error.code, error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
            }
        );
    }

    const saveUserInformation = async () => {
        const formData = new FormData();

        //Append from fields
        formData.append('deviceid', deviceid);
        formData.append('lat', location.latitude !== null ? location.latitude.toString() : '');
        formData.append('long', location.longitude !== null ? location.longitude.toString() : '');


        //Append the photo with appropriate absolute path
        const photoPath = cameraphoto || galleryphoto;
        const photoUri = Platform.OS === 'android' ? 'file://' + photoPath : photoPath;
        if (photoPath) {
            formData.append('photo', {
                uri: photoUri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });
        }

        // const photoPath = cameraphoto || galleryphoto;
        // if(photoPath) {
        //     formData.append('photo',{
        //         uri : photoPath,
        //         type: 'image/jpeg',
        //         name: 'photo.jpg'
        //     })
        // }


        try {

            // Make an post Api request
            const url = "https://httpbin.org/post";

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
            const responseData = await response.json();
            console.log('Response Data:', responseData);
            // console.warn('Response Data:', responseData);

            dispatch(saveUserInformation1({
                deviceid: deviceid,
                lat: location.latitude,
                long: location.longitude,
                photo: photoUri,
            }));
        } catch (error) {
            console.log('Error saving user information', error);
        }
    };


    return (

        <View style={styles.container}>


            <View style={styles.imgView}>

                <TouchableOpacity onPress={openModal} >
                    <Image
                        source={require('../assets/cloudimg.jpeg')}
                        style={styles.circularImage}
                    />
                </TouchableOpacity>
            </View>



            <Modal
                animationType='slide'
                visible={showmodal}
                transparent={false}

            >
                <View style={styles.centeredView} >

                    <View style={styles.modalView}>

                        <TouchableOpacity style={styles.button} onPress={async () => {
                            await openCamera();
                            getdeviceid();
                            await requestLocationPermission();
                            geoLocation();
                        }} >
                            <Text>Open Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={async () => {
                            await openGallery();
                            getdeviceid();
                            await requestLocationPermission();
                            geoLocation();
                        }}>
                            <Text>Open Gallery</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => setShowmodal(false)}>
                            <Text>close</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </Modal>

            {/* this view is for responsive ui */}
            {/* <View style={styles.main}>

                <View style={styles.deviceView}>

                    <Text style={styles.inputTextStyle}>Device ID :</Text>

                    <TextInput
                        style={styles.inputStyle}
                        value={deviceid}
                    />

                </View>

                <View style={styles.latView}>

                    <Text style={styles.inputStyle}>Lat:</Text>

                    <TextInput
                        style={styles.latStyle}
                        value={location.latitude !== null ? location.latitude.toString() : ''}
                        editable={false}
                    />

                </View>

            </View> */}

            {/* <View style={styles.footer}></View> */}

            <View style={styles.deviceView}>

                <Text style={{ fontSize: 30 }}>Device ID :</Text>

                <TextInput
                    style={styles.inputStyle}
                    value={deviceid}
                />

            </View> 

            <View style={styles.latView}>

                <Text style={{ fontSize: 30 }}>Lat:</Text>

                <TextInput
                    style={styles.latStyle}
                    value={location.latitude !== null ? location.latitude.toString() : ''}
                    editable={false}
                />

            </View>


             <View style={styles.longView}>

                <Text style={{ fontSize: 30 }}>Long:</Text>

                <TextInput
                    style={styles.longStyle}
                    value={location.longitude != null ? location.longitude.toString() : ''}
                    editable={false}
                />

            </View>

{/*  */}

            <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                    saveUserInformation();
                    navigation.navigate('userlist');
                }}
            >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
         flex: 1,
        // height: heightPercentageToDP('100%'),
        // justifyContent: 'center',
        // alignItems: 'center',
        //gap:3
    },
    imgView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        marginTop: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: '#fff',
        height: 200,
        width: 200,
        borderWidth: 1,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#bbb',
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    deviceView: {
        flexDirection: 'row',
        width: '95%',
        marginTop: 20,
        justifyContent: 'space-evenly',
    },
    inputStyle: {
        width: 200,
        borderWidth: 2,
        borderColor: 'darkblue',
        textAlign: 'center',
        padding: 5,
        fontSize: 20,
    },
    longView: {
        flexDirection: 'row',
        width: '95%',
        marginTop: 20,
        justifyContent: 'space-evenly',
    },
    longStyle: {
        width: 200,
        borderWidth: 2,
        borderColor: 'darkblue',
        textAlign: 'center',
        padding: 5,
        fontSize: 20,
    },
    latView: {
        flexDirection: 'row',
        width: '95%',
        marginTop: 20,
        justifyContent: 'space-evenly',
    },
    latStyle: {
        width: 200,
        borderWidth: 2,
        borderColor: 'darkblue',
        textAlign: 'center',
        padding: 5,
        fontSize: 20,
    },
    saveButton: {
        width: 200,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 40,
        padding: 10,
        marginHorizontal: 80,
    }
    , buttonText: {
        fontSize: 20,
        textAlign: 'center',
    },


    //new responsive styling
    // main: {
    //     height: heightPercentageToDP('60%'),
    //     backgroundColor: 'orange',


    // },
    // footer: {
    //     height: heightPercentageToDP('30%'),
    //     backgroundColor: 'tomato',
    // },
    // deviceView: {
    //     flexDirection: 'row',
    //     //     marginTop: 20,
    //     //     justifyContent: 'space-evenly',
    // },
    // inputTextStyle: {
    //     fontSize: heightPercentageToDP('2%'),
    // },
    // inputStyle: {
    //     width: widthPercentageToDP('5%'),
    //     borderWidth: 2,
    //     borderColor: 'darkblue',
    //     textAlign: 'center',

    // },
    // latView: {
    //     flexDirection: 'row',
    //     //  
    //     //     marginTop: 20,
    //     //     justifyContent: 'space-evenly',
    // },
    // latStyle: {
    //     width: widthPercentageToDP('5%'),
    //     borderWidth: 2,
    //     borderColor: 'darkblue',
    //     textAlign: 'center',
    //     //     padding: 5,
    //     //     fontSize: 20,
    // },




    // imageStyle: {
    //     height: '50%',
    //     width: '50%',
    //     borderRadius: 5,
    //     alignSelf: 'center',
    // },
    // btnContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
    // btnWrapper: {
    //     backgroundColor: "#FFD700",
    //     width: '45%',
    //     padding: 2,

    // },
    // btnStyle: {
    //     fontSize: 18,
    // },

})

export default UserInformation;