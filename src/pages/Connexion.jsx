import '../assets/css/user/inscription.css';
import * as React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import usersData from '../jeuDeDonnes/users.json';

function Connexion() {
    const [users, setUsers] = useState([]);

    // fonction pour le jeu de données | A supprimer plus tard
    useEffect(() => {
        setUsers(usersData);
    }, []);

    const Connecter = async (e) => {
        e.preventDefault();
        const mail = e.target.elements.email.value;
        const mdp = e.target.elements.mdp.value;
        console.log(mail, mdp);
      
        try {
          const response = await axios.post(`http://localhost:8000/login`, {
            mail: mail,
            mdp: mdp
          });
          const { userId } = response.data; // Assuming the user ID is included in the response data
          storeUserInfo(userId); // Enregistrer l'ID de l'utilisateur dans le localStorage
          console.log(userId);
          alert(`Connexion réussie !`);
        } catch (error) {
          alert('Adresse e-mail ou mot de passe incorrect.');
          console.error(error);
        }
    }

    const storeUserInfo = (userId) => {
        localStorage.setItem('userId', userId);
    }
    


    return (
        <div className="flex flex-column align-items-center justify-content-center inscription">

            <div className="inscriptionForm">
                <h1>Connexion</h1>
                <form className="flex flex-column align-items-center justify-content-center" onSubmit={Connecter}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" />
                    <p>
                        <small>
                            Vous n'avez pas de compte ? Cliquez <a href="/inscription">ici</a> !
                        </small>
                    </p>
                    <button type="submit">Connexion</button>
                </form>
            </div>
            
        </div>
    );
}

export default Connexion;
