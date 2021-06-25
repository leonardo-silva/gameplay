import React, { useState } from "react";
import { 
    Text, 
    View, 
    Platform,
    ScrollView, 
    KeyboardAvoidingView // To avoid keyboard in front of component when user is typing
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { CategorySelect } from "../../components/CategorySelect";
import { SmallInput } from "../../components/SmallInput";
import { TextArea } from "../../components/TextArea";
import { GuildIcon } from "../../components/GuildIcon";

import { strings } from "../../global/strings/strings";
import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import { Button } from "../../components/Button";

export function AppointmentCreate() {
    const [category, setCategory] = useState('');

    //function handleCategorySelect(categoryId: string) {
    //    categoryId === category ? setCategory('') : setCategory(categoryId);
   // }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
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
                    setCategory={setCategory}
                    hasCheckBox
                />

                <View style={styles.form}>
                    <RectButton>
                        <View style={styles.select}>
                            {
                                //<View style={styles.image}/>
                                <GuildIcon />
                            }
                            <View style={styles.selectBody}>
                                <Text style={styles.label}>
                                    { strings.appointmentCreateSelectBodyText }
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
                            <Text style={styles.label}>
                                { strings.appointmentCreateFieldDate }
                            </Text>

                            <View style={styles.column}>
                                <SmallInput maxLength={2}/>
                                <Text style={styles.divider}>
                                    /
                                </Text> 
                                <SmallInput maxLength={2}/>
                            </View>
                        </View>    

                        <View>
                            <Text style={styles.label}>
                                { strings.appointmentCreateFieldTime }
                            </Text>

                            <View style={styles.column}>
                                <SmallInput maxLength={2}/>
                                <Text style={styles.divider}>
                                    :
                                </Text> 
                                <SmallInput maxLength={2}/>
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
                    />

                    <View style={styles.footer}>
                        <Button title={strings.appointmentCreateButtonText}/>
                    </View>        
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}