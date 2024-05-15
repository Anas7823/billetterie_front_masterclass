import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Evenement from '../pages/Evenement';
import EvenementData from '../jeuDeDonnes/events.json';
import ReservationData from '../jeuDeDonnes/reservations.json';
import UsersData from '../jeuDeDonnes/users.json';



describe('Evenement', () => {
  it('Récupère les événements', async () => {
    render(<Evenement events={EvenementData} reservations={ReservationData} users={UsersData} />);
    await waitFor(() => {
      EvenementData.forEach(event => {
        expect(screen.getByText(event.nom)).toBeInTheDocument();
      });
    });
  });

  it('Récupère les événements ou un utilisateur est inscrit', async () => {
    render(<Evenement events={EvenementData} reservations={ReservationData} users={UsersData} />);
    const user = UsersData[0];
    const events = EvenementData.filter(event => ReservationData.find(reservation => reservation.id_user === user.id && reservation.id_evenement === event.id_evenement));
    await waitFor(() => {
      events.forEach(event => {
        expect(screen.getByText(event.nom)).toBeInTheDocument();
      });
    });
  });

  it('Calcule le nombre de places restantes à un événement', async () => {
    render(<Evenement events={EvenementData} reservations={ReservationData} users={UsersData} />);
    const event = EvenementData[0];
    const reservations = ReservationData.filter(reservation => reservation.id_evenement === event.id_evenement);
    const placesRestantes = event.nb_places - reservations.length;
    await waitFor(() => {
      expect(screen.getByText(new RegExp(placesRestantes.toString()))).toBeInTheDocument();
    });
  });
});

