import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dialog, Portal, Text, Button, Provider } from 'react-native-paper';

import EventBus from '../../services/event-bus';

export default function ConfirmationDialog({ navigation }: any) {
    const [visible, setVisible] = useState(false);

    const hideDialog = () => setVisible(false);

    const createOrder = () => {
        setVisible(false);
        navigation.navigate('Home');
    };

    const handleVisibility = (isVisible: boolean) => {
        setVisible(isVisible);
    };

    useEffect(() => {
        EventBus.getInstance().addListener("openConfirmationDialog", handleVisibility);
        return () => {
            EventBus.getInstance().removeListener(handleVisibility);
        };
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            EventBus.getInstance().removeListener(handleVisibility);
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const subsribe = navigation.addListener('focus', () => {
            EventBus.getInstance().addListener("openConfirmationDialog", handleVisibility);
        });
        return subsribe;
    }, [navigation]);

    return (
        <Provider>
            <View style={styles.container}>
                <Portal>
                    <Dialog style={styles.dialogView} visible={visible} onDismiss={hideDialog}>
                        <Dialog.Content>
                            <Text variant="titleLarge">Are you sure you want to create this order?</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => hideDialog()}>Cancel</Button>
                            <Button onPress={() => createOrder()}>Yes</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialogView: {
        backgroundColor: '#45374b',
        width: '100%',
        alignSelf: 'center',
    },
});
