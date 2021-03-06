import React from "react";
import { View, Text, Image, Alert, ActivityIndicator } from "react-native";

import { ButtonIcon } from "../../components/ButtonIcon";
import { Background } from "../../components/Background";

import { useAuth } from "../../hooks/auth";

import IllustrationImg from '../../assets/illustration.png';

import { styles } from './styles';
import { theme } from "../../global/styles/theme";

export function SignIn() {
    //const navigation = useNavigation();
    const { loading, signIn } = useAuth();
    //console.log(user);

    async function handleSignIn() {
        // Navigation was removed when OAuth2 authentication was implemented
        //navigation.navigate('Home');
        try {
            await signIn();
        } catch (error) {
            Alert.alert(error as string);
        }
    }
    
    return(
        <Background>
            <View style={styles.container}>
                <Image 
                    source={IllustrationImg} 
                    style={styles.image}
                    resizeMode='stretch'
                />

                <View style={styles.content}>
                    <Text style={styles.title}>
                        Conecte-se {'\n'} 
                        e organize suas {'\n'} 
                        jogatinas
                    </Text>

                    <Text style={styles.subtitle}>
                        Crie grupos para jogar seus games {'\n'}
                        favoritos com seus amigos
                    </Text>

                    {
                        loading ? <ActivityIndicator color={theme.colors.primary} /> :
                        <ButtonIcon 
                        title="Entrar com Discord"
                        onPress={handleSignIn}
                    />
                    }
                </View>     
            </View>
        </Background>    
  );
}