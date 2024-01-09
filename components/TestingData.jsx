export const mySchedule = {
   [new Date("2024-01-08 00:00:00")]: [
      {
         id: 0,
         therapy: "Shoulder impingement",
         therapyCode: "4GH8J",
         datetime: new Date ("2024-01-09 17:00"),
         location: "Electrotherapy room",
         completedSessions: 7,
         totalSessions: 11,
         therapist: "Ante Pavlović",
         notes: "Najbolja sesija ikada"
      },
      {
         id: 1,
         therapy: "Shoulder impingement",
         therapyCode: "4GH8J",
         datetime: new Date ("2024-01-11 11:00"),
         location: "Electrotherapy room",
         completedSessions: 8,
         totalSessions: 11,
         therapist: "Ante Pavlović",
         notes: ""
      }
   ],
   [new Date("2024-01-15 00:00:00")]: [
      {
         id: 0,
         therapy: "Shoulder impingement Shoulder impingement Shoulder impingement",
         therapyCode: "4GH8J",
         datetime: new Date ("2024-01-15 09:00"),
         location: "Electrotherapy room",
         completedSessions: 9,
         totalSessions: 11,
         therapist: "Ante Pavlović",
         notes: "Pacijent je odradio normalno i dobro... ovaj put"
      },
      {
         id: 1,
         therapy: "Shoulder impingement",
         therapyCode: "4GH8J",
         datetime: new Date ("2024-01-17 17:00"),
         location: "Electrotherapy room",
         completedSessions: 10,
         totalSessions: 11,
         therapist: "Ante Pavlović",
         notes: "Pacijent je odradio normalno i dobro."
      },
      {
         id: 2,
         therapy: "Shoulder impingement",
         therapyCode: "4GH8J",
         datetime: new Date ("2024-01-19 17:00"),
         location: "Electrotherapy room",
         completedSessions: 11,
         totalSessions: 11,
         therapist: "Ante Pavlović",
         notes: ""
      }
   ]
}

export const therapistSchedule = {
   [new Date("2024-01-01 00:00:00")]: [
      {
         id: 0,
         therapy: "Shoulder impingement Shoulder impingement Shoulder impingement",
         datetime: new Date ("2024-01-01 09:00"),
         location: "Electrotherapy room",
         completedSessions: 4,
         totalSessions: 11,
         patient: {
            name: "Karlo",
            surname: "Vrančić",
            "e-mail": "karlo.vrancic@medbay.hr",
            address: "Ulica Gustava Krkleca 12, Zagreb",
            dob: new Date("10/12/2023"),
            phone: "091111111",
            mbo: "12345678901",
            code: "#User452"
         },
         notes: "Pacijent je odradio normalno i dobro... ovaj put"
      },
      {
         id: 1,
         therapy: "Shoulder impingement",
         datetime: new Date ("2024-01-03 17:00"),
         location: "Electrotherapy room",
         completedSessions: 5,
         totalSessions: 11,
         patient: {
            name: "Karlo",
            surname: "Vrančić",
            "e-mail": "karlo.vrancic@medbay.hr",
            address: "Ulica Gustava Krkleca 12, Zagreb",
            dob: new Date("10/12/2023"),
            phone: "091111111",
            mbo: "12345678901",
            code: "#User452"
         },
         notes: "Pacijent je odradio normalno i dobro. Odlična sesija."
      },
      {
         id: 2,
         therapy: "Shoulder impingement",
         datetime: new Date ("2024-01-05 17:00"),
         location: "Electrotherapy room",
         completedSessions: 6,
         totalSessions: 11,
         patient: {
            name: "Karlo",
            surname: "Vrančić",
            "e-mail": "karlo.vrancic@medbay.hr",
            address: "Ulica Gustava Krkleca 12, Zagreb",
            dob: new Date("10/12/2023"),
            phone: "091111111",
            mbo: "12345678901",
            code: "#User452"
         },
         notes: "Vrlo kvalitetna sesija."
      }
   ],
   [new Date("2024-01-08 00:00:00")]: [
      {
         id: 0,
         therapy: "Shoulder impingement",
         datetime: new Date ("2024-01-09 17:00"),
         location: "Electrotherapy room",
         completedSessions: 7,
         totalSessions: 11,
         patient: {
            name: "Tea",
            surname: "Ćetojević-Tisaj",
            "e-mail": "karlo.vrancic@medbay.hr",
            address: "Unska ulica 3, Zagreb",
            dob: new Date("10/12/2003"),
            phone: "091222222",
            mbo: "23456789012",
            code: "#User453"
         },
         notes: "Vrlo dobra sesija"
      },
      {
         id: 1,
         therapy: "Shoulder impingement",
         datetime: new Date ("2024-01-11 11:00"),
         location: "Cryotherapy machine",
         completedSessions: 8,
         totalSessions: 11,
         patient: {
            name: "Ian",
            surname: "Balen",
            "e-mail": "karlo.vrancic@medbay.hr",
            address: "Obala kneza Trpimira 26, Zadar",
            dob: new Date("11/11/1987"),
            phone: "091333333",
            mbo: "34567890123",
            code: "#User454"
         },
         notes: ""
      }
   ]
}

