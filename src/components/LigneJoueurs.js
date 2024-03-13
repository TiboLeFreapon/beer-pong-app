import { useDispatch } from "react-redux";
import { afficherTableau } from "../redux";
import { stockStatistiqueJoueurs } from "../redux";
import { modifEtatChargementStat } from "../redux";

const ListeJoueurs  = ({joueur, index}) => {
    const dispatch = useDispatch();

    const recupStat = () => {
        dispatch(afficherTableau({afficher: true, id: joueur._id}));
        fetch(`http://localhost:3000/statistique/${joueur._id}`)
        .then(res => res.json()).then((data) => {
            dispatch(stockStatistiqueJoueurs({data: {...data, nomJoueur: joueur.nom, score: joueur.score, classement: index + 1}}));
            dispatch(modifEtatChargementStat({etatChargement: 2}));
        })
        .catch(err => console.log(err));
        //fetch(`http://localhost:3000/statistique/${joueur._id}`).then(res => res.json()).then((data) => console.log(data)).catch(err => console.log(err));;

    } 

    const afficherPopUp = () =>{
        dispatch(modifEtatChargementStat({etatChargement: 1}));
        recupStat();
    };

    let classementAfficher; 
    if(index + 1 === 1){
       classementAfficher = (<img src="https://cdn-icons-png.flaticon.com/128/2583/2583344.png" loading="lazy" alt="médaille " title="médaille " width="30" height="30"/>);

    } else if (index + 1 === 2){
        classementAfficher = (<img src="https://cdn-icons-png.flaticon.com/128/2583/2583319.png" loading="lazy" alt="médaille " title="médaille " width="30" height="30"></img>);
    } else if (index + 1 === 3) {
        classementAfficher = (<img src="https://cdn-icons-png.flaticon.com/128/2583/2583434.png" loading="lazy" alt="médaille " title="médaille " width="30" height="30"></img>);
    } else {
        classementAfficher = (index + 1);
    }

    return(
        <tr onClick={afficherPopUp} className="tr-joueur">
            <td>{classementAfficher}</td>
            <td>{joueur.nom}</td>
            <td>{joueur.score}</td>
        </tr>
    )
}

export default ListeJoueurs;