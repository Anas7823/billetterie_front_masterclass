import React from 'react';
import { render } from '@testing-library/react';
import Calendrier from '../pages/Calendrier';

describe('Calendrier component', () => {
    const mockEvents = [
      {
        id_evenement: 1,
        nom: 'Soirée de lancement',
        date_debut: '2021-06-01',
      },
      {
        id_evenement: 2,
        nom: 'Barbecue',
        date_debut: '2021-06-01',
      },
      {
        id_evenement: 3,
        nom: 'Concert',
        date_debut: '2021-06-01',
      },
      {
        id_evenement: 4,
        nom: 'festival',
        date_debut: '2024-06-01',
      },
      {
        id_evenement: 5,
        nom: 'Dégustation',
        date_debut: '2024-06-01',
      }
    ];
  
    test('renders upcoming events correctly', () => {
      // Mocking the import statement
      jest.mock('../jeuDeDonnes/events.json', () => mockEvents);
  
      const { getByText, queryByText } = render(<Calendrier />);
  
      expect(getByText(/festival/i)).toBeInTheDocument(); // Recherche du texte partiel correspondant à "festival" (insensible à la casse)
      expect(getByText(/Dégustation/i)).toBeInTheDocument(); // Recherche du texte partiel correspondant à "Dégustation" (insensible à la casse)
  
      expect(queryByText('Soirée de lancement')).not.toBeInTheDocument(); // Vérifie que l'événement passé n'est pas présent
      expect(queryByText('Barbecue')).not.toBeInTheDocument(); // Vérifie que l'événement passé n'est pas présent
      expect(queryByText('Concert')).not.toBeInTheDocument(); // Vérifie que l'événement passé n'est pas présent
    });
  });