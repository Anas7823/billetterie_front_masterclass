import * as React from "react";
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

import '../assets/css/user/monCompte.css';
import usersData from '../jeuDeDonnes/users.json';
import eventsData from '../jeuDeDonnes/events.json';
import reservationsData from '../jeuDeDonnes/reservations.json';

function MonCompte() {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        setUsers(usersData);
        setEvents(eventsData);
        setReservations(reservationsData);
    }, []);

    const userId = parseInt(localStorage.getItem('userId'), 10);
    const user = users.find(user => user.id === userId);
    const reservationsUser = reservations.filter(reservation => reservation.id_user === userId);
    const eventsUser = reservationsUser.map(reservation => events.find(event => event.id_evenement === reservation.id_evenement));

    const ReservationDocument = ({ reservation, event }) => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Réservation numéro: {reservation.UUID}</Text>
                </View>
                <View style={styles.section}>
                    <Text>{user.nom} {user.prenom}</Text>
                    <Text>Email: {user.mail}</Text>
                    <Text>Âge: {user.age} ans</Text>
                </View>
                <View style={styles.section}>
                    <Text>Date de réservation: {reservation.date_reservation}</Text>
                    <Text>Nombre de personnes: {reservation.nb_personne}</Text>
                    <Text>Événement: {event.nom}</Text>
                    <Text>Date de début: {event.date_debut}</Text>
                    <Text>Date de fin: {event.date_fin}</Text>
                </View>
            </Page>
        </Document>
    );

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#E4E4E4',
            padding: 20
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 0.25 // sert à définir la taille de la section
        }
    });

    return (
        <div className="flex flex-column align-items-center justify-content-center inscription">
            <div className="monCompte">
                <div className="header_profil">
                    <img src="https://institutcommotions.com/wp-content/uploads/2018/05/blank-profile-picture-973460_960_720-1.png" alt="" className='img_pp' />
                    {user ? (
                        <h2>{user.nom} {user.prenom}</h2>
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
                            <p>Rôle: {user.role}</p>
                        </div>
                        <div className="historique_reservations">
                            <h3>Historique des réservations</h3>
                            {eventsUser.length > 0 ? (
                                <>
                                    <p>Nombre total de réservations: {eventsUser.length}</p>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Événement</th>
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
                                                        <PDFDownloadLink
                                                            document={<ReservationDocument reservation={reservationsUser[index]} event={event} />}
                                                            fileName={`reservation_${reservationsUser[index].UUID}.pdf`}
                                                        >
                                                            {({ loading }) => loading ? 'Chargement...' : <Button label="Télécharger un PDF" className="p-button-contrast" icon="pi pi-download" />}
                                                        </PDFDownloadLink>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            ) : (
                                <p>Aucune réservation trouvée.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <iframe src="https://giphy.com/embed/fnuSiwXMTV3zmYDf6k" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/fnuSiwXMTV3zmYDf6k">via GIPHY</a></p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MonCompte;
