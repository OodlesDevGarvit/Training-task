import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserInformation from "../components/UserInformation";
import Userlist from "../components/Userlist";


const Stack = createNativeStackNavigator();

const ScreenNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                    
                    headerStyle: {
                        backgroundColor: 'blue',
                    },
                    headerTintColor: 'white',
                }} >
                <Stack.Screen name="userinformation" component={UserInformation}  />
                <Stack.Screen name="userlist" component={Userlist}  />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default ScreenNavigation;