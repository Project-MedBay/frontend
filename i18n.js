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
              }
        }
      }
    }
    });

export default i18n;