export const testAvailableSessions = {                          // treba poslat therapy (code), broj dana, bit ce druga funkcija za reschedule al vraca isto u biti
   "09/01/2024": [8, 12, 13, 15, 18],
   "10/01/2024": [10, 14, 16, 17, 19],
   "11/01/2024": [9, 11, 12, 14, 15, 17, 19],
   "12/01/2024": [10, 12, 13, 14, 17, 18, 19],
   "15/01/2024": [8, 9, 10, 12, 13, 14, 17, 18, 19],
   "17/01/2024": [9, 11, 13, 14, 16, 17, 19],
   "18/01/2024": [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
   "19/01/2024": [9, 11, 13, 14, 16, 17, 19]
}

export const therapies = {
   "head": [],
   "shoulder": [
      {
         name: "Shoulder impingement",
         code: "#4JG5E",
         numberOfSessions: 3
      },
      {
         name: "Shoulder tendon injury",
         code: "#56JG3",
         numberOfSessions: 5
      },
      {
         name: "Post operation shoulder recovery",
         code: "#43GE4",
         numberOfSessions: 4
      },
      {
         name: "Shoulder Impingement 2",
         code: "#4JF9F",
         numberOfSessions: 5
      },
      {
         name: "Broken shoulder",
         code: "#4JU5L",
         numberOfSessions: 2
      }
   ],
   "arm": [
      {
         name: "Elbow impingement",
         code: "#4JG5F",
         numberOfSessions: 4
      },
      {
         name: "Elbow tendon injury",
         code: "#56JG6",
         numberOfSessions: 3
      },
      {
         name: "Post operation elbow recovery",
         code: "#43HE4",
         numberOfSessions: 5
      },
   ],
   "hand": [],
   "upper torso": [],
   "lower torso": [],
   "leg": [],
   "foot": [],
   "any": [
      {
         name: "Full body recovery",
         code: "#3G67K",
         numberOfSessions: 4
      }
   ]
}

export const myTherapies = [
   {
      id: 0,
      name: "Shoulder impingement",
      code: "#4JG5E",
      "date started": new Date("2023-10-27"),
      "date finished": new Date("2023-11-21"),
      therapist: "Ante Petrović",               // bit ce odvojeno ime prezime
      location: "Electrotherapy room",
      sessions: [
         {
            id: 1,
            datetime: new Date("2024-01-01 09:00"),
            notes: "Pacijent je odradio normalno i dobro... ovaj put"
         },
         {
            id: 2,
            datetime: new Date("2024-01-02 11:00"),
            notes: "Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro."
         },
         {
            id: 3,
            datetime: new Date("2024-01-04 15:00"),
            notes: "Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro.Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro."
         },
         {
            id: 4,
            datetime: new Date("2024-01-05 13:00"),
            notes: "Pacijent odrađuje sve po planu"
         },
         {
            id: 5,
            datetime: new Date("2024-01-08 13:00"),
            notes: "Pacijent pokazuje odličan napredak"
         },
         {
            id: 6,
            datetime: new Date("2024-01-09 08:00"),
            notes: "Pacijentovo stanje se ubrzano poboljšava"
         },
         {
            id: 7,
            datetime: new Date("2024-01-10 16:00"),
            notes: ""
         },
         {
            id: 8,
            datetime: new Date("2024-01-12 19:00"),
            notes: ""
         }
      ]
   },
   {
      id: 1,
      name: "Post operation shoulder recovery",
      code: "#4JG5E",
      "date started": new Date("2023-10-28"),
      "date finished": new Date("2023-12-21"),
      therapist: "Josip Lončar",
      location: "Electrotherapy room",
      sessions: [
         {
            id: 1,
            datetime: new Date("2024-01-01 09:00"),
            notes: "Pacijent je odradio normalno i dobro... ovaj put"
         },
         {
            id: 2,
            datetime: new Date("2024-01-02 11:00"),
            notes: "Pacijent je odradio odličnp i fenomenalno."
         },
         {
            id: 3,
            datetime: new Date("2024-01-04 15:00"),
            notes: "Pacijentovo stanje se konstantno popravlja"
         },
         {
            id: 4,
            datetime: new Date("2024-01-05 13:00"),
            notes: "Pacijent je uspješno završio cijelu terapiju"
         }
      ]
   },
   {
      id: 2,
      name: "Shoulder impingement",
      code: "#4JG5E",
      "date started": new Date("2023-11-11"),
      "date finished": new Date("2023-11-28"),
      therapist: "Ivan Ivanovič",
      location: "Hydro Rehab Pool",
      sessions: [
         {
            id: 1,
            datetime: new Date("2024-01-01 09:00"),
            notes: "Pacijent je odradio normalno i dobro... ovaj put"
         },
         {
            id: 2,
            datetime: new Date("2024-01-02 11:00"),
            notes: "Pacijent je odradio normalno i dobro."
         },
         {
            id: 3,
            datetime: new Date("2024-01-04 15:00"),
            notes: "Odličan napredak"
         },
         {
            id: 4,
            datetime: new Date("2024-01-05 13:00"),
            notes: "Pacijent je terapiju završio na fenomenalan način"
         }
      ]
   },
   {
      id: 3,
      name: "Shoulder impingement",
      code: "#4JG5E",
      "date started": new Date("2023-12-01"),
      "date finished": new Date("2023-12-12"),
      therapist: "Stjepan Kovačević",
      location: "Cryo Recovery Room",
      sessions: [
         {
            id: 1,
            datetime: new Date("2024-01-01 09:00"),
            notes: "Pacijent je odradio normalno i dobro... ovaj put"
         },
         {
            id: 2,
            datetime: new Date("2024-01-02 11:00"),
            notes: "Pacijent je odradio normalno i dobro."
         },
         {
            id: 3,
            datetime: new Date("2024-01-04 15:00"),
            notes: "Odlična sesija"
         },
         {
            id: 4,
            datetime: new Date("2024-01-05 13:00"),
            notes: "Nevjerojatno kvalitenta sesija s pacijentom"
         }
      ]
   },
]

export const patients = [
   {
      id: 0,
      name: "Karlo",
      surname: "Vrančić",
      "e-mail": "karlo.vrancic@medbay.hr",
      address: "Ulica Gustava Krkleca 12, Zagreb",
      dob: new Date("10/12/2021"),
      phone: "0911111111",
      mbo: "12345678901",
      show: true,
      code: "#User452"
   },
   {
      id: 1,
      name: "Tea",
      surname: "Ćetojević-Tisaj",
      "e-mail": "tea.cetojevic-tisaj@medbay.hr",
      address: "Unska ulica 3, Zagreb",
      dob: new Date("10/16/2020"),
      phone: "091222222",
      mbo: "23456789012",
      show: true,
      code: "#User453"
   },
   {
      id: 2,
      name: "Ian",
      surname: "Balen",
      "e-mail": "ian.balen@medbay.hr",
      address: "Obala kneza Trpimira 26, Zadar",
      dob: new Date("10/14/2002"),
      phone: "091333333",
      mbo: "34567890123",
      show: false,
      code: "#User454"
   },
   {
      id: 3,
      name: "Nikola",
      surname: "Baretić",
      "e-mail": "nikola.baretic@medbay.hr",
      address: "Ulica Josipa Jelačića 4, Zagreb",
      dob: new Date("11/19/2007"),
      phone: "091444444",
      mbo: "45678901234",
      show: true,
      code: "#User455"
   },
   {
      id: 4,
      name: "Niko",
      surname: "Kaštelan",
      "e-mail": "niko.kastelan@medbay.hr",
      address: "Zelinska ulica 17, Zagreb",
      dob: new Date("10/20/2016"),
      phone: "091555555",
      mbo: "56789012345",
      show: true,
      code: "#User456"
   },
   {
      id: 5,
      name: "Ivan",
      surname: "Kordić",
      "e-mail": "ivan.kordic@medbay.hr",
      address: "Ulica Petra Krešimira 11, Zadar",
      dob: new Date("10/17/2010"),
      phone: "091666666",
      mbo: "67890123456",
      show: false,
      code: "#User457"
   },
   {
      id: 6,
      name: "Lovro",
      surname: "Dujić",
      "e-mail": "lovro.dujic@medbay.hr",
      address: "Ulica grada Vukovara 15, Zagreb",
      dob: new Date("01/01/2024"),
      phone: "091777777",
      mbo: "78901234567",
      show: true,
      code: "#User458"
   },
]

export const therapists = [
   {
      id: 0,
      name: "Karlo",
      surname: "Vrančić",
      "e-mail": "karlo.vrancic@medbay.hr",
      specialization: "Electrotherapist",
      "employed since": new Date("10/12/2023"),
      show: true
   },
   {
      id: 1,
      name: "Tea",
      surname: "Ćetojević-Tisaj",
      "e-mail": "tea.cetojevic-tisaj@medbay.hr",
      specialization: "Microwave therapist",
      "employed since": new Date("10/13/2022"),
      show: true
   },
   {
      id: 2,
      name: "Ian",
      surname: "Balen",
      "e-mail": "ian.balen@medbay.hr",
      specialization: "Traction therapist",
      "employed since": new Date("10/14/2019"),
      show: false
   },
   {
      id: 3,
      name: "Nikola",
      surname: "Baretić",
      "e-mail": "nikola.baretic@medbay.hr",
      specialization: "Electrotherapist",
      "employed since": new Date("10/15/2016"),
      show: true
   },
   {
      id: 4,
      name: "Niko",
      surname: "Kaštelan",
      "e-mail": "niko.kastelan@medbay.hr",
      specialization: "Microwave therapist",
      "employed since": new Date("10/16/2022"),
      show: true
   },
   {
      id: 5,
      name: "Ivan",
      surname: "Kordić",
      "e-mail": "ivan.kordic@medbay.hr",
      specialization: "Traction therapist",
      "employed since": new Date("10/17/2021"),
      show: false
   },
   {
      id: 6,
      name: "Lovro",
      surname: "Dujić",
      "e-mail": "lovro.dujic@medbay.hr",
      specialization: "Electrotherapist",
      "employed since": new Date("01/01/2024"),
      show: true
   },
]

export const testSessions = [
   {
      id: 1,
      therapy: "Shoulder impingement",
      datetime: new Date("2024-01-01 09:00"),
      notes: "Pacijent je odradio normalno i dobro... ovaj put"
   },
   {
      id: 2,
      therapy: "Severe shoulder fracture",
      datetime: new Date("2024-01-02 11:00"),
      notes: "Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro."
   },
   {
      id: 3,
      therapy: "Post operation shoulder recovery",
      datetime: new Date("2024-01-04 15:00"),
      notes: " Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro.Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro."
   },
   {
      id: 4,
      therapy: "Shoulder impingement",
      datetime: new Date("2024-01-05 13:00"),
      notes: "Vrlo dobra sesija"
   },
   {
      id: 5,
      therapy: "Severe shoulder fracture",
      datetime: new Date("2024-01-08 13:00"),
      notes: "Podosta solidna sesija"
   },
   {
      id: 6,
      therapy: "Post operation shoulder recovery",
      datetime: new Date("2024-01-09 08:00"),
      notes: "Nevjerojatno kvalitetna sesija s pacijentom koji odlično surađuje"
   },
   {
      id: 7,
      therapy: "Shoulder impingement",
      datetime: new Date("2024-01-10 16:00"),
      notes: ""
   },
   {
      id: 8,
      therapy: "Severe shoulder fracture",
      datetime: new Date("2024-01-12 19:00"),
      notes: ""
   }
]

export const resources = [
   {
      name: "Electrotherapy machine",
      capacity: 4,
      specialization: "Electrotherapist",
      description: "Electrotherapy is the use of electrical energy as a medical treatment. In medicine, the term electrotherapy can apply to a variety of treatments, including the use of electrical devices such as deep brain stimulators for neurological disease."
   },
   {
      name: "Gym",
      capacity: 2,
      specialization: "Physical therapist",
      description: "Physical therapy focuses on neck strengthening and range of motion exercises to alleviate pain and stiffness."
   },
   {
      name: "Cryotherapy machine",
      capacity: 6,
      specialization: "Cryotherapist",
      description: "Cryotherapy is used immediately after an acute sports injury to minimize swelling, numb the area, and provide pain relief while facilitating faster recovery."
   },
   {
      name: "Hydrotherapy pool",
      capacity: 1,
      specialization: "Hydrotherapist",
      description: "Hydrotherapy offers a supportive and buoyant environment for stroke survivors to work on regaining."
   }
]

export const adminTherapies = [
   {
      name: "Shoulder impingement",
      code: "#4JG5E",
      numberOfSessions: 3,
      resource: "Electrotherapy machine",
      description: "Electrotherapy is the use of electrical energy as a medical treatment. In medicine, the term electrotherapy can apply to a variety of treatments, including the use of electrical devices such as deep brain stimulators for neurological disease.",
      bodypart: "shoulder"
   },
   {
      name: "Shoulder tendon injury",
      code: "#56JG3",
      numberOfSessions: 5,
      resource: "Electrotherapy machine machine machine",
      description: "Electrotherapy is the use of electrical energy as a medical treatment. In medicine, the term electrotherapy can apply to a variety of treatments, including the use of electrical devices such as deep brain stimulators for neurological disease.",
      bodypart: "shoulder"
   },
   {
      name: "Post operation shoulder recovery",
      code: "#43GE4",
      numberOfSessions: 4,
      resource: "Cryotherapy machine",
      description: "Cryotherapy is used immediately after an acute sports injury to minimize swelling, numb the area, and provide pain relief while facilitating faster recovery.",
      bodypart: "shoulder"
   },
   {
      name: "Impingement 2 electric bogaloo",
      code: "#4JF9F",
      numberOfSessions: 5,
      resource: "Hydrotherapy pool",
      description: "Hydrotherapy offers a supportive and buoyant environment for stroke survivors to work on regaining.",
      bodypart: "shoulder"
   },
   {
      name: "Please scroll",
      code: "#Please",
      numberOfSessions: 2,
      resource: "Electrotherapy machine",
      description: "Electrotherapy is the use of electrical energy as a medical treatment. In medicine, the term electrotherapy can apply to a variety of treatments, including the use of electrical devices such as deep brain stimulators for neurological disease.",
      bodypart: "shoulder"
   },
   {
      name: "Elbow impingement",
      code: "#4JG5F",
      numberOfSessions: 4,
      resource: "Electrotherapy machine",
      description: "Electrotherapy is the use of electrical energy as a medical treatment. In medicine, the term electrotherapy can apply to a variety of treatments, including the use of electrical devices such as deep brain stimulators for neurological disease.",
      bodypart: "arm"
   },
   {
      name: "Elbow tendon injury",
      code: "#56JG6",
      numberOfSessions: 3,
      resource: "Hydrotherapy pool",
      description: "Hydrotherapy offers a supportive and buoyant environment for stroke survivors to work on regaining.",
      bodypart: "arm"
   },
   {
      name: "Post operation elbow recovery",
      code: "#43HE4",
      numberOfSessions: 5,
      resource: "Cryotherapy machine",
      description: "Cryotherapy is used immediately after an acute sports injury to minimize swelling, numb the area, and provide pain relief while facilitating faster recovery.",
      bodypart: "arm"
   }
]

export const adminSessions = [
      {
         name: "Rotator cuff tear",
         therapist: "Ante Petrović",
         patient: "Niko Kaštelan"
      },
      {
         name: "Shoulder impingement",
         therapist: "Ivan Slamnig",
         patient: "Karlo Vrančić"
      },
      {
         name: "Tendon injury",
         therapist: "Mirko Mirković",
         patient: "Lovro Dujić"
      },
      {
         name: "Frozen shoulder",
         therapist: "Petar Petrović",
         patient: "Ivan Kordić"
      },
      {
         name: "Arthritis pain management",
         therapist: "Šime Šimunović",
         patient: "Nikola Baretić"
      },
      {
         name: "Stress fractures",
         therapist: "Stjepan Stjepanović",
         patient: "Tea Ćetojević-Tisaj"
      },
      {
         name: "Post operation shoulder injury",
         therapist: "Ivan Ivanovič Ivanovski",
         patient: "Ian Balen"
      },
      {
         name: "Scoliosis",
         therapist: "Ivko Ivković",
         patient: "Marin Marinković"
      }
]

export const adminStatsPatients = [
   {
      name: "Karlo Vrančić",
      noOfPatients: 200,
      percentage: 83
   },
   {
      name: "Ian Balen",
      noOfPatients: 146,
      percentage: 67
   },
   {
      name: "Ivan Kordić",
      noOfPatients: 130,
      percentage: 75
   },
   {
      name: "Tea Ćetojević-Tisaj",
      noOfPatients: 125,
      percentage: 58
   },
   {
      name: "Niko Kaštelan",
      noOfPatients: 122,
      percentage: 79
   },
   {
      name: "Tomislav Šikić",
      noOfPatients: 108,
      percentage: 70
   },
   {
      name: "Nikola Baretić",
      noOfPatients: 100,
      percentage: 83
   },
   {
      name: "Lovro Dujić",
      noOfPatients: 91,
      percentage: 67
   },
   {
      name: "Lana Ćetojević-Tisaj",
      noOfPatients: 87,
      percentage: 75
   },
   {
      name: "Marko Marković",
      noOfPatients: 84,
      percentage: 58
   },
   {
      name: "Luka Dujić",
      noOfPatients: 77,
      percentage: 79
   },
   {
      name: "Mirna Ćetojević-Tisaj",
      noOfPatients: 76,
      percentage: 70
   },
   {
      name: "Josip Josipović",
      noOfPatients: 5,
      percentage: 83
   }
] 