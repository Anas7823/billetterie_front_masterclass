import React from 'react';
import '../assets/css/Calendrier/calendrier.css';
import evenements from '../jeuDeDonnes/events.json'; 

export default function Calendrier() {
    // Filtrer les événements à venir
    const evenementsAVenir = evenements.filter((evenement) => new Date(evenement.date_debut) > new Date());

    return (
        <div className='flex flex-column justify-content-center align-items-center mt-6'>
            <h1>Calendrier des événements</h1>
            <div className='flex flex-wrap flex-row justify-content-center gap-8 mt-5'>
                {evenementsAVenir.map((evenement) => (
                    <div className='flex flex-column gap-3 calendar-container' key={evenement.id_evenement}>
                        <i style={{fontSize:'30px'}} className="pi pi-calendar"></i>
                        <div><strong style={{fontSize:'20px'}}>| {evenement.nom}</strong></div>
                        <div><i className='pi pi-clock'></i> <b>Date de début :</b> {evenement.date_debut}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
