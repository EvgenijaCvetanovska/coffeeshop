import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoffeeConfigurator from './pages/CoffeeConfigurator';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <ScrollView contentContainerStyle={styles.mainContainer}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomePage}
            />
            <Stack.Screen
              name="Menu"
              component={MenuPage}
            />
            <Stack.Screen
              name="CoffeeConfigurator"
              component={CoffeeConfigurator}
            />
          </Stack.Navigator>
        </ScrollView>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: 'white'
  },
});
