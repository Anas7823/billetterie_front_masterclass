import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import evenementsData from '../../jeuDeDonnes/evenements.json';

export default function ListEvents() {
    const [evenements, setEvenements] = useState([]);

    useEffect(() => {
        setEvenements(evenementsData);
    }, []);

    const statusBodyTemplate = (evenement) => {
        return <Tag value={evenement.etat} severity={evenement.etat === 'ouvert' ? 'success' : 'danger'}></Tag>;
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Événements</span>
        </div>
    );

    const footer = `Total d'évenements : ${evenements.length}`;

    return (
        <div className="mt-7">
            <DataTable value={evenements} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field="nom" header="Nom"></Column>
                <Column field="type" header="Type"></Column>
                <Column field="date_debut" header="Date de début"></Column>
                <Column field="date_fin" header="Date de fin"></Column>
                <Column field="description" header="Description"></Column>
                <Column header="État" body={statusBodyTemplate}></Column>
            </DataTable>
        </div>
    );
}
