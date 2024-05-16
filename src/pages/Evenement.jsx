import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import React, { useState, useEffect } from 'react';
import '../assets/css/Evenement/evenement.css'
import { Tag } from 'primereact/tag';
import evenementsData from '../jeuDeDonnes/events.json';
import reservationData from '../jeuDeDonnes/reservations.json';
import usersData from '../jeuDeDonnes/users.json';

export default function Evenement() {
    const [evenements, setEvenements] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [user, setUser] = useState(null);
    const [userConnected, setUserConnected] = useState(false);

    useEffect(() => {
        const userId = parseInt(localStorage.getItem('userId'), 10);
        const user = usersData.find(user => user.id === userId);
        if (user) {
            const userIsConnected = localStorage.getItem("isConnected");
            setUser(user);
            setUserConnected(userIsConnected);
        }
    }, []);

    useEffect(() => {
        setEvenements(evenementsData);
    }, []);

    const statusBadgeTemplate = (etat) => {
        return <Tag value={etat} severity={etat === 'ouvert' ? 'success' : 'danger'}></Tag>;
    };

    const handleEventClick = (event) => {
        if (selectedEvent && selectedEvent.id_evenement === event.id_evenement) {
            setSelectedEvent(null);
        } else {
            setSelectedEvent(event);
        }
    };

    const placesRestantes = (evenement) => {
        const reservations = reservationData.filter(reservation => reservation.id_evenement === evenement.id_evenement);
        return evenement.nb_places - reservations.reduce((acc, reservation) => acc + reservation.nb_personne, 0);
    }

    // Modal de réservation
    const [visible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true);
    };

    const hideDialog = () => {
        setVisible(false);
    };

    return (
        <div className="flex flex-column align-items-center justify-content-center mt-7">
            <h1 className="text-3xl font-semibold mb-5">Événements</h1>
            <div className="flex flex-wrap flex-row justify-content-center gap-5">
                {evenements.map((evenement) => (
                    <div key={evenement.id_evenement} className="flex flex-column p-4 event-container w-500 h-full" onClick={() => handleEventClick(evenement)}>
                        <img src={evenement.img} alt={evenement.id_evenement} />
                        <h2 className="flex justify-content-center text-xl font-semibold">{evenement.nom}</h2>
                        {selectedEvent && selectedEvent.id_evenement === evenement.id_evenement && (
                            <div className="mt-3">
                                <p><span className="font-semibold">Type:</span> {evenement.type}</p>
                                <p><span className="font-semibold">Date de début:</span> {new Date(evenement.date_debut).toLocaleString()}</p>
                                <p><span className="font-semibold">Date de fin:</span> {new Date(evenement.date_fin).toLocaleString()}</p>
                                
                                <p><span className="font-semibold">Nombre de places: </span> {evenement.nb_places}</p>
                                <p data-testid="places-restantes"><span className="font-semibold">Places restantes: </span> {placesRestantes(evenement)}</p>
                                <p><span className="font-semibold">Description:</span> {evenement.description}</p>
                                <p><span className="font-semibold">État:</span> {statusBadgeTemplate(evenement.etat === 'valide' ? "ouvert" : "annulé")}</p>
                                {userConnected && evenement.etat === 'valide' && placesRestantes(evenement) > 0 && (
                                    <>
                                        <Button label="Réserver" className="p-button-help" onClick={(e) => { e.stopPropagation(); showDialog(); }} />
                                        <Dialog header={evenement.nom} visible={visible} style={{ width: '50vw' }} onHide={hideDialog}>
                                            <form action="" onSubmit={(e) => { e.preventDefault(); hideDialog(); }} className="flex flex-column gap-2">
                                                <label htmlFor="nbPersonne">Nombre de personnes</label>
                                                <InputText id="nbPersonne" type="number" />
                                                <label htmlFor="dateReservation">Date de réservation</label>
                                                <InputText id="dateReservation" type="date" />
                                                <Button label="Réserver" className="p-button-help" type='submit' />
                                            </form>
                                        </Dialog>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
