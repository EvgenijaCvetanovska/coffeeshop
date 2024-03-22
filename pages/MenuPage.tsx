import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import mockApi from "../data/mock-api";
import CoffeeDetails from '../components/CoffeeDetails/CoffeeDetails';
import ConfirmationDialog from '../components/ConfirmationDialog/ConfirmationDialog';
import CoffeeList from '../components/CoffeeList/CoffeeList';
import EventBus from '../services/event-bus';
import ICoffeeType from '../models/ICoffeeType';

export default function MenuPage({ navigation }: any) {
    // Local data
    const [coffeeTypes, setCoffeeTypes] = useState<ICoffeeType[]>([]);
    const [selectedCoffee, setSelectedCoffee] = useState<ICoffeeType | null>(null);

    // Handler for the event Coffee Type Selected
    const handleCoffeeTypeSelected = (selectedCoffee: ICoffeeType) => {
        setSelectedCoffee(selectedCoffee);
    };

    // Fires event that Order has been clicked
    const orderCoffee = () => {
        EventBus.getInstance().fireEvent("openConfirmationDialog", true);
    };

    useEffect(() => {
        // Subscribe to the event Coffee Type Selected
        EventBus.getInstance().addListener("coffeeTypeSelected", handleCoffeeTypeSelected);

        // Load the predefined coffee types from the API (mock in this case)
        (async () => {
            setCoffeeTypes(await mockApi.getCoffeeTypes());
        })();

        // Destroy callback
        return () => {
            // Unsubscribe the handlers
            EventBus.getInstance().removeListener(handleCoffeeTypeSelected);
        };
    }, []);

    const customize = () => {
        navigation.navigate('CoffeeConfigurator', { selectedCoffee });
    };

    const showCoffeeDetails = () => {
        if (selectedCoffee) {
            return (
                <View>
                    <View style={styles.coffeeDetails}>
                        <CoffeeDetails coffeeType={selectedCoffee}></CoffeeDetails>
                    </View>
                    <View style={styles.menuBtns}>
                        <Button style={styles.menuButton} icon="bell" mode="contained" textColor="#ffffff" onPress={() => orderCoffee()}>
                            Order
                        </Button>
                        <Button style={styles.menuButton} icon="coffee" mode="contained" textColor="#ffffff" onPress={() => customize()}>
                            Customize
                        </Button>
                    </View>
                    <ConfirmationDialog navigation={navigation}></ConfirmationDialog>
                </View>
            )
        } else {
            return (
                <View>
                    <Text style={styles.pageTitle} variant="titleLarge">Choose coffee from our menu</Text>
                </View>
            )
        }
    };

    return (
        <View style={styles.menuWrapper}>
            <Text variant="displaySmall" style={styles.pageTitle}>Our Options</Text>
            <View style={styles.coffeeOptions}>
                <CoffeeList coffeeList={coffeeTypes}></CoffeeList>
            </View>
            {
                showCoffeeDetails()
            }
        </View>
    );
}

const styles = StyleSheet.create({
    menuWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageTitle: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 30,
        color: '#45374b',
    },
    coffeeImg: {
        width: 150,
        height: 150,
        borderRadius: 3,
    },
    coffeeOptions: {
        display: 'flex',
        flexDirection: 'row',
    },
    coffeeDetails: {
        marginTop: 15,
        width: 500,
    },
    menuBtns: {
        marginTop: 15,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    menuButton: {
        backgroundColor: '#45374b',
        marginRight: 5
    }
});
