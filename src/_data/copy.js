// Placeholder content shared by pages and the gallery. Figures only from the isat-5 brief
// (school roster aggregates, archive); school facts marked "non vérifié"; unknowns TBD. No roster row.
const tbd = (t = "TBD") => `<span class="tbd">${t}</span>`;
const unv = (t = "non vérifié") => `<span class="unv">${t}</span>`;
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export default {
  figuresHome: [
    { cls: "b4 inv", label: "Diplômés · promos 1996–2022", figure: "2 672", text: "Cinq programmes, d'après le fichier de l'école (agrégat). Promos de 29 diplômés en 1996 à 180 en 2022." },
    { cls: "b2", label: "Pays hors France", figure: "36", text: "≈ 15 % des anciens localisés vivent à l'étranger." },
    { cls: "b2", label: "Prêts à relayer une offre", figure: "707", small: "21 %", text: "souhaitent être contactés pour des offres d'emploi." },
    { cls: "b2 dark", label: "Volontaires formateurs", figure: "327", small: "9,6 %", text: "animeraient une formation." },
    { cls: "b2", label: "Équipe", figure: "6", text: `bénévoles au cœur de l'association. Rôles ${tbd()}` },
    { cls: "b6", label: "Diplômés par programme · 1996–2022", bars: [
      { k: "ISAT", w: 100, v: "2243" }, { k: "IRIT", w: 9.7, v: "217" }, { k: "AESM", w: 4.4, v: "98" },
      { k: "Master Meeting", w: 3.7, v: "84" }, { k: "GI Auxerre", w: 1.3, v: "30" } ],
      text: `Source : fichier de l'école, agrégats uniquement. Secteurs et employeurs : ${tbd()} (enquête anciens à venir).` },
  ],
  figuresEmploi: [
    { cls: "b2 inv", label: "Anciens prêts à recevoir des offres", figure: "707", text: "21 % du fichier" },
    { cls: "b2", label: "Diplômés depuis 1996", figure: "2 672", text: "cinq programmes" },
    { cls: "b2", label: "En poste à 6 mois", figure: "83", small: "%", text: unv("source ancienne, non vérifié") },
  ],
  figuresEn: [
    { cls: "b2 inv", label: "Graduates 1996–2022", figure: "2,672" },
    { cls: "b2", label: "Countries besides France", figure: "36" },
    { cls: "b2", label: "Open to job offers", figure: "707" },
  ],
  figuresAnnuaire: [
    { cls: "b2", label: "Anciens localisés", figure: "49", small: "%" },
    { cls: "b2 inv", label: "À l'étranger", figure: "≈15", small: "%" },
    { cls: "b2", label: "Pays hors France", figure: "36", text: "En tête : Allemagne, Belgique, Royaume-Uni, Suisse, Espagne, États-Unis, Canada." },
  ],
  missions: [
    { cls: "b3", label: "01", title: "Rencontrer les étudiants", text: "Au moins une rencontre par an avec les 4e et 5e années." },
    { cls: "b3", label: "02", title: "Fournir des intervenants", text: "Des anciens pour les conférences organisées par les enseignants." },
    { cls: "b2", label: "03", title: "Relayer l'école", text: "Le canal privilégié de l'école vers ses anciens." },
    { cls: "b2", label: "04", title: "Relayer les offres", text: "Offres d'emploi et de stage transmises au réseau." },
    { cls: "b2", label: "05", title: "Tenir le fichier", text: "La liste des anciens, à jour, côté administratif." },
  ],
  portraits: [
    { chip: "Promo TBD · ISAT", name: "Prénom N.", text: `Ingénieure essais, secteur TBD. ${lorem}` },
    { chip: "Promo TBD · AESM", name: "Prénom N.", text: `Chef de projet, à l'étranger. ${lorem}` },
    { chip: "Promo TBD · IRIT", name: "Prénom N.", text: `Responsable méthodes. ${lorem}` },
    { chip: "Promo TBD · ISAT", name: "Prénom N.", text: `Parcours ${tbd()}. ${lorem}` },
  ],
  team: [1, 2, 3, 4, 5, 6].map((n) => ({ name: "Prénom N.", role: "Rôle TBD", photo: `membre ${n}` })),
  programmes: [
    { chip: "ISAT", figure: "2243", text: "Cycle ingénieur, sous statut étudiant ou apprenti." },
    { chip: "IRIT", figure: "217", text: `Programme au fichier ; intitulé exact à préciser. ${tbd()}` },
    { chip: "AESM", figure: "98", text: `Master international enseigné en anglais. ${unv()}` },
    { chip: "Master Meeting", figure: "84", text: `Programme au fichier ; contenu à préciser. ${tbd()}` },
    { chip: "GI Auxerre", figure: "30", text: `Site d'Auxerre. ${unv()}` },
    { chip: "Total", figure: "2 672", text: "diplômés au fichier, promos 1996–2022.", tinted: true },
  ],
  timeline: [
    { yr: "1991", title: "L'école ouvre à Nevers", text: `Date issue de sources publiques. ${unv()}`, photo: "Nevers, bâtiment de l'école" },
    { yr: "1996", title: "Première promo au fichier", text: `29 diplômés, le début du réseau. Fondation de l'association : ${tbd()}`, photo: "Première promotion" },
    { yr: "2005–11", title: "Le réseau grandit", text: `De 70 à 90 diplômés par promo. ${lorem}`, photo: "Atelier, années 2000" },
    { yr: "2012–19", title: "Cap sur l'international", text: `90 à 122 diplômés par promo ; le master AESM, enseigné en anglais. ${unv()}`, photo: "Promotion internationale" },
    { yr: "2022", title: "180 diplômés", text: `La plus grande promo du fichier. ${lorem}`, photo: "Remise des diplômes" },
    { yr: "Demain", title: "Relancer l'association", text: `Un site, un annuaire opt-in, des rencontres avec les étudiants. ${lorem}`, photo: "Rencontre étudiants" },
  ],
  // Placeholder Q&A: this round is about the accordion's feel (trait-feedback, answer 5).
  faq: [
    { q: "Qui peut adhérer à l'association ?", a: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Conditions exactes ${tbd()}` },
    { q: "Comment figurer dans l'annuaire ?", a: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { q: "Comment proposer une offre d'emploi ou de stage ?", a: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
    { q: "L'association est-elle la même que celle d'ingenieurs-isat.com ?", a: `Excepteur sint occaecat cupidatat non proident. Réponse ${tbd()}` },
    { q: "Comment intervenir auprès des étudiants ?", a: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium." },
  ],
};
