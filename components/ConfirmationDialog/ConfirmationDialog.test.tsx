import React from 'react';
import { act, render } from '@testing-library/react-native';
import ConfirmationDialog from './ConfirmationDialog';
import EventBus from '../../services/event-bus';

describe('ConfirmationDialog', () => {
    test('Should open when event fired', () => {
        // Arrange
        const addListenerMockFn = jest.fn();
        const navigation = {
            addListener: addListenerMockFn
        }
        // Act
        const { queryByText } = render(<ConfirmationDialog navigation={navigation}></ConfirmationDialog>);
        act(() => {
            EventBus.getInstance().fireEvent("openConfirmationDialog", {});
        });
        // Assert
        const dialogText = queryByText('Are you sure you want to create this order?');
        expect(dialogText).not.toBeNull();
    });

    test('Should not open unless event fired', () => {
        // Arrange
        const addListenerMockFn = jest.fn();
        const navigation = {
            addListener: addListenerMockFn
        }
        // Act
        const { queryByText } = render(<ConfirmationDialog navigation={navigation}></ConfirmationDialog>);
        // Assert
        const dialogText = queryByText('Are you sure you want to create this order?');
        expect(dialogText).toBeNull();
    });
});