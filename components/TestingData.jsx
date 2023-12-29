export const mySchedule = {
   "1st January - 7th January": [
      {
         id: 0,
         datetime: new Date ("2024-01-01 17:00"),
         location: "Electrotherapy room",
         sessionNumber: "4/11",
         therapist: "Ante Pavlović",
         notes: {
            datetime: new Date("2024-01-01 17:53"),
            contents: "Pacijent je odradio normalno i dobro... ovaj put"
         }
      },
      {
         id: 1,
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
         datetime: new Date ("2024-01-09 17:00"),
         location: "Electrotherapy room",
         sessionNumber: "7/11",
         therapist: "Ante Pavlović",
         notes: ""
      },
      {
         id: 1,
         datetime: new Date ("2024-01-11 11:00"),
         location: "Electrotherapy room",
         sessionNumber: "8/11",
         therapist: "Ante Pavlović",
         notes: ""
      }
   ]
}

export const availableSessions = {
   "Thursday, 28th December": [9, 11, 12, 14, 15, 17, 19],
   "Friday, 29th December": [10, 12, 13, 14, 17, 18, 19],
   "Monday, 1st January": [8, 9, 10, 12, 13, 14, 17, 18, 19],
   "Wednesday, 3rd January": [9, 11, 13, 14, 16, 17, 19],
   "Thursday, 4th January": [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
   "Friday, 5th January": [9, 11, 13, 14, 16, 17, 19],
   "Monday, 8th January": [8, 12, 13, 15, 18],
   "Wednesday, 10th January": [10, 14, 16, 17, 19],
   dateMax: new Date("2024-01-12 00:00")
}