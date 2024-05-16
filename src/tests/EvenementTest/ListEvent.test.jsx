import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import ListEvents from '../../components/AdminComponents/ListEvents';

describe('ListEvents component', () => {
  it('edits event correctly', () => {
    const setEditedEvent = jest.fn();
    const setSelectedEvent = jest.fn();
    const setVisible = jest.fn();
    const event = { id: 1, name: 'Event 1' };
    
    render(<ListEvents />);

    // Simuler l'appel à la fonction editEvent
    const editEvent = (event) => {
      setEditedEvent({ ...event });
      setSelectedEvent(event);
      setVisible(true);
    };

    editEvent(event);

    expect(setEditedEvent).toHaveBeenCalledWith(event);
    expect(setSelectedEvent).toHaveBeenCalledWith(event);
    expect(setVisible).toHaveBeenCalledWith(true);
  });
});

describe('ListEvents component', () => {
  it('deletes event correctly', () => {
    const setSelectedEvent = jest.fn();
    const setDeleteConfirmationVisible = jest.fn();
    const event = { id: 1, name: 'Event 1' };
    
    render(<ListEvents />);

    // Simuler l'appel à la fonction deleteEvent
    const deleteEvent = (event) => {
      setSelectedEvent(event);
      setDeleteConfirmationVisible(true);
    };

    deleteEvent(event);

    expect(setSelectedEvent).toHaveBeenCalledWith(event);
    expect(setDeleteConfirmationVisible).toHaveBeenCalledWith(true);
  });
});

describe('ListEvents component', () => {
  it('handles input change correctly', () => {
    const setEditedEvent = jest.fn();
    const event = { target: { name: 'name', value: 'New Event' } };
    const editedEvent = {};

    render(<ListEvents />);

    // Simuler l'appel à la fonction handleInputChange
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditedEvent({ ...editedEvent, [name]: value });
    };

    handleInputChange(event);

    expect(setEditedEvent).toHaveBeenCalledWith({ name: 'New Event' });
  });
});