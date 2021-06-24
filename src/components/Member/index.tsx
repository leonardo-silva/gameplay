import React from "react";
import { View, Text } from "react-native";
import { strings } from "../../global/strings/strings";
import { theme } from "../../global/styles/theme";

import { Avatar } from "../Avatar";
import { styles } from "./styles";

export type MemberProps = {
    id: string;
    username: string;
    avatar_url: string;
    status: string;
}

type Props = {
    data: MemberProps;
}

export function Member({ data }: Props) {
    const { on, primary } = theme.colors;

    const { 
        MemberStatusAvailable,
        MemberStatusBusy } = strings;

    const isOnline = data.status === 'online';

    return (
        <View style={styles.container}>
            <Avatar urlImage={data.avatar_url}   />
            
            <View>
                <Text style={styles.title}>
                    { data.username }
                </Text>

                <View style={styles.status}>
                    <View 
                        style={[
                            styles.bulletStatus,
                            {
                                backgroundColor: isOnline ? on : primary
                            }
                        ]}
                    />

                    <Text style={styles.nameStatus}>
                        { isOnline ? MemberStatusAvailable : MemberStatusBusy}
                    </Text>
                    
                </View>
            </View>
        </View>
    )
}