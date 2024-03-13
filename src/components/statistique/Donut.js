import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { COULEUR_BORDER_DEFAITE, COULEUR_BORDER_VICTOIRE, COULEUR_DEFAITE, COULEUR_VICTOIRE } from '../../constantes/constantesStat';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Donut({ victoire, defaite, pourcentage }) {

  const data = {
    //labels: [ defaite + ' défaites', victoire + ' victoires'],
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [defaite, victoire],
        backgroundColor: [
          COULEUR_DEFAITE,
          COULEUR_VICTOIRE,
        ],
        borderColor: [
          COULEUR_BORDER_DEFAITE,

          COULEUR_BORDER_VICTOIRE,
        ],
        borderWidth: 1,
      },
    ],
  };

  const option = {
    aspectRatio: 1
  }

  return (<>  <div className="pourcentage-centre">
    <span className="pourcentage">  {pourcentage}</span></div>
    <div className="donut">
      <Doughnut data={data} width={'400px'} height={'400px'} options={option} className='donut-wr' />
    </div></>);
}