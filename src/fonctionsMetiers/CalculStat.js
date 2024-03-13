export function calculMoyenVerre(nbrVic, tabMatchPerdu) {
    const pointVictoire = nbrVic * 10;
    const nbrMatch = nbrVic + tabMatchPerdu.length;
    let pointDef = 0;
    let nbrScoreUndefined = 0;
    tabMatchPerdu.map((match) => {
        if (match.equipePerdante.score) {
            pointDef += match.equipePerdante.score;
        } else {
            nbrScoreUndefined += 1;
        }
    });
    let pointDefRecalculer = pointDef;

    if (nbrScoreUndefined > 0) {
        const moyenRecalcul = pointDef / (tabMatchPerdu.length - nbrScoreUndefined);
        pointDefRecalculer = moyenRecalcul * tabMatchPerdu.length;
    }
    const moyenne = (pointVictoire + pointDefRecalculer) / nbrMatch;
    return moyenne.toFixed(2);
}

export function calculMoyenSCore(score, nombreMatch) {
    const moyen = score / nombreMatch;
    return moyen.toFixed(2);
}

export function trieTabParDate(tabA, tabB, nbrMatch) {
    const concatTab = tabA.concat(tabB);
    const tabFiltre = concatTab.filter((a)=> a.date !== undefined);
    const tabTriay =  tabFiltre.sort((a, b) =>  new Date(b.date) - new Date(a.date));
    const tabBonNbrDeMatch = tabTriay.slice(0, nbrMatch)
    return tabBonNbrDeMatch;
}