import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";

type Props = {
    title: string;
    action?: ReactNode;  
}

export function Header({title, action}: Props) {
    const {secondary100, secondary40, heading} = theme.colors;

    const navigation = useNavigation();

    function hendleGoBack() {
        navigation.goBack();
    }

    return (
        <LinearGradient
            style={styles.container}
            colors={[secondary100, secondary40]}
        >
            <BorderlessButton onPress={hendleGoBack}>
                <Feather 
                    name='arrow-left'
                    size={24}
                    color={heading}
                />
            </BorderlessButton>

            <Text style={styles.title}>
                { title }
            </Text>

            {/* If there is an action, show it, otherwise, just put some space in its place */}
            { 
                action ? 
                <View> 
                    { action } 
                </View>
                : 
                <View style={ { width: 24 } }/>
            }

        </LinearGradient>
    )    
}
