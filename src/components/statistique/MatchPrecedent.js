import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { COULEUR_BORDER_DEFAITE, COULEUR_BORDER_VICTOIRE, COULEUR_DEFAITE, COULEUR_VICTOIRE } from '../../constantes/constantesStat';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



export function MatchPrecedent({ dernierMatch, idJoueur }) {


    const dernierMatchReverse = dernierMatch.reverse();
    let optionsDate = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };

    let couleur1 = [];

    let dataJoueur = [];
    let dataAdversaire = [];
    let borderColor = [];
    const dateDernierMatch = dernierMatchReverse.map((match) => {

        const gagne = COULEUR_VICTOIRE;
        const perd = COULEUR_DEFAITE;
        const borderPerd = COULEUR_BORDER_DEFAITE;
        const borderGagner = COULEUR_BORDER_VICTOIRE;

        //si gagne
        if (match.equipeGagnante.joueurs.indexOf(Number(idJoueur)) !== -1) {
            dataJoueur.push(10);
            dataAdversaire.push(match.equipePerdante.score * -1);
            couleur1.push(gagne);
            borderColor.push(borderGagner);
            //si perd
        } else {
            dataJoueur.push(match.equipePerdante.score);
            couleur1.push(perd);
            borderColor.push(borderPerd);
        }



        return new Date(match.date).toLocaleString('fr-FR', optionsDate)
    });


    const DataSet = [];
    const options = {
        plugins: {
            title: {
                display: false,
            },

            legend: {
                display: false,

            },
            tooltip: {
                bodyColor: 'white'
              },
            labels: {
                fontColor: "white",
                fontSize: 18
            }
        
        },
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
        },
         

        labels: {
            fontColor: "white",
            fontSize: 18
        },
        scales: {
            x: {
                stacked: true,
                fontColor: 'white',

                ticks: { color: 'white'},
                grid:{
                    display: false
                }
            },
            y: {
                grid:{
                    display: false
                },
                stacked: true,
                max: 10,
                min: 0,
                fontColor: 'white',
                
                    ticks: { color: 'white'}
                
            
            }
        },
    };

    const labels = dateDernierMatch;
    //const labels = dateDernierMatch;

    const data = {
        labels,
        datasets: [
            {
                data: dataJoueur,
                backgroundColor: couleur1,
                stack: 'Stack 0',

                borderColor: borderColor,
                borderWidth: 1,
            },
            /* {
                 label: 'Adverdaire',
                 data: dataAdversaire,
                 backgroundColor: 'rgb(100, 99, 250)',
                 stack: 'Stack 0',
             },*/
        ],
    };
    return <Bar options={options} data={data} />;
}
