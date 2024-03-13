
import { Dropdown, Select } from 'flowbite-react';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ajouterJoueursDansEquipe } from '../redux';



const AjouterJoueur = (props) => {
    const dropDownItem = [(<option selected value={-1}></option>)];
    const dispatch = useDispatch();

    const ajouterJoueursEquipe = (e) => {
        if (e.target.value) {
            const idJoueurs = Number(e.target.value);
            dispatch(ajouterJoueursDansEquipe({ id: idJoueurs, equipe: props.gagnante ? "equipeGagnante" : "equipePerdante", index: props.index }))
        }
    }

    props.joueurs.map((joueur) => {
        if (!joueur.select) {
            dropDownItem.push(<option value={joueur._id}>
                {joueur.nom}
            </option>)
        }
    });

    return (
        <div className="element">
            <select label={"equipes"} className={'select-joueur'} onChange={ajouterJoueursEquipe}>
                {dropDownItem}
            </select>
        </div>);
}

export default AjouterJoueur;