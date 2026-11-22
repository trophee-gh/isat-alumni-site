// Outbound links. A value starting with "TBD" renders as "bientôt disponible", never as a link.
export default {
  nom: "Association des ingénieurs de l'ISAT",
  // Where "Rejoindre" points (header button F1, floating bar F2). The Rejoindre page (F11) is not built yet: until it
  // is, the home's Rejoindre section. When F11 lands, this one line moves to the page.
  rejoindre: "/#rejoindre",
  // Sections with no data yet are hidden, not shown as "à venir" (F5). One switch per section: set it to true when
  // the section has its content and it comes back (its hero hub link and the section numbers follow).
  show: {
    profils: false, // Accueil: alumni profiles (portraits), each with the person's consent
    parcours: false, // Les ingénieurs ISAT: portraits and quote
    carrieres: false, // Les ingénieurs ISAT: sectors, employers, first job (a survey of alumni)
    actualites: false, // Accueil: the newsletter's articles, for the news block (F12) when it is built
  },
  liens: {
    // Candidate from the current site, legacy URL format, unverified: http://www.linkedin.com/grps/isat-alumni-group-2598
    linkedin: "TBD: page LinkedIn de l'association",
    helloasso: "TBD: page HelloAsso de l'association",
    brevo: "TBD: formulaire d'inscription Brevo",
    emploi: "mailto:emploi@alumni-isat.fr",
    contact: "mailto:contact@alumni-isat.fr",
  },
};
