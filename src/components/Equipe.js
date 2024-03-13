import { useDispatch, useSelector } from "react-redux";
import { ajouterJoueur } from "../redux";
import AjouterJoueur from "./AjouterJoueurs";
import { modifierScore } from "../redux";

export const Equipe = (props) => {
    const equipe = props.gagnante ? "equipeGagnante" : "equipePerdante";
    const joueurParEquipe = useSelector((state) => state.match[equipe].joueurs);
    const listeJoueur = [];
    const dispatch = useDispatch();

    const changeScore = (e) => {
        const score = e.target.value;
        const scoreInt = Number(score)
        dispatch(modifierScore({score: scoreInt}))
    }

    for (let i = 0; i <= joueurParEquipe; i++) {
        listeJoueur.push(<AjouterJoueur joueurs={props.joueurs} />)
    };

    //<div className="fond"></div>
    const img = props.gagnante ? 
    (<img className="img-vd" src="https://cdn-icons-png.flaticon.com/128/625/625398.png" loading="lazy" alt="coupe " title="coupe " width="64" height="64"></img>) :
    (<img className="img-vd" src="https://cdn-icons-png.flaticon.com/128/7014/7014699.png" loading="lazy" alt="caca " title="caca " width="64" height="64"></img>);


    const soustritre = props.gagnante ? <h3>Equipe gagnate</h3> : <h3>Equipe perdante</h3>;
    return (
        <div className={equipe}>
            {img}
            <div className={"contenu-equipe "}>
                {soustritre}
                <AjouterJoueur joueurs={props.joueurs} gagnante={props.gagnante} index={0}/>
                <AjouterJoueur joueurs={props.joueurs} gagnante={props.gagnante} index={1}/>
                <AjouterJoueur joueurs={props.joueurs} gagnante={props.gagnante} index={2}/>
                <AjouterJoueur joueurs={props.joueurs} gagnante={props.gagnante} index={3}/>
                {!props.gagnante && <div className="score">
                <select className="element" onChange={changeScore}>
                <option className="score" selected disabled hidden>Saisir score</option>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                </select>
                </div>}
            </div>

        </div>);
}