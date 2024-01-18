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
            adminHeader: {
                calendar: "CALENDAR",
                verifications: "VERIFICATIONS",
                manage: "MANAGE",
                statistics: "STATISTICS",
                logOut: "LOG OUT",
                logoAltText: "Logo"
              }, 
            adminCalendar: {
                weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
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
            "login": {
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
            "loginPasswordPopup": {
                "popupTitle": "Write your e-mail here and we will send you a form to reset your password:",
                "emailPlaceholder": "john.doe@mail.com",
                "submitButton": "Submit",
                "success": "Success!",
                "resetLink": "The link to reset your password will arrive to the supplied e-mail shortly.",
                "close": "Close"
              }
            
        }
      },
      hr: {
        translation: {
            adminHeader: {
                calendar: "KALENDAR",
                verifications: "VERIFIKACIJE",
                manage: "UPRAVLJANJE",
                statistics: "STATISTIKA",
                logOut: "ODJAVA",
                logoAltText: "Logo"
              },
              adminCalendar: {
                weekdays: ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"]
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
                relevantBody: "DIO TIJELA:",
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
                assistant: "AI Asistent",
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
            "login": {
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
            "loginPasswordPopup": {
                "popupTitle": "Napišite svoju e-mail adresu kako bismo Vam poslali obrazac za promjenu lozinke:",
                "emailPlaceholder": "ivan.horvat@mail.com",
                "submitButton": "Podnesi",
                "success": "Uspješno!",
                "resetLink": "Na vašu e-mail adresu uskoro će dospjeti obrazac za promjenu lozinke.",
                "close": "Zatvori"
              }
        }
      }
    }
    });

export default i18n;