import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import evenementsData from '../../jeuDeDonnes/evenements.json';

export default function ListEvents() {
    const [evenements, setEvenements] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editedEvent, setEditedEvent] = useState(null);
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [cancellationReason, setCancellationReason] = useState("");

    // fonction pour le jeu de données | A supprimer plus tard
    useEffect(() => {
        setEvenements(evenementsData);
    }, []);

    const statusBodyTemplate = (evenement) => {
        return <Tag value={evenement.etat} severity={evenement.etat === 'ouvert' ? 'success' : 'danger'}></Tag>;
    };

    const editEvent = (event) => {
        setEditedEvent({ ...event });
        setSelectedEvent(event);
        setVisible(true);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedEvent({ ...editedEvent, [name]: value });
    };

    const handleEditEvent = () => {
        const index = evenements.findIndex(event => event.id === editedEvent.id);
        const updatedEvenements = [...evenements];
        updatedEvenements[index] = editedEvent;
        setEvenements(updatedEvenements);
        setVisible(false);
    };

    const deleteEvent = (event) => {
        setSelectedEvent(event);
        setDeleteConfirmationVisible(true);
    };

    const confirmDeleteEvent = () => {
        const updatedEvenements = evenements.map(ev =>
            ev.id === selectedEvent.id ? { ...ev, justificatifAnnulation: cancellationReason } : ev
        );
        setEvenements(updatedEvenements);
        setDeleteConfirmationVisible(false);
    };

    const cancelDeleteEvent = () => {
        setDeleteConfirmationVisible(false);
    };

    const actionBodyTemplate = (evenement) => {
        return (
            <div className="flex items-center justify-center">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editEvent(evenement)} />
                <Button icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={() => deleteEvent(evenement)} />
            </div>
        );
    };

    const types = [
        { label: 'Jeux vidéo', value: 'jeux vidéo' },
        { label: 'Festival', value: 'festival' },
        { label: 'Concert', value: 'concert' },
        { label: 'Brocante', value: 'brocante' }
    ];

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Événements</span>
        </div>
    );

    const footer = `Total d'événements : ${evenements.length}`;

    return (
        <div className="mt-7">
            <DataTable value={evenements} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column header="État" body={statusBodyTemplate}></Column>
                <Column field="nom" header="Nom"></Column>
                <Column field="type" header="Type"></Column>
                <Column field="date_debut" header="Date de début"></Column>
                <Column field="date_fin" header="Date de fin"></Column>
                <Column field="description" header="Description"></Column>
                <Column header="Action" body={actionBodyTemplate}></Column>
                <Column field="justificatifAnnulation" header="Justificatif d'annulation"></Column>
            </DataTable>

            <Dialog header="Modifier l'événement" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="flex flex-column gap-3 p-fluid">
                    <div className="p-field">
                        <label htmlFor="type">Type</label>
                        <Dropdown id="type" name="type" value={editedEvent?.type} options={types} onChange={(e) => setEditedEvent({ ...editedEvent, type: e.value })} placeholder="Sélectionner un type" />
                    </div>
                    <div className="p-field">
                        <label htmlFor="nom">Nom</label>
                        <InputText id="nom" type="text" name="nom" value={editedEvent?.nom} onChange={handleInputChange} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="date_debut">Date de début</label>
                        <InputText id="date_debut" type="datetime-local" name="date_debut" value={editedEvent?.date_debut} onChange={handleInputChange} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="date_fin">Date de fin</label>
                        <InputText id="date_fin" type="datetime-local" name="date_fin" value={editedEvent?.date_fin} onChange={handleInputChange} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="description">Description</label>
                        <InputText id="description" type="text" name="description" value={editedEvent?.description} onChange={handleInputChange} />
                    </div>
                    <Button label="Enregistrer" onClick={handleEditEvent} />
                </div>
            </Dialog>

            <Dialog header="Confirmation de suppression" visible={deleteConfirmationVisible} style={{ width: '50vw' }} onHide={cancelDeleteEvent}>
                <div className="flex flex-column gap-3 p-fluid">
                    <div className="p-field">
                        <label htmlFor="cancellationReason">Justificatif d'annulation</label>
                        <InputText id="cancellationReason" type="text" name="cancellationReason" value={cancellationReason} onChange={(e) => setCancellationReason(e.target.value)} />
                    </div>
                    <div className="p-field">
                        <Button label="Confirmer" onClick={confirmDeleteEvent} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
