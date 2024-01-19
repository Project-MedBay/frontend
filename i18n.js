import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
            app: {
                "language": "en",
                "languageLabel": "ENG"
            },
            admin: {
                "weekdays": {
                    "Sunday": "Sunday",
                    "Monday": "Monday",
                    "Tuesday": "Tuesday",
                    "Wednesday": "Wednesday",
                    "Thursday": "Thursday",
                    "Friday": "Friday",
                    "Saturday": "Saturday"
                  },
                  "months": {
                      "January": "January", 
                      "February": "February",
                      "March": "March", 
                      "April": "April", 
                      "May": "May", 
                      "June": "June", 
                      "July": "July", 
                      "August": "August", 
                      "September": "September", 
                      "October": "October", 
                      "November": "November", 
                      "December": "December"
                    },
                  "extension1": "st",
                  "extension2": "nd",
                  "extension3": "rd",
                  "extension4": "th" 
              
            },
            adminHeader: {
                calendar: "CALENDAR",
                verifications: "VERIFICATIONS",
                manage: "MANAGE",
                statistics: "STATISTICS",
                logOut: "LOG OUT",
                logoAltText: "Logo"
              },
            adminCalendar: {
                "appointmentCalendarTitle": "Appointment Calendar",
                "filtersDescription": "Use the filters to search for appointments by patient, therapist, or therapy name.",
                "previousWeek": "Previous Week",
                "nextWeek": "Next Week",
                "filterAll": "All",
                "filterPatient": "Patient",
                "filterTherapist": "Therapist",
                "filterTherapyName": "Therapy Name",
                "searchPlaceholder": "Search...",
                "timeDateHeader": "Time / Date",
                "weekdays": {
                    "Monday": "Monday", 
                    "Tuesday": "Tuesday", 
                    "Wednesday": "Wednesday", 
                    "Thursday": "Thursday", 
                    "Friday": "Friday"
                },
                "popupTherapist": "THERAPIST:",
                "popupPatient": "PATIENT:",
                "popupCannotReschedule": "Cannot reschedule",
                "reasonOne": "Appointment has passed.",
                "reasonTwo": "Appointment is in less than 48 hours.",
                "rescheduleCalendar": "RESCHEDULE THERAPY"
              }, 
            adminFacilityCard: {
                editFacility: "EDIT",
                deleteFacility: "DELETE",
                specialization: "SPECIALIZATION:",
                capacity: "CAPACITY:",
                location: "LOCATION:",
                description: "DESCRIPTION:",
                resource: "RESOURCE:",
                sessions: "SESSIONS:",
                relevantBody: "RELEVANT PART OF THE BODY:",
                code: "CODE:",
                description2: "DESCRIPTION:"
               },
            adminManage: {
                therapistsTab: "Therapists",
                patientsTab: "Patients",
                facilityTab: "Facility",
                searchPlaceholder: "Search",
                resourcesSectionTitle: "RESOURCES",
                therapiesSectionTitle: "THERAPIES",
                addNewButton: "ADD NEW",
                noItemsMatchQuery: "There are no items that match this query."
              },
            adminStatistics: {
                therapists: "Therapists",
                resources: "Resources",
                placeholder: "Search",
                workHours: "WORK HOURS AT APPOINTMENTS",
                pastMonth: "(PAST 30 DAYS)",
                patientsTreated: "PATIENTS TREATED",
                by: "BY",
                with: "WITH",
                lifetime: "(LIFETIME)"
              },
            adminVerifications: {
                verificationsTitle: "Verifications",
                therapiesSectionTitle: "THERAPIES",
                registrationsSectionTitle: "REGISTRATIONS"
              },
            adminVerificationCard: {
                request: "Request #",
                review: "Review"
              },
            adminVerificationPopup: {
                registration: "Registration",
                therapy: "Therapy",
                requestNo: "Request #",
                userData: "USER DATA:",
                name: "Full name:",
                email: "Email:",
                address: "Address:",
                dob: "Date of birth:",
                phoneNumber: "Phone number:",
                mbo: "MBO:",
                therapyID: "Therapy ID:",
                duration: "Duration:",
                noOfSessions: "Number of Sessions:",
                sessions: "SESSIONS:",
                collapse: "Collapse",
                expand: "Expand",
                requestWasMade: "Request was made on ",
                requestWillBe: "Request will be assigned identifier User#",
                reasonRejection: "Reason for rejection",
                requestAccept: "Are you sure that you want to approve this request?",
                buttonApprove: "Approve",
                buttonReject: "Reject"
              },
            adminWelcome: {
                welcomeMessage: "Welcome, Admin!",
                calendarButton: "Calendar",
                verificationsButton: "Verifications",
                manageButton: "Manage"
              },
            AIChat: {
                firstTextMedBot: "Hello! I am MedBot and I am here to help answer any of your questions regarding the therapies we offer!",
                firstTextBayBot: "Hello! I am BayBot and I am here to help answer any of your questions regarding the use of this site!",
                processing: "Processing...",
                errorMessage: "I encountered an error while trying to reach the server. I am very sorry for the inconvenience, please try again in a few moments!",
                assistant: "AI Assistant",
                open: "Open ",
                question: "Ask a question...",
                send: "Send"
              },
            bodyPartSelection: {
                head: "head",
                shoulder: "shoulder",
                arm: "arm",
                "upper torso": "upper torso",
                "lower torso": "lower torso",
                leg: "leg",
                hand: "hand",
                foot: "foot",
                any: "any"
              },
            customSelectInput: {
                select: "Select "
              },
            deactivatePopup: {
                title: "Are you sure?",
                subtitle: "This action is irreversible.",
                deactivateTextSelf: "If you deactivate your account, you will lose access to your account and all your data permanently, and will need to register again to request new therapies in the future.",
                deactivateTextPatient1: "If you deactivate this account ",
                deactivateTextPatient2: ", the user will lose access to their account and data, and will be removed from the list.",
                deactivateTextTherapist1: "If you deactivate this account ",
                deactivateTextTherapist2: ", the user will lose access to their account and data, and will be removed from the list.",
                deactivateTextResource1: "Only delete this resource ",
                deactivateTextResource2: "if there are no scheduled sessions with this resource and you are sure you want to remove it permanently.",
                deactivateTextTherapy1: "Only delete this therapy ",
                deactivateTextTherapy2: "if there are no scheduled sessions for this therapy and you are sure you want to remove it permanently.",
                actionDelete: "DELETE",
                actionDeactivate: "DEACTIVATE",
                actionDeleteCroatian: "DELETE",
                actionDeactivateCroatian: "DEACTIVATE",
                buttonYes: "YES, ",
                buttonNo: "NO, DON'T "
              },
            adminEditPopup: {
                "titleAdd": "ADD",
                "titleEdit": "EDIT",
                "titleAccountData": "ACCOUNT DATA",
                "titlePatient": "PATIENT",
                "titleTherapist": "THERAPIST",
                "titleResource": "RESOURCE",
                "titleTherapy": "THERAPY",
                "buttonCancel": "CANCEL",
                "buttonSave": "SAVE",
                "validation": {
                  "nameRequired": "Name is required.",
                  "surnameRequired": "Surname is required.",
                  "emailFormat": "Email must be in format 'something@something.domain'.",
                  "addressRequired": "Address is required.",
                  "phoneDigits": "Must be 9+ digits.",
                  "specializationRequired": "Specialization is required.",
                  "employedSinceFormat": "Must be YYYY-MM-DD.",
                  "passwordLength": "Password must be 8+ characters.",
                  "passwordMatch": "Passwords do not match.",
                  "locationRequired": "Location is required",
                  "digitsOnly": "Must be digits only",
                  "resourceRequired": "Resource is required.",
                  "descriptionRequired": "Description is required.",
                  "bodypartRequired": "Relevant body part is required."
                },
                "incorrectPassword": "Incorrect password.",
                "changePassword": "Change password",
                "cancelEdit": "Cancel edit",
                "fieldRequired": "Field is required.",
                "bodyPartList": ["head", "shoulder", "leg", "upper torso", "arm", "foot", "lower torso", "hand", "any"],
                "changePasswordNote": "Input current password first"
              },
            formFields: {
                "register": {
                  "firstName": {
                    "label": "Name",
                    "placeholder": "John"
                  },
                  "lastName": {
                    "label": "Surname",
                    "placeholder": "Doe"
                  }, 
                  "email": {
                    "label": "E-mail",
                    "placeholder": "john.doe@mail.com"
                  },
                  "address": {
                    "label": "Address",
                    "placeholder": "Street Name 1"
                  },
                  "dateOfBirth": {
                    "label": "Date Of Birth",
                    "placeholder": "YYYY-MM-DD"
                  },
                  "phoneNumber": {
                    "label": "Phone Number",
                    "placeholder": "0912345678"
                  },
                  "MBO": {
                    "label": "MBO",
                    "placeholder": "123456789"
                  },
                  "password": {
                    "label": "Password",
                    "placeholder": "********"
                  },
                  "passwordConfirm": {
                    "label": "Confirm Password",
                    "placeholder": "********"
                  }
                },
                "patient": {
                    "name": "Name",
                    "surname": "Surname",
                    "email": "E-mail",
                    "address": "Address",
                    "dateOfBirth": "Date Of Birth",
                    "phoneNumber": "Phone Number",
                    "mbo": "MBO",
                    "password": "Password",
                    "confirmPassword": "Confirm Password",
                    "namePlaceholder": "John",
                    "surnamePlaceholder": "Doe",
                    "emailPlaceholder": "john.doe@mail.com",
                    "addressPlaceholder": "Street Name 1",
                    "dobPlaceholder": "YYYY-MM-DD",
                    "phonePlaceholder": "0912345678",
                    "mboPlaceholder": "123456789",
                    "passwordPlaceholder": "********"
                  },
                  "therapist": {
                    "name": "Name",
                    "surname": "Surname",
                    "email": "E-mail",
                    "specialization": "Specialization",
                    "employedSince": "Employed since",
                    "password": "Password",
                    "confirmPassword": "Confirm Password",
                    "namePlaceholder": "John",
                    "surnamePlaceholder": "Doe",
                    "emailPlaceholder": "john.doe@mail.com",
                    "specializationPlaceholder": "Somekindof therapist",
                    "employedSincePlaceholder": "YYYY-MM-DD",
                    "passwordPlaceholder": "********"
                  },
                  "resource": {
                    "name": "Name",
                    "location": "Location",
                    "specialization": "Specialization",
                    "capacity": "Capacity",
                    "description": "Description",
                    "namePlaceholder": "Somekindof resource",
                    "locationPlaceholder": "Some room or zone",
                    "specializationPlaceholder": "Somekindof therapist",
                    "capacityPlaceholder": "#",
                    "descriptionPlaceholder": "This resource is used for some kind of therapy."
                  },
                  "therapy": {
                    "name": "Name",
                    "resource": "Resource",
                    "bodyPart": "Relevant part of the body",
                    "sessions": "Sessions",
                    "code": "Code",
                    "description": "Description",
                    "namePlaceholder": "Somekindof therapy",
                    "resourcePlaceholder": "Somekindof resource",
                    "bodyPartPlaceholder": "",
                    "sessionsPlaceholder": "#",
                    "codePlaceholder": "45G7E",
                    "descriptionPlaceholder": "This therapy uses this resource and is used to treat this kind of injury."
                  }
            },
            login: {
                "formTitle": "Welcome back!",
                "invalidCredentials": "Invalid email or password. Please try again.",
                "notAuthorized": "Account not yet authorized. Please try again later.",
                "tryAgain": ". Please try again.",
                "emailLabel": "E-mail:",
                "passwordLabel": "Password:",
                "forgotPassword": "Forgot password?",
                "loginButton": "Login",
                "tagline": "Rehabilitation Redefined",
                "newHere": "You're new here?",
                "registerButton": "Register now",
                "emailPlaceholder": "john.doe@mail.com",
                "passwordPlaceholder": "********"
              },
            loginPasswordPopup: {
                "popupTitle": "Write your e-mail here and we will send you a form to reset your password:",
                "emailPlaceholder": "john.doe@mail.com",
                "submitButton": "Submit",
                "success": "Success!",
                "resetLink": "The link to reset your password will arrive to the supplied e-mail shortly.",
                "close": "Close"
              },
            noMatchRoute: {
                "error": "Error 404",
                "notFound": "Page not found.",
                "goBack": "Back",
                "toLogin": "Take me to login"
              },
            patient: {
                "weekdays": {
                    "Sunday": "Sunday",
                    "Monday": "Monday",
                    "Tuesday": "Tuesday",
                    "Wednesday": "Wednesday",
                    "Thursday": "Thursday",
                    "Friday": "Friday",
                    "Saturday": "Saturday"
                  },
                  "months": {
                      "January": "January", 
                      "February": "February",
                      "March": "March", 
                      "April": "April", 
                      "May": "May", 
                      "June": "June", 
                      "July": "July", 
                      "August": "August", 
                      "September": "September", 
                      "October": "October", 
                      "November": "November", 
                      "December": "December"
                    },
                  "extension1": "st",
                  "extension2": "nd",
                  "extension3": "rd",
                  "extension4": "th" 
              },
            patientDash: {
                "mySchedule": "My schedule:",
                "noSessionsThisWeek": "No sessions this week.",
                "nextSession": "Next session:",
                "selectedSession": "Selected session:",
                "noUpcomingSessions": "No upcoming sessions.",
                "noSessions": "No sessions.",
                "viewMore": "View more",
                "therapist": "Therapist:",
                "therapy": "Therapy:",
                "time": "Time:",
                "location": "Location:",
                "sessionNumber": "Session number:",
                "viewLocationOnMap": "View location on map",
                "closeMap": "Close map",
                "viewNotes": "View notes",
                "noNotesSoFar": "No notes so far.",
                "reschedule": "Reschedule",
                "cannotReschedule": "Cannot reschedule.",
                "appointmentInLess48Hours": "Appointment is in less than 48 hours.",
                "appointmentPassed": "Appointment has passed.",
                "sessionNotesTitle": "SESSION NOTES:",
                "session": "Session"
              },
            patientHeader: {
                "brandName": "MedBay",
                "logOut": "LOG OUT",
                "logOutConfirmation": "LOG OUT?",
                "yes": "YES",
                "no": "NO",
                "theme": "THEME",
                "language": "LANGUAGE",
                "myProfile": "MY PROFILE",
                "newTherapy": "NEW THERAPY",
                "dashboard": "DASHBOARD"
              },
            patientNewTherapy: {
                "title": "REQUEST A NEW THERAPY",
                "step1Title": "STEP 1: PICK A THERAPY",
                "step1Subtitle": "or enter therapy code provided by your doctor:",
                "invalidCode": "Invalid code.",
                "codePlaceholder": "#4JGSE",
                "filterBy": "FILTER BY:",
                "searchPlaceholder": "Search",
                "searchText": "Select a body part to filter or use the search bar below to find your therapy.",
                "step2Title": "STEP 2: PICK SESSIONS",
                "pickedSessions": "PICKED:",
                "duration": "duration:",
                "oneDay": "day",
                "moreDays": "days",
                "croDay": "days",
                "restrictions": "Restrictions:",
                "sessionRestrictions": {
                  "firstRestriction1": "Selected sessions must be at least ", 
                  "firstRestriction2": "24h apart.",
                  "secondRestriction1": "The total duration of the therapy must not exceed ",
                  "secondRestriction2": " days.",
                  "thirdRestriction1": "Sessions cannot be scheduled more than ",
                  "thirdRestriction2": "3 months ",
                  "thirdRestriction3": "in advance."
                },
                "scheduleLegend1": "Grayed out dates/times are inelligible or full. ",
                "scheduleLegend2": "Picked dates/times are highlighted in ",
                "scheduleLegend3": "purple and bolded.",
                "step3Title": "STEP 3: FINAL STEP",
                "reviewSectionTitle": "review:",
                "durationDays1": "duration: ",
                "durationDays2": " days",
                "noOfSessions": "number of session: ",
                "mySessions": "MY SESSIONS",
                "collapse": "Collapse",
                "expand": "Expand",
                "verificationSectionTitle": "verification:",
                "referralNumber": "Referral number:",
                "referralPlaceholder": "123456789",
                "referralDescription1": "A unique sequence of letters and numbers found on the",
                "referralDescription2": "referral note provided by your doctor.",
                "referralDescription3": "If you're unsure where to find it, ask your doctor for help.",
                "doctorId": "Doctor id (hlkid):",
                "doctorIdDescription1": "A unique sequence of numbers that represents your doctor",
                "doctorIdDescription2": "in the national health system.",
                "doctorIdDescription3": "If you're unsure where to find it, ask your doctor for help.",
                "verificationFailed": "Incorrect referral number or hlkid.",
                "finishNote": "Once your therapy is approved by admin, we will notify you by email.",
                "iUnderstand": "I understand",
                "cancelButton": "Cancel",
                "backButton": "Back",
                "nextButton": "Next",
                "finishButton": "Finish",
                "tagline": "RECOVERY BEGINS HERE.",
                "successPopup": {
                  "text1": "You have filled in all the information and your therapy request is now being processed by our administrator.",
                  "text2": "Once your request is approved, you will be notified by e-mail and the therapy will appear on your dashboard.",
                  "buttonText": "Go to dash"
                }
              },
            patientProfile: {
                "userID": "(#User",
                "editAccountData": "Edit account data",
                "deactivateAccount": "Deactivate account",
                "myTherapiesTitle": "My therapies:",
                "noTherapiesMessage1": "You have no therapies yet. ",
                "noTherapiesMessage2": "Sign up through the ",
                "noTherapiesMessage3": "NEW THERAPY",
                "noTherapiesMessage4": "tab!",
                "emailLabel": "E-mail:",
                "addressLabel": "Address:",
                "dateOfBirthLabel": "Date of Birth:",
                "phoneNumberLabel": "Phone Number:",
                "mboLabel": "MBO:",
                "therapyCard": {
                  "therapyCode": "THERAPY CODE",
                  "dateStarted": "DATE STARTED:",
                  "dateFinished": "DATE FINISHED:",
                  "totalSessions": "TOTAL SESSIONS:",
                  "viewMore": "View more"
                },
                "thankYouMessage": {
                  "title": "THANK YOU",
                  "subtitle": "FOR BEING WITH US FOR",
                  "oneDay": "DAY",
                  "moreDays": "DAYS",
                  "oneMonth": "MONTH",
                  "moreMonths": "MONTHS",
                  "oneYear": "YEAR",
                  "moreYears": "YEARS",
                  "alotOfTime": "OVER"
                },
                "uploadImageTooltip": {
                  "add": "Add a profile image",
                  "change": "Change profile image"
                }
              },
            registerMain: {
                "alreadyHaveAccount": "Already have an account?",
                "loginHere": "Login here",
                "formTitle": "Register",
                "unexpectedError": "Error",
                "emptyField": "Field is required.",
                "digitsChecker": "Must be digits only.",
                "recaptchaChecker": "Please verify that you are not a robot.",
                "tryAgain": "Please try again.",
                "fields": {
                  "firstName": {
                    "label": "Name",
                    "placeholder": "John",
                    "errorMessage": "Name is required."
                  },
                  "lastName": {
                    "label": "Surname",
                    "placeholder": "Doe",
                    "errorMessage": "Surname is required."
                  },
                  "email": {
                    "label": "E-mail",
                    "placeholder": "john.doe@mail.com",
                    "errorMessage": "Email must be in format 'something@something.domain'."
                  },
                  "address": {
                    "label": "Address",
                    "placeholder": "Street Name 1",
                    "errorMessage": "Address is required."
                  },
                  "dateOfBirth": {
                    "label": "Date Of Birth",
                    "placeholder": "YYYY-MM-DD",
                    "errorMessage1": "Must be YYYY-MM-DD.",
                    "errorMessage2": "Date is in the future.",
                    "errorMessage3": "Age is over 150."
                  },
                  "phoneNumber": {
                    "label": "Phone Number",
                    "placeholder": "0912345678",
                    "errorMessage": "Must be 9+ digits."
                  },
                  "MBO": {
                    "label": "MBO",
                    "placeholder": "123456789",
                    "errorMessage": "Must be 9 digits."
                  },
                  "password": {
                    "label": "Password",
                    "placeholder": "********",
                    "errorMessage": "Password must be 8+ characters."
                  },
                  "passwordConfirm": {
                    "label": "Confirm Password",
                    "placeholder": "********",
                    "errorMessage": "Passwords do not match."
                  }
                },
                "togglePasswordText": "Show/Hide Password",
                "registerButtonText": "Register",
                "successPopup": {
                  "text1": "You have filled in all the information and your account is now being processed by our administrator.",
                  "text2": "Please check your e-mail frequently in order to see if your account is confirmed or if there are changes to be made.",
                  "buttonText": "OK"
                },
                "greeting": "Where Healing Begins With Care."
              },
            reschedulePopup: {
                "popupTitle": "RESCHEDULE SESSION:",
                "currentSession": "SESSION:",
                "newSession": "NEW SESSION:",
                "rescheduleButton": "Reschedule",
                "rescheduleLegend1": "Grayed out dates/times are inelligible or full.",
                "rescheduleLegend2": "The selected date/time is highlighted in ",
                "rescheduleLegend3": "purple and bolded.",
                "rescheduleLegend4": "Dates when ",
                "rescheduleLegendTernary1": "you ",
                "rescheduleLegendTernary2": "they ",
                "rescheduleLegend5": " have other sessions scheduled are emphasized with a ",
                "rescheduleLegend6": "green box",
                "confirmation": {
                  "text": "Are you sure?",
                  "yes": "Yes",
                  "no": "No"
                }
              },
            resetPassword: {
                "resetTitle": "Reset your password",
                "newPassword": "New password:",
                "confirmNew": "Confirm new password:",
                "resetButton": "Reset password",
                "failedText": "Invalid email or password. Please try again.",
                "success": "Success!",
                "successMessage": "Your password has been reset and you may now use it to log in.",
                "takeToLogin": "Take me to login",
                "eightPlusChar": "Password must be 8+ characters.",
                "noMatch": "Passwords do not match."
              },
            sessionSelection: {
                "selectDateMessage1": "Select date to ",
                "selectDateMessage2": "view timeslots"
              },
            successPopup: {
                "success": "Success!"
              },
            tableList: {
                "headers": {
                    "patients": {
                        "#": "#",
                        "NAME": "NAME",
                        "SURNAME": "SURNAME",
                        "E-MAIL": "E-MAIL",
                        "ADDRESS": "ADDRESS",
                        "DOB": "DOB",
                        "PHONE": "PHONE",
                        "MBO": "MBO"
                    },
                    "therapists": {
                        "#": "#",
                        "NAME": "NAME",
                        "SURNAME": "SURNAME",
                        "E-MAIL": "E-MAIL",
                        "SPECIALIZATION": "SPECIALIZATION",
                        "EMPLOYED SINCE": "EMPLOYED SINCE",
                    }
                },
                "buttons": {
                  "edit": "EDIT",
                  "deactivate": "DEACTIVATE",
                  "details": "DETAILS",
                  "addNew": "ADD NEW"
                },
                "messages": {
                  "noResults": "There are no items that match this query."
                }
              },
            therapist: {
                "weekdays": {
                  "Sunday": "Sunday",
                  "Monday": "Monday",
                  "Tuesday": "Tuesday",
                  "Wednesday": "Wednesday",
                  "Thursday": "Thursday",
                  "Friday": "Friday",
                  "Saturday": "Saturday"
                },
                "months": {
                    "January": "January", 
                    "February": "February",
                    "March": "March", 
                    "April": "April", 
                    "May": "May", 
                    "June": "June", 
                    "July": "July", 
                    "August": "August", 
                    "September": "September", 
                    "October": "October", 
                    "November": "November", 
                    "December": "December"
                  },
                "extension1": "st",
                "extension2": "nd",
                "extension3": "rd",
                "extension4": "th" 
            },
            therapistDash: {
                "schedule": {
                  "title": "My schedule:",
                  "noUpcomingSessions": "No upcoming sessions.",
                  "noSessionsThisWeek": "No sessions this week.",
                  "nextSession": "Next session:",
                  "selectedSession": "Selected session:"
                },
                "sessionCard": {
                  "viewMore": "View more",
                  "therapy": "Therapy:",
                  "time": "Time:",
                  "location": "Location:",
                  "sessionNumber": "Session number:",
                  "patient": "Patient:"
                },
                "notes": {
                  "title": "Your note:",
                  "cancel": "Cancel",
                  "edit": "Edit note",
                  "save": "Save note",
                  "add": "Add note",
                  "placeholder": "No notes yet.",
                  "disabledText": "Cannot add note before session has started."
                },
                "popup": {
                  "close": "Close",
                  "patientDetails": "Patient Details",
                  "therapyDetails": "Therapy Details"
                },
                "buttons": {
                  "goBackWeek": "Go Back a Week",
                  "goForwardWeek": "Go Forward a Week",
                  "resetWeek": "Reset to Current Week"
                },
                "messages": {
                  "noSessions": "No sessions this week.",
                  "noNotesYet": "No notes yet."
                },
                "collapse": "Collapse",
                "viewNotes": "View notes",
                "rows1": {
                  "dateStarted":"date started",
                  "rows1Therapist": "therapist",
                  "rows1DateFinished": "date finished",
                  "rows1location": "location"
                },
                "rows2": {
                  "rows2Email": "email",
                  "rows2Address": "address",
                  "rows2DOB": "date of birth",
                  "rows2PhoneNumber": "phone number",
                  "rows2MBO": "mbo"
                },
                "atSessionInfo": "at",
                "noNotes": "No notes"
              },
            therapistHeader: {
                "logoTitle": "MedBay",
                "navigation": {
                  "logOutConfirmation": "LOG OUT?",
                  "logOutYes": "YES",
                  "logOutNo": "NO",
                  "logOut": "LOG OUT",
                  "patients": "PATIENTS",
                  "dashboard": "DASHBOARD"
                }
              },
            therapistPatients: {
                "title": {
                  "showing": "SHOWING:",
                  "allPatients": "SEARCH RESULT (all patients)",
                  "yourPatients": "YOUR PATIENTS"
                },
                "searchPlaceholder": "Search",
                "popup": {
                  "patientType": "patient"
                }
              },
            therapyOrPatientPopup: {
                "popup": {
                  "therapy": "therapy",
                  "patient": "patient",
                  "sessionCount": " SESSIONS:"
                },
                "infoLabels": {
                  "dateStarted": "Date started",
                  "therapist": "Therapist",
                  "dateFinished": "Date finished",
                  "location": "Location",
                  "e-mail": "Email",
                  "address": "Address",
                  "dob": "DOB",
                  "phone": "Phone number",
                  "mbo": "MBO"
                },
                "session": {
                  "noNotes": "No notes",
                  "viewNotes": "View notes",
                  "collapse": "Collapse",
                  "addNote": "Add note",
                  "editNote": "Edit note",
                  "saveNote": "Save note",
                  "cancel": "Cancel",
                  "placeholder": "No notes yet."
                },
                "exitButton": "Exit",
                "noSessionsYet": "NO SESSIONS YET",
                "atSessionInfo": "at"
              }
            
        }
      },
      hr: {
        translation: {
            app: {
                "language": "hr",
                "languageLabel": "HRV"
            },
            admin: {
                "weekdays": {
                    "Sunday": "Nedjelja",
                    "Monday": "Ponedjeljak",
                    "Tuesday": "Utorak",
                    "Wednesday": "Srijeda",
                    "Thursday": "Četvrtak",
                    "Friday": "Petak",
                    "Saturday": "Subota"
                  },
                  "months": {
                      "January": "siječnja", 
                      "February": "veljače",
                      "March": "ožujka", 
                      "April": "travnja", 
                      "May": "svibnja", 
                      "June": "lipnja", 
                      "July": "srpnja", 
                      "August": "kolovoza", 
                      "September": "rujna", 
                      "October": "listopada", 
                      "November": "studenog", 
                      "December": "prosinca"
                    },
                  "extension1": ".",
                  "extension2": ".",
                  "extension3": ".",
                  "extension4": "." 
            },
            adminHeader: {
                calendar: "KALENDAR",
                verifications: "VERIFIKACIJE",
                manage: "UPRAVLJANJE",
                statistics: "STATISTIKA",
                logOut: "ODJAVA",
                logoAltText: "Logo"
              },
            adminCalendar: {
                "appointmentCalendarTitle": "Kalendar termina",
                "filtersDescription": "Koristite filtre za pretragu termina po pacijentu, djelatniku ili nazivu terapije.",
                "previousWeek": "Prethodni tjedan",
                "nextWeek": "Sljedeći tjedan",
                "filterAll": "Sve",
                "filterPatient": "Pacijent",
                "filterTherapist": "Djelatnik",
                "filterTherapyName": "Naziv terapije",
                "searchPlaceholder": "Pretraži...",
                "timeDateHeader": "Vrijeme / Datum",
                "weekdays": {
                    "Monday": "Ponedjeljak", 
                    "Tuesday": "Utorak", 
                    "Wednesday": "Srijeda", 
                    "Thursday": "Četvrtak", 
                    "Friday": "Petak"
                },
                "popupTherapist": "DJELATNIK:",
                "popupPatient": "PACIJENT:",
                "popupCannotReschedule": "Nije moguća odgoda",
                "reasonOne": "Termin je prošao.",
                "reasonTwo": "Termin je u sljedećih 48 sati.",
                "rescheduleCalendar": "ODGODI TERMIN"
              },
              adminFacilityCard: {
                editFacility: "UREDI",
                deleteFacility: "UKLONI",
                specialization: "SPECIJALIZACIJA:",
                capacity: "KAPACITET:",
                location: "LOKACIJA:",
                description: "OPIS:",
                resource: "RESURS:",
                sessions: "TERMINI:",
                relevantBody: "RELEVANTNI DIO TIJELA:",
                code: "KOD:",
                description2: "OPIS:"
              },
              adminManage: {
                therapistsTab: "Djelatnici",
                patientsTab: "Pacijenti",
                facilityTab: "Ustanova",
                searchPlaceholder: "Pretraži",
                resourcesSectionTitle: "RESURSI",
                therapiesSectionTitle: "TERAPIJE",
                addNewButton: "DODAJ",
                noItemsMatchQuery: "Nema stavki koje odgovaraju upitu."
              },
              adminStatistics: {
                therapists: "Djelatnici",
                resources: "Resursi",
                placeholder: "Pretraži",
                workHours: "RADNO VRIJEME NA TERMINIMA",
                pastMonth: "(PRETHODNIH 30 DANA)",
                patientsTreated: "NJEGOVANIH PACIJENATA",
                by: "",
                with: "",
                lifetime: "(ODUVIJEK)"
              },
              adminVerifications: {
                verificationsTitle: "Verifikacije",
                therapiesSectionTitle: "TERAPIJE",
                registrationsSectionTitle: "REGISTRACIJE"
              },
              adminVerificationCard: {
                request: "Zahtjev #",
                review: "Pregled"
              },
            adminVerificationPopup: {
                registration: "Registracija",
                therapy: "Terapija",
                requestNo: "Zahtjev #",
                userData: "KORISNIČKI PODATCI:",
                name: "Puno ime:",
                email: "Email:",
                address: "Adresa:",
                dob: "Datum rođenja:",
                phoneNumber: "Telefonski broj:",
                mbo: "MBO:",
                therapyID: "ID terapije:",
                duration: "Trajanje:",
                noOfSessions: "Broj termina:",
                sessions: "TERMINI:",
                collapse: "Sažmi",
                expand: "Proširi",
                requestWasMade: "Zahtjev je zaprimljen ",
                requestWillBe: "Zahtjev će zaprimiti identifikator User#",
                reasonRejection: "Razlog odbijanja",
                requestAccept: "Jeste li sigurni da želite odobriti ovaj zahtjev?",
                buttonApprove: "Odobri",
                buttonReject: "Odbij"
              },
            adminWelcome: {
                welcomeMessage: "Dobrodošli, admine!",
                calendarButton: "Kalendar",
                verificationsButton: "Verifikacije",
                manageButton: "Upravljanje"
              },
            AIChat: {
                firstTextMedBot: "Pozdrav! Ja sam MedBot i ovdje sam da Vam pomognem odgovoriti na bilo koje pitanje o našim terapijama!",
                firstTextBayBot: "Pozdrav! Ja sam BayBot i ovdje sam da Vam pomognem odgovoriti na bilo koje pitanje o korištenju naše stranice!",
                processing: "Obrađujem...",
                errorMessage: "Naišao sam na pogrešku pri spajanju na poslužitelj. Molim Vas da pokušate ponovno za par trenutaka!",
                assistant: "AI Pomoćnik",
                open: "Otvori ",
                question: "Postavite pitanje...",
                send: "Pošalji"
              },
            bodyPartSelection: {
                head: "glava",
                shoulder: "rame",
                arm: "ruka",
                "upper torso": "gornji trup",
                "lower torso": "donji trup",
                leg: "noga",
                hand: "šaka",
                foot: "stopalo",
                any: "bilo što"
              },
            customSelectInput: {
                select: "Odaberi "
              },
            deactivatePopup: {
                title: "Jeste li sigurni?",
                subtitle: "Ova radnja je nepovratna.",
                deactivateTextSelf: "Ako deaktivirate svoj račun, izgubit ćete pristup svom računu i svim svojim podacima i morat ćete se ponovno registrirati da biste zatražili nove terapije u budućnosti.",
                deactivateTextPatient1: "Ako deaktivirate ovaj račun ",
                deactivateTextPatient2: ", korisnik će izgubiti pristup svom računu i podacima i bit će uklonjen s liste.",
                deactivateTextTherapist1: "Ako deaktivirate ovaj račun ",
                deactivateTextTherapist2: ", korisnik će izgubiti pristup svom računu i podacima i bit će uklonjen s liste.",
                deactivateTextResource1: "Izbrišite ovaj resurs ",
                deactivateTextResource2: "samo ako nema zakazanih termina s ovim resursom i sigurni ste da ga želite trajno ukloniti.",
                deactivateTextTherapy1: "Izbrišite ovu terapiju ",
                deactivateTextTherapy2: "samo ako nema zakazanih termina za ovu terapiju i sigurni ste da je želite trajno ukloniti.",
                actionDelete: "UKLONI",
                actionDeactivate: "DEAKTIVIRAJ",
                actionDeleteCroatian: "UKLONITI",
                actionDeactivateCroatian: "DEAKTIVIRATI",
                buttonYes: "DA, ",
                buttonNo: "NE, NEMOJ "
              },
            adminEditPopup: {
                "titleAdd": "DODAJ",
                "titleEdit": "UREDI",
                "titleAccountData": "PODATKE O RAČUNU",
                "titlePatient": "PACIJENT",
                "titleTherapist": "DJELATNIK",
                "titleResource": "RESURS",
                "titleTherapy": "TERAPIJA",
                "buttonCancel": "ODUSTANI",
                "buttonSave": "SPREMI",
                "validation": {
                  "nameRequired": "Ime je obavezno.",
                  "surnameRequired": "Prezime je obavezno.",
                  "emailFormat": "Email mora biti u formatu 'nesto@nesto.domena'.",
                  "addressRequired": "Adresa je obavezna.",
                  "phoneDigits": "Mora sadržavati 9+ znamenki.",
                  "specializationRequired": "Specijalizacija je obavezna.",
                  "employedSinceFormat": "Mora biti u formatu YYYY-MM-DD.",
                  "passwordLength": "Lozinka mora imati 8+ znakova.",
                  "passwordMatch": "Lozinke se ne podudaraju.",
                  "locationRequired": "Lokacija je obavezna",
                  "digitsOnly": "Mora sadržavati samo znamenke",
                  "resourceRequired": "Resurs je obavezan.",
                  "descriptionRequired": "Opis je obavezan.",
                  "bodypartRequired": "Dio tijela je obavezan."
                },
                "incorrectPassword": "Netočna lozinka.",
                "changePassword": "Promijeni lozinku",
                "cancelEdit": "Odustani od uređivanja",
                "fieldRequired": "Polje je obavezno.",
                "bodyPartList": ["glava", "rame", "noga", "gornji dio trupa", "ruka", "noga", "donji dio trupa", "šaka", "bilo što"],
                "changePasswordNote": "Prvo unijeti trenutnu lozinku"
              },
              formFields: {
                "register": {
                  "firstName": {
                    "label": "Ime",
                    "placeholder": "Ivan"
                  },
                  "lastName": {
                    "label": "Prezime",
                    "placeholder": "Horvat"
                  }, 
                  "email": {
                    "label": "E-mail",
                    "placeholder": "ivan.horvat@mail.com"
                  },
                  "address": {
                    "label": "Adresa",
                    "placeholder": "Ime ulice 1"
                  },
                  "dateOfBirth": {
                    "label": "Datum rođenja",
                    "placeholder": "YYYY-MM-DD"
                  },
                  "phoneNumber": {
                    "label": "Telefonski broj",
                    "placeholder": "0912345678"
                  },
                  "MBO": {
                    "label": "MBO",
                    "placeholder": "123456789"
                  },
                  "password": {
                    "label": "Lozinka",
                    "placeholder": "********"
                  },
                  "passwordConfirm": {
                    "label": "Potvrdite lozinku",
                    "placeholder": "********"
                  }
                },
                "patient": {
                    "name": "Ime",
                    "surname": "Prezime",
                    "email": "E-mail",
                    "address": "Adresa",
                    "dateOfBirth": "Datum rođenja",
                    "phoneNumber": "Telefonski broj",
                    "mbo": "MBO",
                    "password": "Lozinka",
                    "confirmPassword": "Potvrdi lozinku",
                    "namePlaceholder": "Ivan",
                    "surnamePlaceholder": "Horvat",
                    "emailPlaceholder": "ivan.horvat@mail.com",
                    "addressPlaceholder": "Ime ulice 1",
                    "dobPlaceholder": "YYYY-MM-DD",
                    "phonePlaceholder": "0912345678",
                    "mboPlaceholder": "123456789",
                    "passwordPlaceholder": "********"
                  },
                  "therapist": {
                    "name": "Ime",
                    "surname": "Prezime",
                    "email": "E-mail",
                    "specialization": "Specijalizacija",
                    "employedSince": "Zaposlen od",
                    "password": "Lozinka",
                    "confirmPassword": "Potvrdi lozinku",
                    "namePlaceholder": "Ivan",
                    "surnamePlaceholder": "Horvat",
                    "emailPlaceholder": "ivan.horvat@mail.com",
                    "specializationPlaceholder": "Neki terapeut",
                    "employedSincePlaceholder": "YYYY-MM-DD",
                    "passwordPlaceholder": "********"
                  },
                  "resource": {
                    "name": "Ime",
                    "location": "Lokacija",
                    "specialization": "Specijalizacija",
                    "capacity": "Kapacitet",
                    "description": "Opis",
                    "namePlaceholder": "Neki resurs",
                    "locationPlaceholder": "Neka prostorija ili prostor",
                    "specializationPlaceholder": "Neki terapeut",
                    "capacityPlaceholder": "#",
                    "descriptionPlaceholder": "Ovaj resurs se koristi za neku vrstu terapije."
                  },
                  "therapy": {
                    "name": "Ime",
                    "resource": "Resurs",
                    "bodyPart": "Dio tijela",
                    "sessions": "Termini",
                    "code": "Kod",
                    "description": "Opis",
                    "namePlaceholder": "Neka vrsta terapije",
                    "resourcePlaceholder": "Neki resurs",
                    "bodyPartPlaceholder": "",
                    "sessionsPlaceholder": "#",
                    "codePlaceholder": "45G7E",
                    "descriptionPlaceholder": "Ova terapija koristi ovaj resurs i koristi se za liječenje ovakvih vrsta ozljeda."
                  }
            },
            login: {
                "formTitle": "Dobrodošli natrag!",
                "invalidCredentials": "Neispravna e-mail adresa ili lozinka. Pokušajte ponovno.",
                "notAuthorized": "Vaš račun još nije odobren. Molimo pokušajte ponovno kasnije.",
                "tryAgain": ". Molimo pokušajte ponovno.",
                "emailLabel": "E-mail:",
                "passwordLabel": "Lozinka:",
                "forgotPassword": "Zaboravljena lozinka?",
                "loginButton": "Prijava",
                "tagline": "Rehabilitation Redefined",
                "newHere": "Novi ste ovdje?",
                "registerButton": "Registrirajte se",
                "emailPlaceholder": "ivan.horvat@mail.com",
                "passwordPlaceholder": "********"
              },
            loginPasswordPopup: {
                "popupTitle": "Napišite svoju e-mail adresu kako bismo Vam poslali obrazac za promjenu lozinke:",
                "emailPlaceholder": "ivan.horvat@mail.com",
                "submitButton": "Podnesi",
                "success": "Uspjeh!",
                "resetLink": "Na vašu e-mail adresu uskoro će dospjeti obrazac za promjenu lozinke.",
                "close": "Zatvori"
              },
            noMatchRoute: {
                "error": "Error 404",
                "notFound": "Stranica nije pronađena.",
                "goBack": "Natrag",
                "toLogin": "Vrati me na prijavu"
              },
            patient: {
                "weekdays": {
                    "Sunday": "Nedjelja",
                    "Monday": "Ponedjeljak",
                    "Tuesday": "Utorak",
                    "Wednesday": "Srijeda",
                    "Thursday": "Četvrtak",
                    "Friday": "Petak",
                    "Saturday": "Subota"
                  },
                  "months": {
                      "January": "siječnja", 
                      "February": "veljače",
                      "March": "ožujka", 
                      "April": "travnja", 
                      "May": "svibnja", 
                      "June": "lipnja", 
                      "July": "srpnja", 
                      "August": "kolovoza", 
                      "September": "rujna", 
                      "October": "listopada", 
                      "November": "studenog", 
                      "December": "prosinca"
                    },
                  "extension1": ".",
                  "extension2": ".",
                  "extension3": ".",
                  "extension4": "." 
            },
            patientDash: {
                "mySchedule": "Moji termini:",
                "noSessionsThisWeek": "Nema termina ovaj tjedan.",
                "nextSession": "Sljedeći termin:",
                "selectedSession": "Odabrani termin:",
                "noUpcomingSessions": "Nema nadolazećih termina.",
                "noSessions": "Nema termina.",
                "viewMore": "Prikaži više",
                "therapist": "Terapeut:",
                "therapy": "Terapija:",
                "time": "Vrijeme:",
                "location": "Lokacija:",
                "sessionNumber": "Broj termina:",
                "viewLocationOnMap": "Prikaži lokaciju na karti",
                "closeMap": "Zatvori kartu",
                "viewNotes": "Pogledaj bilješke",
                "noNotesSoFar": "Zasad nema bilješki.",
                "reschedule": "Odgodi termin",
                "cannotReschedule": "Nemoguće odgoditi termin.",
                "appointmentInLess48Hours": "Termin je u sljedećih 48 sati.",
                "appointmentPassed": "Termin je prošao.",
                "sessionNotesTitle": "BILJEŠKE O TERMINU:",
                "session": "Termin"
              },
            patientHeader: {
                "brandName": "MedBay",
                "logOut": "ODJAVA",
                "logOutConfirmation": "ODJAVA?",
                "yes": "DA",
                "no": "NE",
                "theme": "TEMA",
                "language": "JEZIK",
                "myProfile": "MOJ PROFIL",
                "newTherapy": "NOVA TERAPIJA",
                "dashboard": "POČETNA"
              },
            patientNewTherapy: {
                "title": "ZAHTJEV ZA NOVU TERAPIJU",
                "step1Title": "KORAK 1: IZABERITE TERAPIJU",
                "step1Subtitle": "ili unesite kod terapije koji vam je dao Vaš liječnik:",
                "invalidCode": "Nevažeći kod.",
                "codePlaceholder": "#4JGSE",
                "filterBy": "FILTRIRAJ:",
                "searchPlaceholder": "Pretraži",
                "searchText": "Filtrirajte po dijelu tijela ili upotrijebite tražilicu kako biste pronašli terapiju.",
                "step2Title": "KORAK 2: IZBOR TERMINA",
                "pickedSessions": "ODABRANO:",
                "duration": "trajanje:",
                "oneDay": "dan",
                "moreDays": "dana",
                "croDay": "dan",
                "restrictions": "Ograničenja:",
                "sessionRestrictions": {
                  "firstRestriction1": "Odabrani termini moraju biti udaljeni barem ",
                  "firstRestriction2": "24 sata.",
                  "secondRestriction1": "Ukupno trajanje terapije ne smije prelaziti ",
                  "secondRestriction2": " dana.", 
                  "thirdRestriction1": "Termini se ne mogu zakazati više od ",
                  "thirdRestriction2": "3 mjeseca ",
                  "thirdRestriction3": "unaprijed."
                },
                "scheduleLegend1": "Sivo obojani datumi/vremena su nedostupni.",
                "scheduleLegend2": "Odabrani datumi/vremena označeni su ",
                "scheduleLegend3": "ljubičastom bojom i podebljani.",
                "step3Title": "KORAK 3: ZAVRŠNI KORAK",
                "reviewSectionTitle": "pregled:",
                "durationDays1": "trajanje: ",
                "durationDays2": " dana",
                "noOfSessions": "broj termina: ",
                "mySessions": "MOJI TERMINI",
                "collapse": "Sažmi",
                "expand": "Proširi",
                "verificationSectionTitle": "verifikacija:",
                "referralNumber": "Broj uputnice:",
                "referralPlaceholder": "123456789",
                "referralDescription1": "Jedinstveni slijed slova i znamenaka koji se nalaze na",
                "referralDescription2": "uputnici koju Vam je izdao liječnik.",
                "referralDescription3": "Ako ga ne možete naći, kontaktirajte svog liječnika.",    
                "doctorId": "ID liječnika (hlkid):",
                "doctorIdDescription1": "Jedinstveni slijed znamenaka koji identificira Vašeg liječnika ",
                "doctorIdDescription2": "u bazi zavoda za zdravstveno osiguranje.",
                "doctorIdDescription3": "Ako ga ne možete naći, kontaktirajte svog liječnika.",
                "verificationFailed": "Nevažeći broj uputnice ili hlkid.",
                "finishNote": "Kada vašu terapiju odobri admin, obavijestit ćemo Vas putem e-pošte.",
                "iUnderstand": "Razumijem",
                "cancelButton": "Odustani",
                "backButton": "Natrag",
                "nextButton": "Dalje",
                "finishButton": "Završi",
                "tagline": "RECOVERY BEGINS HERE.",
                "successPopup": {
                  "text1": "Unijeli ste sve podatke i vaš zahtjev za terapijom sada obrađuje naš administrator.",
                  "text2": "Kada vaš zahtjev bude odobren, obavijestit ćemo vas putem e-pošte i termini će se pojaviti na vašoj početnoj stranici.",
                  "buttonText": "Na početnu"
                }
              },
            patientProfile: {
                "userID": "(#User",
                "editAccountData": "Uredi podatke o računu",
                "deactivateAccount": "Deaktiviraj račun",
                "myTherapiesTitle": "Moje terapije:",
                "noTherapiesMessage1": "Još nemate terapija. ",
                "noTherapiesMessage2": "Prijavite se pritiskom na ",
                "noTherapiesMessage3": "NOVA TERAPIJA!",
                "noTherapiesMessage4": "",
                "emailLabel": "E-mail:",
                "addressLabel": "Adresa:",
                "dateOfBirthLabel": "Datum rođenja:",
                "phoneNumberLabel": "Telefonski broj:",
                "mboLabel": "MBO:",
                "therapyCard": {
                  "therapyCode": "KOD TERAPIJE",
                  "dateStarted": "DATUM POČETKA:",
                  "dateFinished": "DATUM ZAVRŠETKA:",
                  "totalSessions": "UKUPNO TERMINA:",
                  "viewMore": "Prikaži više"
                },
                "thankYouMessage": {
                  "title": "HVALA",
                  "subtitle": "ŠTO STE S NAMA VEĆ",
                  "oneDay": "DAN",
                  "moreDays": "DANA",
                  "oneMonth": "MJESEC",
                  "moreMonths": "MJESECA/I",
                  "oneYear": "GODINU",
                  "moreYears": "GODINE/A",
                  "alotOfTime": "VIŠE OD ",
                  "_comment_za_Lovru3": "funkcija za rješavanje problema mjeseca/mjeseci i godine/godina"
                },
                "uploadImageTooltip": {
                  "add": "Dodaj sliku profila",
                  "change": "Promijeni sliku profila"
                }
            },
            registerMain: {
                "alreadyHaveAccount": "Već imate korisnički račun?",
                "loginHere": "Prijavite se",
                "formTitle": "Registracija",
                "unexpectedError": "Greška",
                "emptyField": "Polje je obavezno.",
                "digitsChecker": "Samo znamenke.",
                "recaptchaChecker": "Potvrdite da niste robot.",
                "tryAgain": "Pokušajte ponovno.",
                "fields": {
                  "firstName": {
                    "label": "Ime",
                    "placeholder": "Ivan",
                    "errorMessage": "Ime je obavezno."
                  },
                  "lastName": {
                    "label": "Prezime",
                    "placeholder": "Horvat",
                    "errorMessage": "Prezime je obavezno."
                  },
                  "email": {
                    "label": "E-mail",
                    "placeholder": "ivan.horvat@mail.com",
                    "errorMessage": "E-mail mora biti u formatu 'ime@domena.com'."
                  },
                  "address": {
                    "label": "Adresa",
                    "placeholder": "Ulica 1",
                    "errorMessage": "Adresa je obavezna."
                  },
                  "dateOfBirth": {
                    "label": "Datum rođenja",
                    "placeholder": "YYYY-MM-DD",
                    "errorMessage1": "YYYY-MM-DD format.",
                    "errorMessage2": "Datum još nije prošao.",
                    "errorMessage3": "Starost je preko 150."
                  },
                  "phoneNumber": {
                    "label": "Telefonski broj",
                    "placeholder": "0912345678",
                    "errorMessage": "Najmanje 9 znamenki."
                  },
                  "MBO": {
                    "label": "MBO",
                    "placeholder": "123456789",
                    "errorMessage": "Točno 9 znamenki."
                  },
                  "password": {
                    "label": "Lozinka",
                    "placeholder": "********",
                    "errorMessage": "Najmanje 8 znakova."
                  },
                  "passwordConfirm": {
                    "label": "Potvrda lozinke",
                    "placeholder": "********",
                    "errorMessage": "Lozinke se ne podudaraju."
                  }
                },
                "togglePasswordText": "Prikaži/Sakrij lozinku",
                "registerButtonText": "Registracija",
                "successPopup": {
                  "text1": "Unijeli ste sve podatke i vaš račun sada obrađuje naš administrator.",
                  "text2": "Molimo provjeravajte svoj e-mail kako biste vidjeli je li vaš račun potvrđen ili postoje promjene koje trebate napraviti.",
                  "buttonText": "OK"
                },
                "greeting": "Where Healing Begins With Care."
              },
            reschedulePopup: {
                "popupTitle": "ODGODI TERMIN:",
                "currentSession": "TERMIN:",
                "newSession": "NOVI TERMIN:",
                "rescheduleButton": "Odgodi termin",
                "rescheduleLegend1": "Sivo obojani datumi/vremena su nedostupni ili popunjeni.",
                "rescheduleLegend2": "Odabrani datum i vrijeme su podebljani i ",
                "rescheduleLegend3": "naglašeni ljubičastom bojom.",
                "rescheduleLegend4": "Datumi u kojima ",
                "rescheduleLegendTernary1": "već imate ",
                "rescheduleLegendTernary2": "pacijent već ima ",
                "rescheduleLegend5": " zakazani drugi termin naglašeni su ",
                "rescheduleLegend6": "zelenim okvirom",
                "confirmation": {
                  "text": "Jeste li sigurni?",
                  "yes": "Da",
                  "no": "Ne"
                }
              },
            resetPassword: {
                "resetTitle": "Promjena lozinke",
                "newPassword": "Nova lozinka:",
                "confirmNew": "Potvrda nove lozinke:",
                "resetButton": "Promijeni lozinku",
                "failedText": "Neispravna e-mail adresa ili lozinka. Pokušajte ponovno.",
                "success": "Uspjeh!",
                "successMessage": "Vaša lozinka je uspješno promijenjena i možete se s njome prijaviti.",
                "takeToLogin": "Odvedi na prijavu",
                "eightPlusChar": "Lozinka mora imati barem osam znakova",
                "noMatch": "Lozinke se ne podudaraju"
              },
            sessionSelection: {
                "selectDateMessage1": "Odaberite datum za ",
                "selectDateMessage2": "pregled termina"
              },
            successPopup: {
                "success": "Uspjeh!"
              },
            tableList: {
                "headers": {
                    "patients": {
                        "#": "#",
                        "NAME": "IME",
                        "SURNAME": "PREZIME",
                        "E-MAIL": "E-MAIL",
                        "ADDRESS": "ADRESA",
                        "DOB": "DATUM ROĐ.",
                        "PHONE": "TELEFON",
                        "MBO": "MBO"
                    },
                    "therapists": {
                        "#": "#",
                        "NAME": "IME",
                        "SURNAME": "PREZIME",
                        "E-MAIL": "E-MAIL",
                        "SPECIALIZATION": "SPECIJALIZACIJA",
                        "EMPLOYED SINCE": "ZAPOSLEN OD",
                    }
                },
                "buttons": {
                  "edit": "UREDI",
                  "deactivate": "DEAKTIVIRAJ",
                  "details": "DETALJI",
                  "addNew": "DODAJ"
                },
                "messages": {
                  "noResults": "Nema stavki koje odgovaraju upitu."
                }
              },
            therapist: {
                "weekdays": {
                  "Sunday": "Nedjelja",
                  "Monday": "Ponedjeljak",
                  "Tuesday": "Utorak",
                  "Wednesday": "Srijeda",
                  "Thursday": "Četvrtak",
                  "Friday": "Petak",
                  "Saturday": "Subota"
                },
                "months": {
                    "January": "siječnja", 
                    "February": "veljače",
                    "March": "ožujka", 
                    "April": "travnja", 
                    "May": "svibnja", 
                    "June": "lipnja", 
                    "July": "srpnja", 
                    "August": "kolovoza", 
                    "September": "rujna", 
                    "October": "listopada", 
                    "November": "studenog", 
                    "December": "prosinca"
                  },
                "extension1": ".",
                "extension2": ".",
                "extension3": ".",
                "extension4": "." 
            },
            therapistDash: {
                "schedule": {
                  "title": "Moj raspored:",
                  "noUpcomingSessions": "Nema nadolazećih termina.",
                  "noSessionsThisWeek": "Nema termina ovaj tjedan.",
                  "nextSession": "Sljedeći termin:",
                  "selectedSession": "Odabrani termin:"
                },
                "sessionCard": {
                  "viewMore": "Prikaži više",
                  "therapy": "Terapija:",
                  "time": "Vrijeme:",
                  "location": "Lokacija:",
                  "sessionNumber": "Broj termina:",
                  "patient": "Pacijent:"
                },
                "notes": {
                  "title": "Vaša bilješka:",
                  "cancel": "Odustani",
                  "edit": "Uredi zapis",
                  "save": "Spremi",
                  "add": "Dodaj zapis",
                  "placeholder": "Trenutno nema bilješki.",
                  "disabledText": "Bilješku nije moguće dodati prije početka termina."
                },
                "popup": {
                  "close": "Zatvori",
                  "patientDetails": "Detalji o pacijentu",
                  "therapyDetails": "Detalji o terapiji"
                },
                "buttons": {
                  "goBackWeek": "Prošli tjedan",
                  "goForwardWeek": "Sljedeći tjedan",
                  "resetWeek": "Postavi na trenutni tjedan"
                },
                "messages": {
                  "noSessions": "Nema termina ovaj tjedan.",
                  "noNotes": "Trenutno nema bliješki."
                },
                "collapse": "Sažmi",
                "viewNotes": "Pregledaj bilješke",
                "rows1": {
                  "dateStarted": "datum početka",
                  "rows1Therapist": "terapeut",
                  "rows1DateFinished": "datum završetka",
                  "rows1location": "lokacija"
                },
                "rows2": {
                  "rows2Email": "email",
                  "rows2Address": "adresa",
                  "rows2DOB": "datum rođenja",
                  "rows2PhoneNumber": "telefonski broj",
                  "rows2MBO": "mbo"
                },
                "atSessionInfo": "u",
                "noNotes": "Nema bilješki"
              },
            therapistHeader: {
                "logoTitle": "MedBay",
                "navigation": {
                  "logOutConfirmation": "ODJAVA?",
                  "logOutYes": "DA",
                  "logOutNo": "NE",
                  "logOut": "ODJAVA",
                  "patients": "PACIJENTI",
                  "dashboard": "POČETNA"
                }
              },
            therapistPatients: {
                "title": {
                  "showing": "PRIKAZUJE SE:",
                  "allPatients": "REZULTATI PRETRAGE (svi pacijenti)",
                  "yourPatients": "VAŠI PACIJENTI"
                },
                "searchPlaceholder": "Pretraži",
                "popup": {
                  "patientType": "pacijent"
                }
              },
            therapyOrPatientPopup: {
                "popup": {
                  "therapy": "terapija",
                  "patient": "pacijent",
                  "sessionCount": "TERMINA:"
                },
                "infoLabels": {
                  "date started": "Datum početka",
                  "therapist": "Terapeut",
                  "date finished": "Datum završetka",
                  "location": "Lokacija",
                  "e-mail": "E-mail",
                  "address": "Adresa",
                  "dob": "Datum rođ",
                  "phone": "Telefon",
                  "mbo": "MBO"
                },
                "session": {
                  "noNotes": "Nema bilješki",
                  "viewNotes": "Bilješke",
                  "collapse": "Sažmi",
                  "addNote": "Dodaj zapis",
                  "editNote": "Uredi zapis",
                  "saveNote": "Spremi bilješku",
                  "cancel": "Odustani",
                  "placeholder": "Trenutno nema bilješki."
                },
                "exitButton": "Izlaz",
                "noSessionsYet": "Trenutno nema termina",
                "atSessionInfo": "u",
              }
        }
      }
    }
    });

export default i18n;