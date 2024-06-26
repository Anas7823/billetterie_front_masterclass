import * as React from 'react';
import { useState, useEffect } from 'react';
import '../assets/css/navbar.css';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const navigate = useNavigate();

    const [userLogged, setUserLogged] = useState(false);

    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Vérifier si l'utilisateur est connecté
        const connected = localStorage.getItem('isConnected');
        if (connected) {
            setUserLogged(true);
            setUserRole(localStorage.getItem('role'));
        }
    }, []);

    const items = [
        { label: 'Accueil', icon: 'pi pi-home', command: () => navigate('/') },
        // Si l'utilisateur est connecté, ne pas afficher le bouton de connexion
        !userLogged && { label: 'Connexion', icon: 'pi pi-user', command: () => navigate('/login') },
        { label: 'Evenement', icon: 'pi pi-tag', command: () => navigate('/evenement') },
        { label: 'Calendrier', icon: 'pi pi-calendar', command: () => navigate('/calendrier') },
        userRole=='admin' && { label: 'Admin', icon: 'pi pi-lock', command: () => navigate('/admin') },
        userLogged && { label: 'Mon compte', icon: 'pi pi-face-smile', command: () => navigate('/mon-compte') },

    ];

    // Fonction pour déconnecter l'utilisateur et supprimer le cookie
    const handleDeconnexion = () => {
        // Supprimer le cookie en définissant sa date d'expiration à une date passée
        document.cookie = "JWSToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Rediriger l'utilisateur vers la page de connexion ou effectuer d'autres actions nécessaires
    };

    // Vérifier s'il y a un cookie JWSToken
    const cookieExists = document.cookie.includes('JWSToken');

    return (
        <div className="navbar-theming">
            <div className="flex flex-row gap-6">
                <TabMenu model={items} />
                {cookieExists && <Button icon='pi pi-sign-out' label='Déconnexion' onClick={handleDeconnexion} />}
            </div>
        </div>
    );
}
