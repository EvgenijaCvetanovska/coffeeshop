import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Image } from 'react-native';
import { Card, Text, List, SegmentedButtons, Checkbox, Button } from 'react-native-paper';
import ICoffeeType from '../models/ICoffeeType';
import CoffeeType from '../models/CoffeeType';
import SyrupType from '../models/SyrupType';
import EventBus from '../services/event-bus';
import ConfirmationDialog from '../components/ConfirmationDialog/ConfirmationDialog';

const generateUniqueId: () => string = () => Math.random().toString(36).slice(2, 9);

export default function CoffeeConfigurator({ route, navigation }: any) {
    // Local data
    const { selectedCoffee } = route.params;
    const [coffee, setCoffee] = useState<ICoffeeType>(
        selectedCoffee ??
        new CoffeeType(generateUniqueId(), "My Custom coffee", 0, 0, 0, false, SyrupType.None, '../assets/create-own-coffee.jpg')
    );
    const [shotsOfCoffee, setShotsOfCoffee] = useState(coffee.shotsOfCoffee);
    const [shotsOfMilk, setShotsOfMilk] = useState(coffee.shotsOfMilk);
    const [packsOfSugar, setPacksOfSugar] = useState(coffee.packsOfSugar);
    const [hasFoamMilk, setHasFoamMilk] = useState(coffee.hasFoamMilk);
    const [syrupType, setSyrupType] = useState(coffee.syrupType ?? SyrupType.None);

    const increaseCoffeeShots = () => {
        setShotsOfCoffee(shotsOfCoffee + 1);
    };
    const decreaseCoffeeShots = () => {
        if (shotsOfCoffee == 0) {
            return;
        }
        setShotsOfCoffee(shotsOfCoffee - 1);
    };
    const increaseMilkShots = () => {
        setShotsOfMilk(shotsOfMilk + 1);
    };
    const decreaseMilkShots = () => {
        if (shotsOfMilk == 0) {
            return;
        }
        setShotsOfMilk(shotsOfMilk - 1);
    };
    const increasePacksOfSugar = () => {
        setPacksOfSugar(packsOfSugar + 1);
    };
    const decreasePacksOfSugar = () => {
        if (packsOfSugar == 0) {
            return;
        }
        setPacksOfSugar(packsOfSugar - 1);
    };
    const showShotsOfEspresso = () => {
        return (
            <View style={styles.increaseDecreaseBtns}>
                <Pressable onPress={() => decreaseCoffeeShots()}>
                    <Text variant="titleLarge" style={styles.minusText}> - </Text>
                </Pressable>
                <Text variant="titleMedium" style={styles.numText}>{shotsOfCoffee}</Text>
                <Pressable onPress={() => increaseCoffeeShots()}>
                    <Text variant="titleLarge" style={styles.plusText}> + </Text>
                </Pressable>
            </View>
        );
    };
    const showShotsOfMilk = () => {
        return (
            <View style={styles.increaseDecreaseBtns}>
                <Pressable onPress={() => decreaseMilkShots()}>
                    <Text variant="titleLarge" style={styles.minusText}> - </Text>
                </Pressable>
                <Text variant="titleMedium" style={styles.numText}>{shotsOfMilk}</Text>
                <Pressable onPress={() => increaseMilkShots()}>
                    <Text variant="titleLarge" style={styles.plusText}> + </Text>
                </Pressable>
            </View>
        );
    };
    const showPacksOfSugar = () => {
        return (
            <View style={styles.increaseDecreaseBtns}>
                <Pressable onPress={() => decreasePacksOfSugar()}>
                    <Text variant="titleLarge" style={styles.minusText}> - </Text>
                </Pressable>
                <Text variant="titleMedium" style={styles.numText}>{packsOfSugar}</Text>
                <Pressable onPress={() => increasePacksOfSugar()}>
                    <Text variant="titleLarge" style={styles.plusText}> + </Text>
                </Pressable>
            </View>
        );
    };
    const hasFoamMilkCheckbox = () => {
        return (
            <Checkbox
                status={hasFoamMilk ? 'checked' : 'unchecked'}
                onPress={() => {
                    setHasFoamMilk(!hasFoamMilk);
                }}
            />
        );
    };

    const orderCoffee = () => {
        EventBus.getInstance().fireEvent("openConfirmationDialog", true);
    };

    return (
        <View style={styles.container}>
            <Image style={styles.coffeeImg} source={{ uri: coffee.image }} />
            <View style={styles.coffeeDetails}>
                <Card style={styles.coffeeDetailsCard} >
                    <Card.Content>
                        <Text variant="titleLarge" style={styles.coffeeDetailsTitle}>Coffee details: {coffee.name}</Text>
                        <List.Section>
                            <List.Item title="Shots of espresso" left={() => <List.Icon icon="coffee" />} right={() => showShotsOfEspresso()} />
                            <List.Item title="Shots of milk" left={() => <List.Icon icon="coffee" />} right={() => showShotsOfMilk()} />
                            <List.Item title="Packs of sugar" left={() => <List.Icon icon="coffee" />} right={() => showPacksOfSugar()} />
                            <List.Item title="Milk foam" left={() => <List.Icon icon="coffee" />} right={() => hasFoamMilkCheckbox()} />

                            <List.Item title="Syrup" left={() => <List.Icon icon="coffee" />} />
                            <SegmentedButtons
                                value={SyrupType[syrupType]}
                                onValueChange={(val) => setSyrupType(SyrupType[val as keyof typeof SyrupType])}
                                buttons={[
                                    {
                                        value: SyrupType[SyrupType.None],
                                        label: SyrupType[SyrupType.None],
                                    },
                                    {
                                        value: SyrupType[SyrupType.Chocolate],
                                        label: SyrupType[SyrupType.Chocolate],
                                    },
                                    {
                                        value: SyrupType[SyrupType.Vanilla],
                                        label: SyrupType[SyrupType.Vanilla],
                                    },
                                    {
                                        value: SyrupType[SyrupType.Caramel],
                                        label: SyrupType[SyrupType.Caramel],
                                    },
                                ]}
                            />
                        </List.Section>
                    </Card.Content>
                </Card>
                <Button style={styles.menuButton} icon="coffee" mode="contained" textColor="#ffffff" onPress={() => orderCoffee()}>
                    Order
                </Button>
                <ConfirmationDialog navigation={navigation}></ConfirmationDialog>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coffeeImg: {
        width: 200,
        height: 200,
        borderRadius: 3,
        marginTop: 10,
    },
    coffeeDetails: {
        marginTop: 15,
        width: 500,
    },
    coffeeDetailsCard: {
        width: '100%',
        marginRight: 8,
        borderRadius: 3,
        backgroundColor: '#45374b',
        color: 'white'
    },
    coffeeDetailsTitle: {
        alignItems: 'center',
    },
    increaseDecreaseBtns: {
        display: "flex",
        flexDirection: "row",
        marginTop: 15,
        width: 130,
        justifyContent: 'flex-end'
    },
    numberOfShots: {
        marginTop: -18,
        fontSize: 45,
        fontFamily: 'WorkSans-Regular',
        color: "#0088FF",
        userSelect: 'none'
    },
    menuButton: {
        backgroundColor: '#45374b',
        marginRight: 5,
        marginTop: 15,
        width: 150,
        textAlign: 'center',
        alignSelf: 'center',
    },
    plusText: {
        userSelect: 'none'
    },
    minusText: {
        marginTop: -3,
        userSelect: 'none'
    },
    numText: {
        marginLeft: 10,
        marginRight: 10,
        userSelect: 'none'
    }
});
