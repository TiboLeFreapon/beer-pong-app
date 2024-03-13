import "../styles/Accueil.css"
import logo from '.././logo.svg';
import { createContext, useContext, useEffect, useState } from "react";
import PanneauModif from "./PanneauModif";
import { useDispatch, useSelector } from "react-redux";
import { modifClassement } from "../redux";
import ListeJoueurs from "./LigneJoueurs";
import PanneauStat from "./PanneauStat";
import Chargement from "./Chargement";
import { chargerEtatChargement } from "../redux";

function Accueil() {
    const joueurs = useSelector(state => state.tableauScore.tableau);
    //const etatChargement = useSelector(state => state.tableauScore.etatChargement);
    const etatChargement = useSelector(state=>state.tableauScore.etatChargement);
    const joueursASort = [...joueurs];
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    console.log(state)
    console.log("Accueil")

    useEffect(() => {
        dispatch(chargerEtatChargement({etatChargement: 1}))
        fetch("http://localhost:3000/")
            .then(res => res.json())
            .then((data) => {
                dispatch(modifClassement({ data: data }));
                dispatch(chargerEtatChargement({etatChargement: 2}));})
            .catch(err => console.log(err));
        
    }, []);
    const joueurTrie = joueursASort.sort((a, b) => b.score - a.score);

    const affichageJoueur = [];
    joueurTrie.map((joueur, index) => {
        affichageJoueur.push(<ListeJoueurs key={joueur._id} joueur={joueur} index={index} />)
    });

    let contenu;

    if (etatChargement === 0) {
        contenu = (<></>);
    } else if (etatChargement === 1) {
        contenu = (<td colspan="3"><Chargement /></td>);
    } else if (etatChargement === 2) {
        contenu = affichageJoueur;
    }

    return (
        <div className="accueil">
        <h1>Classement Beerpong Montréal</h1>
        <table className="tableau">

                <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Points</th>
                </tr>
                {contenu}
        </table>
        <PanneauModif ouvert joueurs={joueurs} />
        <PanneauStat />
        </div>)
}

export default Accueil;
