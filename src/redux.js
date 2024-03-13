import { configureStore, createSlice } from "@reduxjs/toolkit";

const storeInitale = {
    equipeGagnante: {
        joueurs: [-1, -1, -1, -1],
        score: 20,
    },
    equipePerdante: {
        joueurs: [-1, -1, -1, -1],
        score: undefined,
    },
    joueursNonSelec: []
}

const equipeJouant = createSlice({
    name: 'match',
    initialState: storeInitale,
    reducers: {
        ajouterJoueursDansEquipe: (state, action) => {
            const { equipe, id, index } = action.payload;
            state[equipe].joueurs[index] = id;
        },
        supprimerJoueur: (state, action) => {
            //const indexASuppre = 1;
            //const equipe = "equipe1";
            const indexASuppre = action.payload.index;
            const equipe = action.payload.equipe;
            state[equipe].joueurs.splice(indexASuppre);
        },
        reinitialiserEtat: () => storeInitale,
        modifierScore: (state, action) => {
            const score = action.payload.score;
            state.equipePerdante.score = score;
        },
    }
}

)

const storeInitale1 = {
    tableau: [],
    etatChargement: 0
}


const tableauScore = createSlice({
    name: 'tableauScore',
    initialState: storeInitale1,
    reducers: {
        modifClassement: (state, action) => {
            console.log("modifClassement")
            console.log(action.payload.data)
            //action.payload.map((j)=>state.tableau.push(j));
            state.tableau = [...action.payload.data]
        },
        chargerEtatChargement: (state, action) => {
            state.etatChargement = action.payload.etatChargement;
            console.log("chargerEtatChargement")
        }
    }
}
)

const storeInitialStatistique = {
    afficherPopUpStat: false,
    idJoueursActuel: undefined,
    statJoueur: {
        matchsGagnays: [],
        matchsPerdus: []
    },
    etatChargementStat: 0
    //id : { stat: {}}
};

const statistique = createSlice({
    name: "statistique",
    initialState: storeInitialStatistique,
    reducers: {
        afficherTableau: (state, action) => {
            const { afficher, id } = action.payload;
            state.afficherPopUpStat = afficher;
            state.idJoueursActuel = id;
        },
        stockerId: (state, action) => {

        },
        stockStatistiqueJoueurs: (state, action) => {
            console.log("---------------")
            console.log(action.payload.data)
            state.statJoueur = action.payload.data;
        },
        reinitaliseStat: (state, action) => {
            console.log("ca passe")
            state.afficherPopUpStat = false;
            state.idJoueursActuel = undefined;
            state.etatChargementStat = 0;
        },
        modifEtatChargementStat: (state, action) => {
            console.log("ca passe")
            state.etatChargementStat = action.payload.etatChargement;
        }
    }
})

export const { ajouterJoueur, ajouterJoueursDansEquipe, supprimerJoueur, reinitialiserEtat, donnerGagnant, modifierScore } = equipeJouant.actions;
export const { modifClassement, chargerEtatChargement } = tableauScore.actions;
export const { afficherTableau, stockStatistiqueJoueurs, reinitaliseStat, modifEtatChargementStat } = statistique.actions;

export const store = configureStore({
    reducer: {
        match: equipeJouant.reducer,
        tableauScore: tableauScore.reducer,
        statistique: statistique.reducer
    }
})