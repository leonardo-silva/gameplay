import React, { useCallback, useState } from "react";
import { View, FlatList  } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { ListDivider } from "../../components/ListDivider";
import { Profile } from "../../components/Profile";
import { Background } from "../../components/Background";

import { styles } from "./styles";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { Load } from "../../components/Load";

export function Home() {
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

    const navigation = useNavigation();

    // const appointments = [
    //     {
    //         id: '1',
    //         guild: {
    //             id: '1',
    //             name: 'Lendários',
    //             icon: null,
    //             owner: true
    //         },
    //         category: '1',
    //         date: '22/06 às 20:40h',
    //         description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'   
    //     },
    //     {
    //         id: '2',
    //         guild: {
    //             id: '1',
    //             name: 'Lendários',
    //             icon: null,
    //             owner: true
    //         },
    //         category: '1',
    //         date: '22/06 às 20:40h',
    //         description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'   
    //     }
    // ];

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(selectedGuild: AppointmentProps) {
        navigation.navigate('AppointmentDetails', { selectedGuild });
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if(category) {
            setAppointments(storage.filter(item => item.category === category));
        } else {
            setAppointments(storage);
        }

        // await AsyncStorage.removeItem(COLLECTION_APPOINTMENTS);

        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments();
    },[category]));

    return (
        <Background>
            <View style={styles.header} >
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate}/>
            </View>

            <CategorySelect 
                categorySelected={category}
                setCategory={handleCategorySelect}
            />


            {
                loading ? <Load /> :
                <>
                    <ListHeader 
                        title="Partidas agendadas:"
                        subtitle={`Total ${appointments.length}`}
                    />

                    <FlatList
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                                <Appointment 
                                    data={item}
                                    onPress={() => handleAppointmentDetails(item)}
                                />
                            )
                        }
                        // this property ( contentContainerStyle={{ paddingBottom: 69 }} ) makes sure there is a 
                        // space between the last item and the bottom of the cell phone. 
                        contentContainerStyle={{ paddingBottom: 69 }}
                        ItemSeparatorComponent={() => <ListDivider />}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                    />       
                </>  
            }
        </Background>
    );
}