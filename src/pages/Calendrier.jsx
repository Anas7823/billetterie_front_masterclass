import React from 'react';
import '../assets/css/Calendrier/calendrier.css'
import evenements from '../jeuDeDonnes/evenements.json'; // Assure-toi que le chemin d'accès soit correct

export default function Calendrier() {
    return (
        <div className='flex flex-column justify-content-center align-items-center mt-6'>
            <h1>Calendrier des événements</h1>
            <div className='flex flex-row gap-8 mt-5'>
                {evenements.map((evenement) => (
                    <div className='flex flex-column gap-3 calendar-container' key={evenement.id}>
                        <i style={{fontSize:'30px'}} className="pi pi-calendar"></i>
                        <div><strong style={{fontSize:'20px'}}>| {evenement.nom}</strong></div>
                        <div><i className='pi pi-clock'></i> <b>Date de début :</b> {evenement.date_debut}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
