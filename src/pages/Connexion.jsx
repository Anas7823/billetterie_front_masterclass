import React from 'react';
import '../assets/css/user/inscription.css';

function Connexion() {
    return (
        <div className="flex flex-column align-items-center justify-content-center inscription">

            <div className="inscriptionForm">
                <h1>Connexion</h1>
                <form className="flex flex-column align-items-center justify-content-center">
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
