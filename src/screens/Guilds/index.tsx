import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";

import { Guild, GuildProps } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";
import { Load } from "../../components/Load";
import { api } from "../../services/api";

import { styles } from "./styles";

type Props = {
    handleGuildSelected: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelected }: Props) {
    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true);
    // const guilds = [
    //     {
    //         id: '1',
    //         name: 'Lendários',
    //         icon: 'image.png',
    //         owner: true
    //     },    
    //     {
    //         id: '2',
    //         name: 'Lendários',
    //         icon: 'image.png',
    //         owner: true
    //     },    
    //     {
    //         id: '3',
    //         name: 'Lendários',
    //         icon: 'image.png',
    //         owner: true
    //     }
    // ];

    async function fetchGuilds() {
        const response = await api.get('/users/@me/guilds');

        setGuilds(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchGuilds();
    }, []);

    return (
        <View style={styles.container}>
            {
                loading ? <Load /> :
                <FlatList 
                    data={guilds}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Guild 
                            data={item} 
                            onPress={() => handleGuildSelected(item)}
                        />                   
                    )}
                    // this property ( contentContainerStyle={{ paddingBottom: 68 }} ) makes sure there is a 
                    // space between the last item and the bottom of the cell phone. 
                    contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
                    ItemSeparatorComponent={() => <ListDivider isCentered />}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => <ListDivider isCentered />}
                    style={styles.guilds}
                />
            }
        </View>
    );
}