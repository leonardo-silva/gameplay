import React, { ReactNode } from "react";
import { 
    View, 
    Modal, 
    ModalProps, 
    TouchableWithoutFeedback // Allows to handle a click on any part of the screen 
} from "react-native";

import { Background } from "../Background";

import { styles } from "./styles";

type Props = ModalProps & {
    children: ReactNode;
    closeModal: () => void;
}

export function ModalView({children, closeModal, ...rest}: Props) {
    return (
        <Modal
            transparent
            animationType='slide'
            statusBarTranslucent  // It 'trespasses' the status bar
            {...rest}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <Background>
                            <View style={styles.bar} /> 
                            { children }
                        </Background> 
                    </View>
                </View>
            </TouchableWithoutFeedback>
            
        </Modal>
    );
}