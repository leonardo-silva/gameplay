import React, { useEffect, useState } from "react";
import { 
    ImageBackground, 
    Text, 
    FlatList, 
    View, 
    Alert, 
    Platform, 
    Share 
} from "react-native";

import * as Linking from 'expo-linking';
import { BorderlessButton } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { Background } from "../../components/Background";
import { ListHeader } from "../../components/ListHeader";
import { Header } from "../../components/Header";
import { Member, MemberProps } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { theme } from "../../global/styles/theme";
import { strings } from "../../global/strings/strings";
import { styles } from "./styles";
import BannerPng from "../../assets/banner.png";
import { AppointmentProps } from "../../components/Appointment";
import { api } from "../../services/api";
import { Load } from "../../components/Load";

type Params = {
    selectedGuild: AppointmentProps
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
}

export function AppointmentDetails() {
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    const route = useRoute();
    const { selectedGuild } = route.params as Params;
    
    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${selectedGuild.guild.id}/widget.json`);
            setWidget(response.data);
        } catch (error) {
            Alert.alert('Verifique as configurações do servidor. Será que o Widget está habilitado?');
        } finally {
            setLoading(false);
        }
    }

    async function handleShareInvitation() {
        const message = Platform.OS === 'ios' 
        ? `Junte-se a ${selectedGuild.guild.name}`
        : widget.instant_invite;

        if (message) {
            try {
                const result = 
                    await Share.share({
                        message: message,
                        url: widget.instant_invite
                    });
                    if (result.action === Share.sharedAction) {
                        if (result.activityType) {
                          // shared with activity type of result.activityType
                        } else {
                          // shared
                        }
                    } else if (result.action === Share.dismissedAction) {
                      // dismissed
                    }
            } catch (error) {
                Alert.alert('Erro ao buscar configurações do convite no servidor!');
            }
        } else {
            Alert.alert('Canal de convite não configurado no servidor!');
        }
    }

    // const members = [
    //     {
    //         id: '1',
    //         username: 'Leonardo',
    //         avatar_url: 'https://github.com/leonardo-silva.png',
    //         status: 'online'
    //     },    
    //     {
    //         id: '2',
    //         username: 'Leonardo',
    //         avatar_url: 'https://github.com/leonardo-silva.png',
    //         status: 'offline'
    //     }    
    // ]

    function handleOpenGuild() {
        if(widget.instant_invite) {
            Linking.openURL(widget.instant_invite);
        } else {
            Alert.alert('Canal de convite não configurado no servidor! Operação cancelada!');
        }
    }

    useEffect(() => {
        fetchGuildWidget();
    }, []);

    return (
        <Background>
            <Header 
                title={strings.appointmentDetailsHeaderTitle}
                action={
                    selectedGuild.guild.owner &&
                    <BorderlessButton onPress={handleShareInvitation}>
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
                        { selectedGuild.guild.name }
                    </Text>

                    <Text style={styles.subtitle}>
                        { selectedGuild.description }
                    </Text>
                </View>
            </ImageBackground>

            {
                loading ? <Load /> :
                <>
                    <ListHeader
                        title={strings.appointmentDetailsListTitle}
                        subtitle={`Total ${widget.members.length}`}
                    />    
                    <FlatList
                        data={widget.members}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Member data={ item } />
                        )}
                        ItemSeparatorComponent={ () => <ListDivider isCentered /> }
                        style={styles.members}
                    />
                </>   
            }    

            {
                selectedGuild.guild.owner &&
                <View style={styles.footer}>
                    <ButtonIcon 
                        title={ strings.appointmentDetailsButtonText } 
                        onPress={handleOpenGuild}
                    />
                </View>
            }
        </Background>
    )
}