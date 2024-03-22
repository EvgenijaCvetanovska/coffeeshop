import React from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import ICoffeeType from '../../models/ICoffeeType';
import EventBus from '../../services/event-bus';

type CoffeeListProps = { coffeeList: Array<ICoffeeType> };

export default function CoffeeList({ coffeeList }: CoffeeListProps) {

    const chooseCoffee = (coffeeType: ICoffeeType) => {
        EventBus.getInstance().fireEvent("coffeeTypeSelected", coffeeType);
    };

    return coffeeList.map((coffeeType: ICoffeeType, index: number) => {
        return (
            <Pressable style={styles.coffeeCard} onPress={() => { chooseCoffee(coffeeType) }} key={index} testID={"test-id-" + coffeeType.id}>
                <Image style={styles.coffeeImg} source={{ uri: coffeeType ? coffeeType.image : '' }} />
                <View>
                    <Text style={styles.coffeeName}>{coffeeType ? coffeeType.name : ''}</Text>
                </View>
            </Pressable>
        );
    })
}

const styles = StyleSheet.create({
    coffeeCard: {
        alignItems: 'center',
    },
    coffeeImg: {
        width: 150,
        height: 150,
        borderRadius: 3,
        marginRight: 5
    },
    coffeeName: {
        marginTop: 10,
        fontSize: 18,
        color: '#45374b',
    }
});
