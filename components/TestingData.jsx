export const mySchedule = {
   "1st January - 7th January": [          // bit ce datum samo prvog u tjednu
      {
         id: 0,
         therapy: "Shoulder impingement",
         datetime: new Date ("2024-01-01 09:00"),
         location: "Electrotherapy room",
         sessionNumber: "4/11",           // bit ce completed sessions i total sessions
         therapist: "Ante Pavlović",
         notes: {
            datetime: new Date("2024-01-01 17:53"),      // NOTE izbacit ovo
            contents: "Pacijent je odradio normalno i dobro... ovaj put"
         }
      },
      {
         id: 1,
         therapy: "Shoulder impingement",
         datetime: new Date ("2024-01-03 17:00"),
         location: "Electrotherapy room",
         sessionNumber: "5/11",
         therapist: "Ante Pavlović",
         notes: {
            datetime: new Date("2024-01-03 17:53"),
            contents: "Pacijent je odradio normalno i dobro."
         }
      },
      {
         id: 2,
         therapy: "Shoulder impingement",
         datetime: new Date ("2024-01-05 17:00"),
         location: "Electrotherapy room",
         sessionNumber: "6/11",
         therapist: "Ante Pavlović",
         notes: ""
      },
   ],
   "8th January - 14th January": [
      {
         id: 0,
         therapy: "Shoulder impingement",
         datetime: new Date ("2024-01-09 17:00"),
         location: "Electrotherapy room",
         sessionNumber: "7/11",
         therapist: "Ante Pavlović",
         notes: ""
      },
      {
         id: 1,
         therapy: "Shoulder impingement",
         datetime: new Date ("2024-01-11 11:00"),
         location: "Electrotherapy room",
         sessionNumber: "8/11",
         therapist: "Ante Pavlović",
         notes: ""
      }
   ]
}

export const therapistSchedule = {
   "1st January - 7th January": [
      {
         id: 0,
         therapy: "Shoulder impingement",
         datetime: new Date ("2024-01-01 09:00"),
         location: "Electrotherapy room",
         sessionNumber: "4/11",
         patient: {
            name: "Karlo",
            surname: "Vrančić",
            "e-mail": "karlo.vrancic@medbay.hr",
            address: "Ulica Gustava Krkleca 12, Zagreb",
            dob: new Date("10/12/2023"),
            phone: "0955555555",
            mbo: "15253545565",
            code: "#User452"
         },
         notes: {
            datetime: new Date("2024-01-01 17:53"),
            contents: "Pacijent je odradio normalno i dobro... ovaj put"
         }
      },
      {
         id: 1,
         therapy: "Shoulder impingement",
         datetime: new Date ("2024-01-03 17:00"),
         location: "Electrotherapy room",
         sessionNumber: "5/11",
         patient: {
            name: "Karlo",
            surname: "Vrančić",
            "e-mail": "karlo.vrancic@medbay.hr",
            address: "Ulica Gustava Krkleca 12, Zagreb",
            dob: new Date("10/12/2023"),
            phone: "0955555555",
            mbo: "15253545565",
            code: "#User452"
         },
         notes: {
            datetime: new Date("2024-01-03 17:53"),
            contents: "Pacijent je odradio normalno i dobro."
         }
      },
      {
         id: 2,
         therapy: "Shoulder impingement",
         datetime: new Date ("2024-01-05 17:00"),
         location: "Electrotherapy room",
         sessionNumber: "6/11",
         patient: {
            name: "Karlo",
            surname: "Vrančić",
            "e-mail": "karlo.vrancic@medbay.hr",
            address: "Ulica Gustava Krkleca 12, Zagreb",
            dob: new Date("10/12/2023"),
            phone: "0955555555",
            mbo: "15253545565",
            code: "#User452"
         },
         notes: ""
      }
   ],
   "8th January - 14th January": [
      {
         id: 0,
         therapy: "Shoulder impingement",
         datetime: new Date ("2024-01-09 17:00"),
         location: "Electrotherapy room",
         sessionNumber: "7/11",
         patient: {
            name: "Karlo",
            surname: "Vrančić",
            "e-mail": "karlo.vrancic@medbay.hr",
            address: "Ulica Gustava Krkleca 12, Zagreb",
            dob: new Date("10/12/2023"),
            phone: "0955555555",
            mbo: "15253545565",
            code: "#User452"
         },
         notes: ""
      },
      {
         id: 1,
         therapy: "Shoulder impingement",
         datetime: new Date ("2024-01-11 11:00"),
         location: "Electrotherapy room",
         sessionNumber: "8/11",
         patient: {
            name: "Karlo",
            surname: "Vrančić",
            "e-mail": "karlo.vrancic@medbay.hr",
            address: "Ulica Gustava Krkleca 12, Zagreb",
            dob: new Date("10/12/2023"),
            phone: "0955555555",
            mbo: "15253545565",
            code: "#User452"
         },
         notes: ""
      }
   ]
}

