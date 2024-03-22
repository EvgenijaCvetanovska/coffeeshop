import { StyleSheet, View } from 'react-native';
import { Card, Text, List, Checkbox } from 'react-native-paper';
import ICoffeeType from '../../models/ICoffeeType';
import SyrupType from '../../models/SyrupType';

type CoffeeProps = { coffeeType: ICoffeeType };
export default function CoffeeDetails({ coffeeType }: CoffeeProps) {

    const showShotsOfEspresso = () => {
        return (
            <Text variant="titleMedium" style={styles.coffeeDetailsTitle}>{coffeeType.shotsOfCoffee}</Text>
        );
    };
    const showShotsOfMilk = () => {
        return (
            <Text variant="titleMedium" style={styles.coffeeDetailsTitle}>{coffeeType.shotsOfMilk}</Text>
        );
    };
    const showPacksOfSugar = () => {
        return (
            <Text variant="titleMedium" style={styles.coffeeDetailsTitle}>{coffeeType.packsOfSugar}</Text>
        );
    };
    const hasFoamMilkCheckbox = () => {
        return (
            <Checkbox
                status={coffeeType.hasFoamMilk ? 'checked' : 'unchecked'}
            />
        );
    };
    const showSyrupType = () => {
        return (
            <Text variant="titleMedium" style={styles.coffeeDetailsTitle}>{SyrupType[coffeeType.syrupType ?? SyrupType.None]}</Text>
        );
    };

    return (
        <View>
            <Card style={styles.coffeeDetailsCard} >
                <Card.Content>
                    <Text variant="titleLarge" style={styles.coffeeDetailsTitle}>Coffee details: {coffeeType ? coffeeType.name : ""}</Text>
                    <List.Section>
                        <List.Item title="Shots of espresso" left={() => <List.Icon icon="coffee" />} right={() => showShotsOfEspresso()} />
                        <List.Item title="Shots of milk" left={() => <List.Icon icon="coffee" />} right={() => showShotsOfMilk()} />
                        <List.Item title="Packs of sugar" left={() => <List.Icon icon="coffee" />} right={() => showPacksOfSugar()} />
                        <List.Item
                            title="Has foam milk"
                            disabled
                            left={() => <List.Icon icon="coffee" />}
                            right={() => hasFoamMilkCheckbox()} />
                        <List.Item title="Syrup type" left={() => <List.Icon icon="coffee" />} right={() => showSyrupType()} />

                    </List.Section>
                </Card.Content>
            </Card>
        </View>
    );


}

const styles = StyleSheet.create({
    coffeeDetailsCard: {
        width: '100%',
        marginRight: 8,
        borderRadius: 3,
        backgroundColor: '#45374b',
        color: 'white'
    },
    coffeeDetailsTitle: {
        alignItems: 'center',
    }
});
