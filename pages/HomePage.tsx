import { StyleSheet, Pressable, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function HomePage({ navigation }: any) {

    // This option should navigate user to the Menu page with coffee options
    const goToTheMenu = () => {
        navigation.navigate('Menu');
    };

    // This option should navigate user to the "Make your own coffee" page
    const customizeYourCoffee = () => {
        navigation.navigate('CoffeeConfigurator', {});
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Pressable onPress={() => goToTheMenu()}>
                    <View style={styles.centeredContent}>
                        <Card style={styles.cardOption}>
                            <Card.Content style={styles.cardTitle}>
                                <Text variant="headlineSmall">Choose coffee from our menu</Text>
                            </Card.Content>
                            <Card.Cover style={styles.cardImg} source={{ uri: '../assets/coffee-types.png' }} />
                        </Card>
                    </View>
                </Pressable>
            </View>
            <View style={styles.bottom}>
                <Pressable onPress={() => customizeYourCoffee()}>
                    <View style={styles.centeredContent}>
                        <Card style={styles.cardOption}>
                            <Card.Content style={styles.cardTitle}>
                                <Text variant="headlineSmall">Make your own coffee</Text>
                            </Card.Content>
                            <Card.Cover style={styles.cardImg} source={{ uri: '../assets/custom-coffee.png' }} />
                        </Card>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    top: {
        flex: 1,
        marginBottom: 40,
        minWidth: 400,
        height: 300,
    },
    bottom: {
        flex: 1,
        minWidth: 400,
        height: 300,
    },
    cardOption: {
        borderRadius: 3,
        backgroundColor: '#45374b',
        width: '100%',
        minWidth: 400,
        height: 300,
    },
    cardTitle: {
        marginBottom: 8,
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardImg: {
        height: 270,
        borderRadius: 3,
    }
});
