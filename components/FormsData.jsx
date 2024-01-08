export const registerFields = [          // sluzi za lakse generiranje i management input polja u formama
   {
      label:"Name",
      placeholder:"John",
      id:"grid_name",
      name:"firstName"
   },
   {
      label:"Surname",
      placeholder:"Doe",
      id:"grid_surname",
      name:"lastName"
   },
   {
      label:"E-mail",
      placeholder:"john.doe@mail.com",
      id:"grid_email",
      name:"email"
   },
   {
      label:"Address",
      placeholder:"Street Name 1",
      id:"grid_address",
      name:"address"
   },
   {
      label:"Date Of Birth",
      placeholder:"YYYY-MM-DD",
      id:"grid_dob",
      name:"dateOfBirth"
   },
   {
      label:"Phone Number",
      placeholder:"0912345678",
      id:"grid_phone",
      name:"phoneNumber"
   },
   {
      label:"MBO",
      placeholder:"123456789",
      id:"grid_mbo",
      name:"MBO"
   },
   {
      label:"Password",
      placeholder:"********",
      id:"grid_pass",
      name:"password"
   },
   {
      label:"Confirm Password",
      placeholder:"********",
      id:"grid_passconf",
      name:"passwordConfirm"
   }
]

export const patientFields = [          // sluzi za lakse generiranje i management input polja u formama
   {
      label:"Name",
      placeholder:"John",
      id:"grid_half_left",
      name:"name"
   },
   {
      label:"Surname",
      placeholder:"Doe",
      id:"grid_half_right",
      name:"surname"
   },
   {
      label:"E-mail",
      placeholder:"john.doe@mail.com",
      id:"grid_full_row",
      name:"e-mail"
   },
   {
      label:"Address",
      placeholder:"Street Name 1",
      id:"grid_full_row",
      name:"address"
   },
   {
      label:"Date Of Birth",
      id:"grid_third_left",
      name: "dob"
   },
   {
      label:"Phone Number",
      placeholder:"0912345678",
      id:"grid_third_middle",
      name:"phone"
   },
   {
      label:"MBO",
      id:"grid_third_right",
      name: "mbo"
   },
   {
      label:"Password",
      placeholder:"********",
      id:"grid_half_left_stub",
      name:"password"
   },
   {
      label:"Confirm Password",
      placeholder:"********",
      id:"grid_half_right_stub",
      name:"passwordConfirm"
   }
]

export const therapistFields = [          // sluzi za lakse generiranje i management input polja u formama
   {
      label:"Name",
      placeholder:"John",
      id:"grid_half_left",
      name:"name"
   },
   {
      label:"Surname",
      placeholder:"Doe",
      id:"grid_half_right",
      name:"surname"
   },
   {
      label:"E-mail",
      placeholder:"john.doe@mail.com",
      id:"grid_full_row",
      name:"e-mail"
   },
   {
      label:"Specialization",
      placeholder:"Somekindof therapist",
      id:"grid_two_thirds_left",
      name:"specialization"
   },
   {
      label:"Employed since",
      placeholder:"YYYY-MM-DD",
      id:"grid_third_right",
      name:"employed since"
   },
   {
      label:"Password",
      placeholder:"********",
      id:"grid_half_left_stub",
      name:"password"
   },
   {
      label:"Confirm Password",
      placeholder:"********",
      id:"grid_half_right_stub",
      name:"passwordConfirm"
   }
]

export const resourceFields = [
   {
      label:"Name",
      placeholder:"Somekindof resource",
      id:"grid_full_row",
      name:"name"
   },
   {
      label:"Specialization",
      placeholder:"Somekindof therapist",
      id:"grid_two_thirds_left",
      name:"specialization"
   },
   {
      label:"Capacity",
      placeholder:"#",
      id:"grid_third_right",
      name:"capacity"
   },
   {
      label:"Description",
      placeholder:"This resource is used for some kind of therapy.",
      id:"grid_full_row",
      name:"description"
   },
]

export const therapyFields = [
   {
      label:"Name",
      placeholder:"Somekindof therapy",
      id:"grid_full_row",
      name:"name"
   },
   {
      label:"Resource",
      placeholder:"Somekindof resource",
      id:"grid_full_row",
      name:"resource"
   },
   {
      label:"Relevant part(s) of the body",
      placeholder:"",
      id:"grid_two_thirds_square",
      name:"bodyparts"
   },
   {
      label:"Sessions",
      placeholder:"#",
      id:"grid_third_right",
      name:"numberOfSessions"
   },
   {
      label:"Code",
      placeholder:"45G7E",
      id:"grid_third_right",
      name:"code"
   },
   {
      label:"Description",
      placeholder:"This therapy uses this resource and is used to treat this kind of injury.",
      id:"grid_full_row",
      name:"description"
   },
]