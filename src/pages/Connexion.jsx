import '../assets/css/user/inscription.css';
import * as React from "react";
import { useState, useEffect } from 'react';
// import axios from 'axios';
import usersData from '../jeuDeDonnes/users.json';

function Connexion() {
    const [users, setUsers] = useState([]);

    const [connect , setConnect] = useState(false);

    // fonction pour le jeu de données | A supprimer plus tard
    useEffect(() => {
        setUsers(usersData);
    }, []);

    const Connecter = async (e) => {
        e.preventDefault();
        const mail = e.target.email.value;
        const mdp = e.target.pwd.value;

        console.log(mail, mdp);
        const user = users.find(user => user.mail === mail && user.pwd === mdp);

        if (user) {
            storeUserInfo(user.id);
            setConnect(true);
            window.location.href = "/mon-compte";
            storeUserInfo(user);
        } else {
            alert('Email ou mot de passe incorrect');
        }
    }

    const storeUserInfo = (user) => {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('isConnected', true);
        localStorage.setItem('role', user.role);
    }

    


    return (
        <div className="flex flex-column align-items-center justify-content-center inscription">

            <div className="inscriptionForm">
                <h1>Connexion</h1>
                <form className="flex flex-column align-items-center justify-content-center" onSubmit={Connecter}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="pwd" id="password" />
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
