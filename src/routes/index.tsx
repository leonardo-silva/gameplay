import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { SignIn } from "../screens/SignIn";
import { useAuth } from "../hooks/auth";

export function Routes() {
    const { user } = useAuth();

    return(
        <NavigationContainer>
            { user.id ? <AppRoutes /> : <SignIn /> }
        </NavigationContainer>
    )
}