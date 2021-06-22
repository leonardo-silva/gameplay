import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/Home";
import { SignIn } from "../screens/SignIn";

const { Navigator, Screen } = createStackNavigator();

// It defines the screens available (routes) to navigate to
export function AuthRoutes() {
    return(
        <Navigator
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    // With this the navigator respects the <Background> style configuration
                    backgroundColor: 'transparent'
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
        </Navigator>
    )
}