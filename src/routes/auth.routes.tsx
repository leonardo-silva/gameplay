import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/Home";
import { SignIn } from "../screens/SignIn";
import { AppointmentDetails } from "../screens/AppointmentDetails";

import { theme } from "../global/styles/theme";

const { Navigator, Screen } = createStackNavigator();

// It defines the screens available (routes) to navigate to
export function AuthRoutes() {
    return(
        <Navigator
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    // With this the navigator respects the <Background> style configuration
                    //backgroundColor: 'transparent'
                    // The backgroundColor: 'transparent' was replaced because of an undesired
                    // effect on iPhone devices during screen transitions. In order to the background 
                    // color work, the screens must be embedded in a <Background> component. 
                    backgroundColor: theme.colors.secondary100
                }
            }}
        >
            <Screen
                name="SignIn"
                component={ SignIn }
            />    
            <Screen
                name="Home"
                component={ Home }
            />    
            <Screen
                name="AppointmentDetails"
                component={ AppointmentDetails }
            />    
        </Navigator>
    )
}