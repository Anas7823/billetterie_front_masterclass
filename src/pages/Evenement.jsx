import React, { useState, useEffect } from 'react';
import '../assets/css/Evenement/evenement.css'
import { Tag } from 'primereact/tag';
import evenementsData from '../jeuDeDonnes/evenements.json';

export default function Evenement() {
    const [evenements, setEvenements] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        setEvenements(evenementsData);
    }, []);

    const statusBadgeTemplate = (etat) => {
        return <Tag value={etat} severity={etat === 'ouvert' ? 'success' : 'danger'}></Tag>;
    };

    const handleEventClick = (event) => {
        if (selectedEvent && selectedEvent.id === event.id) {
            setSelectedEvent(null);
        } else {
            setSelectedEvent(event);
        }
    };

    return (
        <div className="flex flex-column align-items-center justify-content-center mt-7">
            <h1 className="text-3xl font-semibold mb-5">Événements</h1>
            <div className="flex flex-row justify-content-center gap-5">
                {evenements.map((evenement) => (
                    <div key={evenement.id} className="flex flex-column p-4 event-container w-500 h-full" onClick={() => handleEventClick(evenement)}>
                        <h2 className="flex justify-content-center text-xl font-semibold">{evenement.nom}</h2>
                        {selectedEvent && selectedEvent.id === evenement.id && (
                            <div className="mt-3">
                                <p><span className="font-semibold">Type:</span> {evenement.type}</p>
                                <p><span className="font-semibold">Date de début:</span> {new Date(evenement.date_debut).toLocaleString()}</p>
                                <p><span className="font-semibold">Date de fin:</span> {new Date(evenement.date_fin).toLocaleString()}</p>
                                <p><span className="font-semibold">Description:</span> {evenement.description}</p>
                                <p><span className="font-semibold">État:</span> {statusBadgeTemplate(evenement.etat)}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
