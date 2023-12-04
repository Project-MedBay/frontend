import React, { useState } from "react"
import axios from "axios"
import s from "../styles/login.module.css"

export default function LoginMain(props) {

   const [formData, setFormData] = useState({         // state za sadrzaj formi, ne koristimo default formdata
      email: "",
      password: ""
   })
   const [inputFailed, setInputFailed] = useState({         // state za gresku pri unosu forme (on submit)
      value: false,
      text: "Invalid email or password. Please try again."
   })

   function handleChange(event) {                  // funkcija za updateanje sadrzaja input polja, osigurava konzistentnost
      const {name, value} = event.target
      setFormData(prevFormData => {
          return {
              ...prevFormData,
              [name]: value
          }
      })
  }

   function handleSubmit(event) {               // submit - axios poziv na odgovarajuci url za obradu na backendu
      event.preventDefault()
      axios({
         url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/security/login",
         method: "POST",
         data: formData
      })
      .then(res => res.status == 200 && handleLogIn(res.data.accessToken))       // uspjeh - handleLogin
      .catch(error => handleError(error));                                       // greska (na backu) - handleError
   }

   function handleLogIn(token) {          // preko propsa updateamo stanje u stateovima na visoj razini (App)
      props.setUserToken(token)
      props.navigate("patientDash")
   }

   function handleError(error) {          // ispisuje error u konzoli, ako je error code 403 (bad request - forbidden) znaci da baza nije dopustila unos
      console.log(error)                  // i ispisuje se poruka o pogresnom unosu, inace ako je doslo do neke druge greske se ispisuje error message
      error.response.status == 403 ?
      setInputFailed({value: true, text: "Invalid email or password. Please try again."})
      : setInputFailed({value: true, text: `${error.message}. Please try again.`})
   }

   return (
         <div className={s.login_main}>

            <form className={s.login_form} onSubmit={handleSubmit} autoComplete="off">
               <h1 className={s.form_title}>Welcome back!</h1>
               <p className={`${s.login_failed} ${inputFailed.value && s.failed_text}`}>        {/* uvjetno dodajemo klasu koja cini poruku o gresci vidljivom */}
                  {inputFailed.text}
               </p>

               <div className={s.form_input}>         {/* prvo od dva input polja, takoder imaju uvjetnu klasu za gresku, tekst polja odgovara sadrzaju statea formData */}
                  <p className={s.input_text}>E-mail:</p>
                  <input
                     className={`${s.input_box} ${inputFailed.value && s.failed_input}`}
                     type="text" onChange={handleChange} placeholder="john.doe@mail.com"
                     name="email" value={formData["email"]}
                  />
               </div>

               <div className={s.form_input}>
                  <p className={s.input_text}>Password:</p>
                  <input
                     className={`${s.input_box} ${inputFailed.value && s.failed_input}`}
                     type="text" onChange={handleChange} placeholder="********"
                     name="password" value={formData["password"]}
                  />
               </div>

               <button className={s.form_button}>Login</button>
            </form>

            <div className={s.extras}>
               <h1 className={s.tagline}>Rehabilitation<br />Redefined</h1>
               
               <div className={s.register_container}>
                  <p className={s.register_q}>You're new here?</p>
                  <button className={s.register_button}
                     onClick={() => props.navigate("register")}>Register now           {/* uporaba prop funkcije za navigaciju */}
                  </button>
               </div>
            </div>

         </div>
    )
}