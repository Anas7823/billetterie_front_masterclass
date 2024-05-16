import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

export default function AddEvent({ addEvent }) {
    const [visible, setVisible] = useState(false);
    const [evenement, setEvenement] = useState({
        type: '',
        img: '',
        nom: '',
        date_debut: '',
        date_fin: '',
        description: '',
        etat: ''
    });

    // fonction pour le jeu de données | A supprimer plus tard

    const types = [
        { label: 'Jeux vidéo', value: 'jeux vidéo' },
        { label: 'Festival', value: 'festival' },
        { label: 'Concert', value: 'concert' },
        { label: 'Brocante', value: 'brocante' }
    ];
    const etats = [
        { label: 'Valide', value: 'valide' },
        { label: 'Annule', value: 'annule' },
    ];

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEvenement({ ...evenement, [name]: value });
    };

    const handleAddEvenement = () => {
        addEvent(evenement);
        setEvenement({
            type: '',
            img: '',
            nom: '',
            date_debut: '',
            date_fin: '',
            description: '',
            etat: ''
        });
        setVisible(false);
    };

    return (
        <div className="card flex justify-content-center">
            <Button label="Ajouter un événement" icon="pi pi-plus" onClick={() => setVisible(true)} />
            <Dialog header="Ajouter un événement" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="flex flex-column gap-4 p-fluid">
                    <div className="p-field">
                        <label htmlFor="type">Type</label>
                        <Dropdown
                            inputId="type"
                            name="type"
                             className="dropdown-type"
                            value={evenement.type}
                            options={types}
                            onChange={(e) => setEvenement({ ...evenement, type: e.value })}
                            placeholder="Sélectionner un type"
                            data-testid="dropdown-type"
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="nom">Nom</label>
                        <InputText id="nom" type="text" name="nom" value={evenement.nom} onChange={handleInputChange} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="date_debut">Date de début</label>
                        <InputText id="date_debut" type="datetime-local" name="date_debut" value={evenement.date_debut} onChange={handleInputChange} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="date_fin">Date de fin</label>
                        <InputText id="date_fin" type="datetime-local" name="date_fin" value={evenement.date_fin} onChange={handleInputChange} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="description">Description</label>
                        <InputText id="description" type="text" name="description" value={evenement.description} onChange={handleInputChange} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="img">Lien image</label>
                        <InputText id="img" type="img" name="img" value={evenement.img} onChange={handleInputChange} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="etat">Etat</label>
                        <Dropdown inputId="etat" name="etat" value={evenement.etat} options={etats} onChange={(e) => setEvenement({ ...evenement, etat: e.value })} placeholder="Sélectionner un type" />
                    </div>
                    <Button label="Ajouter" onClick={handleAddEvenement} />
                </div>
            </Dialog>
        </div>
    )
}
