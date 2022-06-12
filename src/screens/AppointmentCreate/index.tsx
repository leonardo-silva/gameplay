import React, { useState } from "react";
import { 
    Text, 
    View, 
    Platform,
    ScrollView, 
    KeyboardAvoidingView, // To avoid keyboard in front of component when user is typing
    Alert
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ModalView } from "../../components/ModalView";
import { Header } from "../../components/Header";
import { CategorySelect } from "../../components/CategorySelect";
import { SmallInput } from "../../components/SmallInput";
import { TextArea } from "../../components/TextArea";
import { GuildIcon } from "../../components/GuildIcon";
import { Background } from "../../components/Background";
import { Button } from "../../components/Button";
import { GuildProps } from "../../components/Guild";

import { strings } from "../../global/strings/strings";
import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import { Guilds } from "../Guilds";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";

export function AppointmentCreate() {
    const [category, setCategory] = useState('');
    const [openGuildsModal, setOpenGuildsModal] = useState(false);
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');

    const navigation = useNavigation();

    function handleOpenGuilds() {
        setOpenGuildsModal(true);
    }

    function handleCloseGuilds() {
        setOpenGuildsModal(false);
    }

    function handleGuildSelected(guildSelected: GuildProps) {
        setGuild(guildSelected);
        setOpenGuildsModal(false);
    }

    function handleCategorySelect(categoryId: string) {
        setCategory(categoryId);
        // The commented code below allow select/deselect the category
        //categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    async function handleSave() {
        if (category) {
            const newAppointment = {
                id: uuid.v4(),
                guild,
                category,
                date: `${day}/${month} às ${hour}:${minute}h`,
                description
            }
    
            const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
            const appointments = storage ? JSON.parse(storage) : [];
    
            await AsyncStorage.setItem(
                COLLECTION_APPOINTMENTS, 
                JSON.stringify([...appointments, newAppointment])
            );
    
            navigation.navigate('Home');
        } else {
            Alert.alert('Faltou selecionar a categoria!');
        }
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Background>
                <ScrollView>
                    <Header 
                        title={strings.appointmentCreateHeaderTitle}
                    />

                    <Text style={[
                        styles.label, 
                        { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}
                    >
                        { strings.appointmentCreateListTitle }
                    </Text>

                    <CategorySelect 
                        categorySelected={category}
                        setCategory={handleCategorySelect}
                        hasCheckBox
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>
                                {
                                    guild.icon 
                                    ? <GuildIcon guildId={guild.id} iconId={guild.icon}/> 
                                    : <View style={styles.image}/>
                                }

                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {guild.name ? guild.name : strings.appointmentCreateSelectBodyText }
                                    </Text>
                                </View> 

                                <Feather 
                                    name='chevron-right'
                                    color={theme.colors.heading}
                                    size={18}
                                />

                            </View>
                        </RectButton>

                        <View style={styles.field}>
                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    { strings.appointmentCreateFieldDate }
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setDay}
                                    />
                                    <Text style={styles.divider}>
                                        /
                                    </Text> 
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setMonth}
                                    />
                                </View>
                            </View>    

                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    { strings.appointmentCreateFieldTime }
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setHour}
                                    />
                                    <Text style={styles.divider}>
                                        :
                                    </Text> 
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setMinute}
                                    />
                                </View>
                            </View>    
                        </View>        

                        <View style={[styles.field, { marginBottom: 12}]}>
                            <Text style={styles.label}>
                                { strings.appointmentCreateLabelDescription}
                            </Text>

                            <Text style={styles.caracterLimit}>
                                { strings.appointmentCreateLabelMaxLength}
                            </Text>
                        </View>        
                        <TextArea
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false} // Do not try to run spelling check
                            onChangeText={setDescription}
                        />

                        <View style={styles.footer}>
                            <Button 
                                title={strings.appointmentCreateButtonText}
                                onPress={handleSave}
                            />
                        </View>        
                    </View>

                </ScrollView>
            </Background>

            <ModalView 
                visible={openGuildsModal}
                closeModal={handleCloseGuilds}
            >
                <Guilds handleGuildSelected={handleGuildSelected}/>
            </ModalView>
        </KeyboardAvoidingView>
    )
}