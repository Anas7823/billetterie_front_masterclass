import React from 'react';
import '../assets/css/user/inscription.css';

function Inscription() {
    return (
        <div className="flex flex-column align-items-center justify-content-center inscription">

            <div className="inscriptionForm">
                <h1>Inscription</h1>
                <form className="flex flex-column align-items-center justify-content-center">
                    <label htmlFor="nom">Nom</label>
                    <input type="text" name="nom" id="nom" />
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" name="prenom" id="prenom" />
                    <label htmlFor="date de naissance">Date de naissance</label>
                    <input type="date" name="date de naissance" id="date de naissance" />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" />
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
