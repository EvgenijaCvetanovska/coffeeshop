import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import CoffeeList from './CoffeeList';
import EventBus from '../../services/event-bus';
import CoffeeType from '../../models/CoffeeType';
import DataStore from '../../data/data-store';

describe('CoffeeList', () => {
    test('All coffee types should exist', () => {
        // Arrange
        const coffeeTypes = DataStore.coffeeTypes;
        // Act
        const { queryByText } = render(<CoffeeList coffeeList={coffeeTypes}></CoffeeList>);
        // Assert
        coffeeTypes.forEach(x => {
            let coffeeName = queryByText(x.name);
            expect(coffeeName).not.toBeNull();
        });
    });
    test('Clicking on a coffee should raise an event', () => {
        // Arrange
        const coffeeType = new CoffeeType("americano", "Americano");
        const eventHandlerMock = jest.fn();
        EventBus.getInstance().addListener("coffeeTypeSelected", eventHandlerMock);
        // Act
        const { queryByTestId } = render(<CoffeeList coffeeList={[coffeeType]}></CoffeeList>);
        const touchable = queryByTestId("test-id-" + coffeeType.id);
        fireEvent.press(touchable);
        // Assert
        expect(eventHandlerMock).toHaveBeenCalledWith(coffeeType);
    });
});