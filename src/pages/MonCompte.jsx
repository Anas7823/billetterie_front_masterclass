import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../assets/css/user/monCompte.css';
import * as React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import usersData from '../jeuDeDonnes/users.json';
import eventsData from '../jeuDeDonnes/events.json';
import reservationsData from '../jeuDeDonnes/reservations.json';

function MonCompte() {
    const [users, setUsers] = useState([]);

    const [events, setEvents] = useState([]);

    const [reservations, setReservations] = useState([]);

    // fonction pour les jeux de données | A supprimer plus tard
    useEffect(() => {
        setUsers(usersData);
    }, []);

    useEffect(() => {
        setEvents(eventsData);
    }, []);

    useEffect(() => {
        setReservations(reservationsData);
    }, []);

    // Récupérer les informations de l'utilisateur connecté depuis le localStorage
    const userId = parseInt(localStorage.getItem('userId'), 10);

    // Récupérer les informations de l'utilisateur connecté depuis le jeu de données
    const user = users.find(user => user.id === userId);

    let reservationsUser = reservations.filter(reservation => reservation.id_user === userId); // Récupérer les réservations de l'utilisateur connecté

    let eventsUser = reservationsUser.map(reservation => events.find(event => event.id_evenement === reservation.id_evenement)); // Récupérer les événements correspondant aux réservations de l'utilisateur connecté

    return (
        <div className="flex flex-column align-items-center justify-content-center inscription">

            <div className="monCompte">
                <div className="header_profil">
                    <img src="https://institutcommotions.com/wp-content/uploads/2018/05/blank-profile-picture-973460_960_720-1.png" alt="" className='img_pp' />
                    {user ? (
                        <h2>
                            {user.nom} {user.prenom}
                        </h2>
                    ) : (
                        <h2>Utilisateur non trouvé</h2>
                    )}

                </div>
                {user ? (
                    <>
                    <div className="infos">
                        <h3>Informations</h3>
                        <p>Âge: {user.age} ans</p>
                        <p>Email: {user.mail}</p>
                        <p>Rôle: {user.role} </p>
                    </div>

                    <div className="historique_reservations">
                        <h3>Historique des réservations</h3>
                        {eventsUser[0] ? (
                            <>
                            <p>Nombre total de réservations: {eventsUser.length}</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Evenement</th>
                                        <th>Date</th>
                                        <th>Nombre de places</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventsUser.map((event, index) => (
                                        <tr key={index}>
                                            <td>{event.nom}</td>
                                            <td>{event.date_debut} - {event.date_fin}</td>
                                            <td>{reservationsUser[index].nb_personne}</td>
                                            <td>
                                                <Button label="Télécharger un PDF" className="p-button-contrast" icon="pi pi-download" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                        ) : (
                        <>

                        </>
                        )}

                        
                    </div>
                    </>
                    )
                    : (
                        <h2>Utilisateur non trouvé</h2>
                    )}

            </div>

            
        </div>
    );
}

export default MonCompte;
