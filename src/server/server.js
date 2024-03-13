
var cors = require('cors')
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { number } = require('yargs');

const uri = "mongodb+srv://thibdev:NnoQkWiZWWSvTo44@cluster0.wyapoo1.mongodb.net/databeerpong?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
const port = 3000;

app.use(bodyParser.json());

//usename thibdev
//mdp NnoQkWiZWWSvTo44

let datasUsers = [];


const historiqueMatch = new mongoose.Schema({
    equipeGagnante: {
        joueurs: Array,
        score: Number
    },
    equipePerdante: {
        joueurs: Array,
        score: Number
    },
    date: { type: Date, default: Date.now() }
});
const matchModel = mongoose.model('historiquematchs', historiqueMatch);

const joueurSchema = new mongoose.Schema({
    _id: String,
    nom: String,
    score: Number
}, { collection: 'joueur' });
const joueurModel = mongoose.model('joueur', joueurSchema);



//async majScore(equipe1, equipe2){
/*
let nouveauTableau = [];
datas.map((joueur) => {
    let joueurTrouvay = false;
    let joueurModif = { ...joueur };
    //equipe1
    for (let i = 0; i < equipe1.joueurs.length && !joueurTrouvay; i++) {
        console.log("equipe1")
        if (joueur.id == equipe1.joueurs[i].id) {
            console.log("meme id equipe 1")
            joueurModif = { ...joueur, score: joueur.score + equipe1.score };
            joueurTrouvay = true;
        }
    }
    //equipe 2
    for (let i = 0; i < equipe2.joueurs.length && !joueurTrouvay; i++) {
        console.log("equipe1")
        if (joueur.id == equipe2.joueurs[i].id) {

            console.log("meme id equipe 2")
            joueurModif = { ...joueur, score: joueur.score + equipe2.score };
            joueurTrouvay = true;
        }
    }
    nouveauTableau.push(joueurModif)
});
return nouveauTableau;
*/
//}

const stockerDansMongoDb = (match) => {

};

app.listen(port, () => {
    console.log("le serveur ecoute sur le port " + port);
});

app.use(cors());

app.get('/', async (req, res) => {
    try {
        await mongoose.connect(uri);
        const recherche = await joueurModel.find({});
        await mongoose.connection.close();
        datasUsers = [...recherche];
        res.json(recherche);
    } catch (e) {
        console.log(e);
    }
});



app.get('/statistique/:id', async (req, res) => {
    try {
        await mongoose.connect(uri);
        const idJoueurs = req.params.id;
        const idJoueursNumber = Number(idJoueurs);
        const rechecherMatchGagnerJoueur = await matchModel.find({ 'equipeGagnante.joueurs': idJoueursNumber });
        const rechecherMatchPerduJoueur = await matchModel.find({ 'equipePerdante.joueurs': idJoueursNumber });
        await mongoose.connection.close();
        const jsonFinal = { message: 'Statistique recup', idJoueurs: idJoueurs, matchsGagnays: rechecherMatchGagnerJoueur, matchsPerdus: rechecherMatchPerduJoueur }
        res.status(201).json(jsonFinal);
    } catch (e) {
        console.log(e);
    }
});



app.post('/match', async (req, res) => {
    try {
        const match = req.body;
        await mongoose.connect(uri);
        const nouveauMatch = new matchModel({
            equipeGagnante: match.equipeGagnante,
            equipePerdante: match.equipePerdante,
        });
        await nouveauMatch.save();
        for (let i = 0; i < match.equipeGagnante.joueurs.length; i++) {

            if (match.equipePerdante.joueurs[i] !== -1) {
                let joueurDuMatch = await joueurModel.findById(match.equipeGagnante.joueurs[i]).exec();
                joueurDuMatch.score = match.equipeGagnante.score + joueurDuMatch.score;
                await joueurDuMatch.save();
            }
        };
        console.log("Equipe gagnante rentrée")
        for (let i = 0; i < match.equipePerdante.joueurs.length; i++) {
            if (match.equipePerdante.joueurs[i] !== -1) {
                let joueurDuMatch = await joueurModel.findById(match.equipePerdante.joueurs[i]).exec();
                joueurDuMatch.score = match.equipePerdante.score + joueurDuMatch.score;
                await joueurDuMatch.save();
            }
        };
        console.log("Equipe perdante rentrée")
        const nouveauClassement = await joueurModel.find({});
        await mongoose.connection.close();
        console.log("le nouveau classement est le suivant")
        console.log(nouveauClassement)
        const jsonFinal = { message: 'un nouveau match a été ajouté.', nouveauClassement: nouveauClassement };
        res.status(201).json(jsonFinal);
        console.log("Données envoyé")
    } catch (e) {
        console.log(e)
    }
});