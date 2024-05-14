import * as React from "react";
import { useState } from 'react';
import '../assets/css/user/inscription.css';
import users from '../jeuDeDonnes/users.json';

function Inscription() {
    const [user, setUser] = useState({
        id: '',
        nom: '',
        prenom: '',
        age: '',
        mail: '',
        pwd: '',
        confirmPassword: ''
    });

    const [connect, setConnect] = useState(false);

    const Inscrire = async (e) => {
        e.preventDefault();
        const nom = e.target.nom.value;
        const prenom = e.target.prenom.value;
        const age = e.target.age.value;
        const mail = e.target.mail.value;
        const pwd = e.target.pwd.value;
        const confirmPassword = e.target.confirmPassword.value;

        console.log(nom, prenom, age, mail, pwd, confirmPassword);

        if (pwd !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }

        const user = {
            id: Math.floor(Math.random() * 100),
            nom: nom,
            prenom: prenom,
            age: age,
            mail: mail,
            pwd: pwd
        };

        setUser(user);
        storeUserInfo(user);

        setConnect(true);

        // Ajouter le user dans le jeu de données qui est dans un fichier json externe
        users.push(user);
        

        window.location.href = "/mon-compte";
    }

    const storeUserInfo = (user) => {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('isConnected', true);
        localStorage.setItem('role', user.role);
    }

    return (
        <div className="flex flex-column align-items-center justify-content-center inscription">

            <div className="inscriptionForm">
                <h1>Inscription</h1>
                <form className="flex flex-column align-items-center justify-content-center" onSubmit={Inscrire}>
                    <label htmlFor="nom">Nom</label>
                    <input type="text" name="nom" id="nom" />
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" name="prenom" id="prenom" />
                    <label htmlFor="date de naissance">Âge</label>
                    <input type="number" name="age" id="age" />
                    <label htmlFor="mail">Email</label>
                    <input type="mail" name="mail" id="mail" />
                    <label htmlFor="pwd">Mot de passe</label>
                    <input type="password" name="pwd" id="pwd" />
                    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" />
                    <p>
                        <small>
                            Vous avez déja un compte ? Cliquez <a href="/login">ici</a> !
                        </small>
                    </p>
                    <button type="submit">S'inscrire</button>
                </form>
            </div>
            
        </div>
    );
}

export default Inscription;
