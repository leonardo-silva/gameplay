import React from "react";
import { View, FlatList } from "react-native";

import { Guild, GuildProps } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";

import { styles } from "./styles";

type Props = {
    handleGuildSelected: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelected }: Props) {
    const guilds = [
        {
            id: '1',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },    
        {
            id: '2',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },    
        {
            id: '3',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        }
    ];

    return (
        <View style={styles.container}>
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
        </View>
    );
}