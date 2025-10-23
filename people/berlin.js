const people = [
  {
    name: 'Malik Piara',
    headline: 'Product Enablement at Cobblestone',
    photo: '/malik.jpeg',
    links: {
      linkedin: 'malikpiara',
      github: 'malikpiara',
      x: 'malikpiara',
      website: 'moonwith.com',
    },
  },
  {
    name: 'Marco Silva',
    headline: 'Sr. Engineering Manager and Ambassador for London',
    photo: '/marco.jpeg',
    links: {
      linkedin: 'marcodasilva',
      github: 'igama',
      x: 'igama',
    },
  },
  {
    name: 'Ana Gaspar',
    headline: 'Head of Department at Volkswagen Group IT Solutions',
    photo: '/anaGaspar.jpeg',
    links: {
      linkedin: 'ana-gaspar10',
      github: '',
      x: '',
      website: '',
    },
  },
  {
    name: 'Ana Sampaio',
    headline: 'Engineering Manager at Midnite and Ambassador for London',
    photo: '/anaSampaio.png',
    links: {
      linkedin: 'anaisampaio',
      github: '',
      x: '',
      website: '',
    },
  },
  {
    name: 'João Colaco de Freitas',
    headline: 'Head of Product at Banxware',
    photo: '/joaoColaco.jpeg',
    links: {
      linkedin: 'joao-colaco-de-freitas-jcf',
      github: '',
      x: '',
      website: '',
    },
  },
  {
    name: 'Jorge Miguel Fonseca',
    headline: 'CMO & Partner at BF Grupo',
    photo: '/jorgeMiguel.jpeg',
    links: {
      linkedin: 'jorgemiguelfonseca',
      github: '',
      x: '',
      website: '',
    },
  },
  {
    name: 'Diogo Guerner',
    headline: 'CEO at Naviu and Ambassador for Berlin',
    photo: '/diogo.jpeg',
    links: {
      linkedin: 'diogoguerner',
      github: '',
      x: '',
      website: '',
    },
  },
  {
    name: 'Dinarte Jesus',
    headline: 'Co-Founder at Athleads and Ambassador for Zurich',
    photo: '/dinarte.jpeg',
    links: {
      linkedin: 'jdinartejesus',
      github: 'jdinartejesus',
      x: '',
      website: '',
    },
  },
  {
    name: 'Paulo Truta',
    headline: 'Product Engineer at Kitchen Stories',
    photo: '/pauloTruta.jpeg',
    links: {
      linkedin: 'paulotruta',
      github: 'paulotruta',
      x: '',
      website: '',
    },
  },
  {
    name: 'Nuno Coelho Santos',
    headline: 'Product Designer at WhatsApp',
    photo: '/nuno.jpeg',
    links: {
      linkedin: 'nunosans',
      github: 'nunosans',
      x: '',
      website: '',
    },
  },
];

const sortedPeople = [...people].sort((firstPerson, secondPerson) => {
  return firstPerson.name < secondPerson.name ? -1 : 1;
});

export { sortedPeople };