export const availableSessions = {                          // treba poslat therapy (code), broj dana, bit ce druga funkcija za reschedule al vraca isto u biti
   "Thursday, 28th December": [9, 11, 12, 14, 15, 17, 19],
   "Friday, 29th December": [10, 12, 13, 14, 17, 18, 19],
   "Monday, 1st January": [8, 9, 10, 12, 13, 14, 17, 18, 19],
   "Wednesday, 3rd January": [9, 11, 13, 14, 16, 17, 19],
   "Thursday, 4th January": [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
   "Friday, 5th January": [9, 11, 13, 14, 16, 17, 19],
   "Tuesday, 9th January": [8, 12, 13, 15, 18],
   "Wednesday, 10th January": [10, 14, 16, 17, 19],
   dateMax: new Date("2024-01-15 00:00")
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
         name: "Impingement 2 electric bogaloo",
         code: "#4JF9F",
         numberOfSessions: 5
      },
      {
         name: "Please scroll",
         code: "#Please",
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
   "any": []      // dodaj any
}

export const myTherapies = [
   {
      id: 0,
      name: "Shoulder impingement",
      code: "#4JG5E",
      "date started": new Date("2023-10-27"),
      "date finished": new Date("2023-11-21"),
      therapist: "Ante Pavlović",               // bit ce odvojeno ime prezime
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
            notes: " Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro.Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro. Pacijent je odradio normalno i dobro."
         },
         {
            id: 4,
            datetime: new Date("2024-01-05 13:00"),
            notes: ""
         },
         {
            id: 5,
            datetime: new Date("2024-01-08 13:00"),
            notes: ""
         },
         {
            id: 6,
            datetime: new Date("2024-01-09 08:00"),
            notes: ""
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
      "date started": new Date("2023-10-27"),
      "date finished": new Date("2023-11-21"),
      therapist: "Ante Pavlović",
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
            notes: "Pacijent je odradio normalno i dobro."
         },
         {
            id: 3,
            datetime: new Date("2024-01-04 15:00"),
            notes: ""
         },
         {
            id: 4,
            datetime: new Date("2024-01-05 13:00"),
            notes: ""
         }
      ]
   },
   {
      id: 2,
      name: "Shoulder impingement",
      code: "#4JG5E",
      "date started": new Date("2023-10-27"),
      "date finished": new Date("2023-11-21"),
      therapist: "Ante Pavlović",
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
            notes: "Pacijent je odradio normalno i dobro."
         },
         {
            id: 3,
            datetime: new Date("2024-01-04 15:00"),
            notes: ""
         },
         {
            id: 4,
            datetime: new Date("2024-01-05 13:00"),
            notes: ""
         }
      ]
   },
   {
      id: 3,
      name: "Shoulder impingement",
      code: "#4JG5E",
      "date started": new Date("2023-10-27"),
      "date finished": new Date("2023-11-21"),
      therapist: "Ante Pavlović",
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
            notes: "Pacijent je odradio normalno i dobro."
         },
         {
            id: 3,
            datetime: new Date("2024-01-04 15:00"),
            notes: ""
         },
         {
            id: 4,
            datetime: new Date("2024-01-05 13:00"),
            notes: ""
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
      dob: new Date("10/12/2023"),
      phone: "0955555555",
      mbo: "15253545565",
      show: true,
      code: "#User452"
   },
   {
      id: 1,
      name: "Tea",
      surname: "Ćetojević-Tisaj",
      "e-mail": "tea.cetojevic-tisaj@medbay.hr",
      address: "Unska ulica 3, Zagreb",
      dob: new Date("10/13/2023"),
      phone: "0955555555",
      mbo: "15253545565",
      show: true,
      code: "#User453"
   },
   {
      id: 2,
      name: "Ian",
      surname: "Balen",
      "e-mail": "ian.balen@medbay.hr",
      address: "Obala kneza Trpimira 26, Zadar",
      dob: new Date("10/14/2023"),
      phone: "0955555555",
      mbo: "15253545565",
      show: false,
      code: "#User454"
   },
   {
      id: 3,
      name: "Nikola",
      surname: "Baretić",
      "e-mail": "nikola.baretic@medbay.hr",
      address: "Ulica Gustava Krkleca 12, Zagreb",
      dob: new Date("10/15/2023"),
      phone: "0955555555",
      mbo: "15253545565",
      show: true,
      code: "#User455"
   },
   {
      id: 4,
      name: "Niko",
      surname: "Kaštelan",
      "e-mail": "niko.kastelan@medbay.hr",
      address: "Unska ulica 3, Zagreb",
      dob: new Date("10/16/2023"),
      phone: "0955555555",
      mbo: "15253545565",
      show: true,
      code: "#User456"
   },
   {
      id: 5,
      name: "Ivan",
      surname: "Kordić",
      "e-mail": "ivan.kordic@medbay.hr",
      address: "Obala kneza Trpimira 26, Zadar",
      dob: new Date("10/17/2023"),
      phone: "0955555555",
      mbo: "15253545565",
      show: false,
      code: "#User457"
   },
   {
      id: 6,
      name: "Lovro",
      surname: "Dujić",
      "e-mail": "lovro.dujic@medbay.hr",
      address: "Ulica Gustava Krkleca 12, Zagreb",
      dob: new Date("01/01/2023"),
      phone: "0955555555",
      mbo: "15253545565",
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
      "employed since": new Date("10/13/2023"),
      show: true
   },
   {
      id: 2,
      name: "Ian",
      surname: "Balen",
      "e-mail": "ian.balen@medbay.hr",
      specialization: "Traction therapist",
      "employed since": new Date("10/14/2023"),
      show: false
   },
   {
      id: 3,
      name: "Nikola",
      surname: "Baretić",
      "e-mail": "nikola.baretic@medbay.hr",
      specialization: "Electrotherapist",
      "employed since": new Date("10/15/2023"),
      show: true
   },
   {
      id: 4,
      name: "Niko",
      surname: "Kaštelan",
      "e-mail": "niko.kastelan@medbay.hr",
      specialization: "Microwave therapist",
      "employed since": new Date("10/16/2023"),
      show: true
   },
   {
      id: 5,
      name: "Ivan",
      surname: "Kordić",
      "e-mail": "ivan.kordic@medbay.hr",
      specialization: "Traction therapist",
      "employed since": new Date("10/17/2023"),
      show: false
   },
   {
      id: 6,
      name: "Lovro",
      surname: "Dujić",
      "e-mail": "lovro.dujic@medbay.hr",
      specialization: "Electrotherapist",
      "employed since": new Date("01/01/2023"),
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
      notes: ""
   },
   {
      id: 5,
      therapy: "Severe shoulder fracture",
      datetime: new Date("2024-01-08 13:00"),
      notes: ""
   },
   {
      id: 6,
      therapy: "Post operation shoulder recovery",
      datetime: new Date("2024-01-09 08:00"),
      notes: ""
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
      name: "Electrotherapy machine",
      capacity: 4,
      specialization: "Massage therapist",
      description: "Electrotherapy is the use of electrical energy as a medical treatment. In medicine, the term electrotherapy can apply to a variety of treatments, including the use of electrical devices such as deep brain stimulators for neurological disease."
   },
   {
      name: "Electrotherapy machine",
      capacity: 4,
      specialization: "Electrotherapist",
      description: "Electrotherapy is the use of electrical energy as a medical treatment. In medicine, the term electrotherapy can apply to a variety of treatments, including the use of electrical devices such as deep brain stimulators for neurological disease."
   },
   {
      name: "Electrotherapy machine",
      capacity: 4,
      specialization: "Massage therapist",
      description: "Electrotherapy is the use of electrical energy as a medical treatment. In medicine, the term electrotherapy can apply to a variety of treatments, including the use of electrical devices such as deep brain stimulators for neurological disease."
   }
]

