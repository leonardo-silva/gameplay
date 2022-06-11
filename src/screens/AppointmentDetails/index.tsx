import React from "react";
import { ImageBackground, Text, FlatList, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";

import { Background } from "../../components/Background";
import { ListHeader } from "../../components/ListHeader";
import { Header } from "../../components/Header";
import { Member } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { theme } from "../../global/styles/theme";
import { strings } from "../../global/strings/strings";
import { styles } from "./styles";
import BannerPng from "../../assets/banner.png";

export function AppointmentDetails() {
    const members = [
        {
            id: '1',
            username: 'Leonardo',
            avatar_url: 'https://github.com/leonardo-silva.png',
            status: 'online'
        },    
        {
            id: '2',
            username: 'Leonardo',
            avatar_url: 'https://github.com/leonardo-silva.png',
            status: 'offline'
        }    
    ]

    return (
        <Background>
            <Header 
                title={strings.appointmentDetailsHeaderTitle}
                action={
                    <BorderlessButton>
                        <Fontisto 
                            name='share'
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />

            <ImageBackground 
                source={BannerPng}
                style={styles.banner}    
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        { strings.appointmentDetailsTitle }
                    </Text>

                    <Text style={styles.subtitle}>
                        { strings.appointmentDetailsSubTitle }
                    </Text>
                </View>
            </ImageBackground>

            <ListHeader
                title={strings.appointmentDetailsListTitle}
                subtitle={strings.appointmentDetailsListSubtitle}
            />    
            <FlatList
                data={members}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Member data={ item } />
                )}
                ItemSeparatorComponent={ () => <ListDivider isCentered /> }
                style={styles.members}
            />

            <View style={styles.footer}>
                <ButtonIcon title={ strings.appointmentDetailsButtonText } />
            </View>
        </Background>
    )
}