import { Butto } from "bootstrap";
import React, { useContext, useEffect, useRef, useState } from "react";
import Popup from 'reactjs-popup';
import AjouterJoueur from "./AjouterJoueurs";
import axios from "axios";
import { equipeSelectionnay } from "./Accueil"
import { useDispatch, useSelector } from "react-redux";
import { Label, Radio, Dropdown, Select } from 'flowbite-react';
import { donnerGagnant, modifClassement, reinitialiserEtat } from "../redux";
import { Equipe } from "./Equipe";

const PanneauModif = (props) => {

    const joueurEquieGagne = useSelector((state) => state.match.equipeGagnante.joueurs);
    const joueurEquiePerd = useSelector((state) => state.match.equipePerdante.joueurs);
    const scorePerdant = useSelector((state) => state.match.equipePerdante.score);
    const dispatch = useDispatch();
    const match = useSelector(state => state.match);
    const panneauAjoutScore = useRef();

    const envoyerNouveauPoint = () => {
        console.log(match);
        axios.post('http:///localhost:3000/match', match).then((res) => dispatch(modifClassement({ data: [...res.data.nouveauClassement] }))).catch((e) => alert(e));
        dispatch(reinitialiserEtat());
    };

    const boutonDisable = (joueurEquieGagne.length === 0 || joueurEquiePerd.length === 0 || scorePerdant === undefined);

    return (<Popup
        trigger={<button className="button-match"> Rentrer un match</button>}
        modal
        nested
    >
        {close => (
            <div className="modal" ref={panneauAjoutScore}>
                <button className="close" onClick={close}>
                    &times;
                </button>
                <div className="content">
                    <Equipe joueurs={props.joueurs} gagnante={true} />
                    <div className="vs">
                        <img src="https://cdn-icons-png.flaticon.com/128/12129/12129584.png" loading="lazy" alt="contre " title="contre " width="64" height="64" />
                    </div>
                    <Equipe joueurs={props.joueurs} gagnante={false} />
                    <br />
                </div>
                <div className="actions">
                    <button
                        disabled={boutonDisable}
                        className="button bouton-valider"
                        onClick={() => {
                            envoyerNouveauPoint();
                            close();
                        }}
                    >
                        Valider
                    </button>
                </div>
            </div>
        )}
    </Popup>);
}

export default PanneauModif;