export const adminTherapies = [
   {
      name: "Shoulder impingement",
      code: "#4JG5E",
      numberOfSessions: 3,
      resource: "Electrotherapy machine",
      description: "Electrotherapy is the use of electrical energy as a medical treatment. In medicine, the term electrotherapy can apply to a variety of treatments, including the use of electrical devices such as deep brain stimulators for neurological disease.",
      bodyparts: ["shoulder"]
   },
   {
      name: "Shoulder tendon injury",
      code: "#56JG3",
      numberOfSessions: 5,
      resource: "Electrotherapy machine machine machine",
      description: "Electrotherapy is the use of electrical energy as a medical treatment. In medicine, the term electrotherapy can apply to a variety of treatments, including the use of electrical devices such as deep brain stimulators for neurological disease.",
      bodyparts: ["shoulder"]
   },
   {
      name: "Post operation shoulder recovery",
      code: "#43GE4",
      numberOfSessions: 4,
      resource: "Electrotherapy machine",
      description: "Electrotherapy is the use of electrical energy as a medical treatment. In medicine, the term electrotherapy can apply to a variety of treatments, including the use of electrical devices such as deep brain stimulators for neurological disease.",
      bodyparts: ["shoulder"]
   },
   {
      name: "Impingement 2 electric bogaloo",
      code: "#4JF9F",
      numberOfSessions: 5,
      resource: "Electrotherapy machine",
      description: "Electrotherapy is the use of electrical energy as a medical treatment. In medicine, the term electrotherapy can apply to a variety of treatments, including the use of electrical devices such as deep brain stimulators for neurological disease.",
      bodyparts: ["shoulder"]
   },
   {
      name: "Please scroll",
      code: "#Please",
      numberOfSessions: 2,
      resource: "Electrotherapy machine",
      description: "Electrotherapy is the use of electrical energy as a medical treatment. In medicine, the term electrotherapy can apply to a variety of treatments, including the use of electrical devices such as deep brain stimulators for neurological disease.",
      bodyparts: ["shoulder"]
   },
   {
      name: "Elbow impingement",
      code: "#4JG5F",
      numberOfSessions: 4,
      resource: "Electrotherapy machine",
      description: "Electrotherapy is the use of electrical energy as a medical treatment. In medicine, the term electrotherapy can apply to a variety of treatments, including the use of electrical devices such as deep brain stimulators for neurological disease.",
      bodyparts: ["arm"]
   },
   {
      name: "Elbow tendon injury",
      code: "#56JG6",
      numberOfSessions: 3,
      resource: "Electrotherapy machine",
      description: "Electrotherapy is the use of electrical energy as a medical treatment. In medicine, the term electrotherapy can apply to a variety of treatments, including the use of electrical devices such as deep brain stimulators for neurological disease.",
      bodyparts: ["arm"]
   },
   {
      name: "Post operation elbow recovery",
      code: "#43HE4",
      numberOfSessions: 5,
      resource: "Electrotherapy machine",
      description: "Electrotherapy is the use of electrical energy as a medical treatment. In medicine, the term electrotherapy can apply to a variety of treatments, including the use of electrical devices such as deep brain stimulators for neurological disease.",
      bodyparts: ["arm"]
   }
]