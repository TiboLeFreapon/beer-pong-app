import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { reinitaliseStat } from "../redux";
import { Donut } from "./statistique/Donut";
import Chargement from "./Chargement";
import { calculMoyenSCore, calculMoyenVerre, trieTabParDate } from "../fonctionsMetiers/CalculStat";
import { SingleBar } from "./statistique/SingleBar";
import { MatchPrecedent } from "./statistique/MatchPrecedent";

const PanneauStat = () => {
    console.log("---render PanneauStat----")
    const ouvert = useSelector(state => state.statistique.afficherPopUpStat);
    const etatChargement = useSelector(state => state.statistique.etatChargementStat);
    const dispatch = useDispatch();

    const fermeturePopUp = () => {
        dispatch(reinitaliseStat());
    }


    let contenu;

    if (etatChargement === 0) {
        contenu = (<></>);
    } else if (etatChargement === 1) {
        contenu = (<td colspan="3"><Chargement /></td>);
    } else if (etatChargement === 2) {
        contenu = (<ContenuChargeay />)

    }

    return (<div>
        {
            ouvert ? createPortal(<div className="panneau-stat">
                {contenu}
                <bouton onClick={fermeturePopUp} className={"bouton-ferme-stat"}> Fermer </bouton>
            </div>, document.body) : ""
        }
    </div>);
}

export default PanneauStat;

const ContenuChargeay = () => {
    const statJoueur = useSelector(state => state.statistique.statJoueur);
    const idJoueur = useSelector(state => state.statistique.idJoueursActuel);

    let nbrMatchGagner = statJoueur.matchsGagnays !== undefined ? statJoueur.matchsGagnays.length : 0;
    let nbrMatchPerdu = statJoueur.matchsPerdus !== undefined ? statJoueur.matchsPerdus.length : 0;
    const pourcentageVictoire = Number(nbrMatchGagner) / (Number(nbrMatchPerdu) + Number(nbrMatchGagner)) * 100;
    const pourcentage = pourcentageVictoire.toFixed(2);
    const moyenneVerre = calculMoyenVerre(nbrMatchGagner, statJoueur.matchsPerdus);
    const moyenneScore = calculMoyenSCore(statJoueur.score, nbrMatchGagner + nbrMatchPerdu);

    const matchTrieParDate = trieTabParDate(statJoueur.matchsGagnays, statJoueur.matchsPerdus, 10);

    let classementAfficher; 
    if(statJoueur.classement === 1){
       classementAfficher = (<img src="https://cdn-icons-png.flaticon.com/128/2583/2583344.png" loading="lazy" alt="médaille " title="médaille " width="30" height="30"/>);

    } else if (statJoueur.classement === 2){
        classementAfficher = (<img src="https://cdn-icons-png.flaticon.com/128/2583/2583319.png" loading="lazy" alt="médaille " title="médaille " width="30" height="30"></img>);
    } else if (statJoueur.classement === 3) {
        classementAfficher = (<img src="https://cdn-icons-png.flaticon.com/128/2583/2583434.png" loading="lazy" alt="médaille " title="médaille " width="30" height="30"></img>);
    } else {
        classementAfficher = ("#" + statJoueur.classement);
    }

    return (
        <>
            <div className="titre-classement-stat">{classementAfficher}<h2>{statJoueur.nomJoueur} ({statJoueur.score} points)</h2></div>
            
            <div className="grid-stat">

                <div className="premier-stat">

                    <h4> Ratio victoires/ Defaites</h4>
                    <div className="ratio">
                        <Donut victoire={nbrMatchGagner} defaite={nbrMatchPerdu} pourcentage={pourcentage + ' %'} />
                    </div>
                    <span> {nbrMatchGagner + nbrMatchPerdu} matchs joués</span>
                    <span> {nbrMatchGagner}/{nbrMatchPerdu} (V/D)</span>

                </div>
                <div className="deuxieme-stat">

                    <h4> Moyenne de verres par match</h4>
                    <div className="moyen-verre">
                        <Donut victoire={moyenneVerre} defaite={10 - moyenneVerre} pourcentage={moyenneVerre} />
                    </div>

                    <span> Nombre de verres moyen par match {moyenneVerre}</span>
                </div>

                <div className="troisieme-stat">

                    <h4> Score moyen par match</h4>
                    <div className="moyenne-verre">
                        <Donut victoire={moyenneScore} defaite={20 - moyenneScore} pourcentage={moyenneScore} />
                    </div>
                </div>
                <div className="quatrieme-stat">
                    <h4>Scores des derniers matchs</h4>
                    <div className="match-precedent">
                        <MatchPrecedent dernierMatch={matchTrieParDate} idJoueur={idJoueur} />
                    </div>
                </div>
            </div>

        </>
    )
} 