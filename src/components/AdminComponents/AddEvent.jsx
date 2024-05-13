import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

export default function BasicDemo() {
    const [visible, setVisible] = useState(false);
    const [evenement, setEvenement] = useState({
        type: '',
        nom: '',
        date_debut: '',
        date_fin: '',
        description: '',
        etat: 'ouvert'
    });

    const types = [
        { label: 'Jeux vidéo', value: 'jeux vidéo' },
        { label: 'Festival', value: 'festival' },
        { label: 'Concert', value: 'concert' },
        { label: 'Brocante', value: 'brocante' }
    ];

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEvenement({ ...evenement, [name]: value });
    };

    const handleAddEvenement = () => {
        // Ici, tu peux ajouter la logique pour envoyer les données du nouvel événement à ton backend
        console.log("Nouvel événement ajouté :", evenement);
        // Réinitialiser le formulaire et fermer la boîte de dialogue
        setEvenement({
            type: '',
            nom: '',
            date_debut: '',
            date_fin: '',
            description: '',
            etat: 'ouvert'
        });
        setVisible(false);
    };

    return (
        <div className="card flex justify-content-center">
            <Button label="Ajouter un événement" icon="pi pi-plus" onClick={() => setVisible(true)} />
            <Dialog header="Ajouter un événement" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="type">Type</label>
                        <Dropdown id="type" name="type" value={evenement.type} options={types} onChange={(e) => setEvenement({ ...evenement, type: e.value })} placeholder="Sélectionner un type" />
                    </div>
                    <div className="p-field">
                        <label htmlFor="nom">Nom</label>
                        <input id="nom" type="text" name="nom" value={evenement.nom} onChange={handleInputChange} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="date_debut">Date de début</label>
                        <input id="date_debut" type="datetime-local" name="date_debut" value={evenement.date_debut} onChange={handleInputChange} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="date_fin">Date de fin</label>
                        <input id="date_fin" type="datetime-local" name="date_fin" value={evenement.date_fin} onChange={handleInputChange} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={evenement.description} onChange={handleInputChange}></textarea>
                    </div>
                    <Button label="Ajouter" onClick={handleAddEvenement} />
                </div>
            </Dialog>
        </div>
    )
}
