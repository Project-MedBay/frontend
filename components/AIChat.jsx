import React, { useState, useRef, useEffect } from "react"
import axios from "axios"
import s from "../styles/aiChat.module.css"

export default function AIChat(props) {
   const {userToken, theme} = props

   const darkModeClass = theme === 'dark' ? s.dark : '';

   const [chatOpen, setChatOpen] = useState(false)
   const [currentBot, setCurrentBot] = useState("medbot")
   const [chatInput, setChatInput] = useState("")
   const [inputDisabled, setInputDisabled] = useState(false)
   const textAreaRef = useRef()
   const messagesEndRef = useRef(null)

   const [messages, setMessages] = useState(() =>{
      return sessionStorage.getItem("medbay-ai-chat") != null ? JSON.parse(sessionStorage.getItem("medbay-ai-chat")) : {
         medbot: [{
            sender: "bot",
            text: "Hello! I am MedBot and I am here to help answer any of your questions regarding the therapies we offer!"
         }],
         baybot: [{
            sender: "bot",
            text: "Hello! I am BayBot and I am here to help answer any of your questions regarding the use of this site!"
         }]
      }
   })

   const messageElements = messages[currentBot].map(message => (
      <div className={message.sender == "bot" ? s["message_" + currentBot] : s.message_user}>
         <p className={s.message_text}>{message.text}</p>
      </div>
   ))

   function switchBot(event) {
      setCurrentBot(prevState => prevState == "medbot" ? "baybot" : "medbot")
      event.stopPropagation()
   }

   function handleKeyDown(event) {
      if(event.keyCode == 13 && event.shiftKey == false && chatInput != "" && !/^\s+$/.test(chatInput)) {
         handleSend(event)
      }
   }

   function handleSend(event) {
      event.preventDefault()
      if (inputDisabled) return
      setMessages(prevState => ({
         ...prevState,
         [currentBot]: [
            ...prevState[currentBot],
            {sender: "user", text: chatInput},
            {sender: "bot", text: "Processing..."}
         ]
      }))
      setInputDisabled(true)
      axios({
         url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/user/chat",
         method: "POST",
         headers: {
            Authorization: "Bearer " + userToken         // korisnikov access token potreban za dohvacanje podataka iz baze
         },
         data: {
            message: chatInput,
            chatHistory: messages[currentBot].slice(1).map(message => message.text),
            medBot: currentBot == "medbot"
         }
      })
      .then(res => {
         setMessages(prevState => ({
            ...prevState,
            [currentBot]: [
               ...prevState[currentBot].filter(msg => (msg.sender != "bot" || msg.text != "Processing...")),
               {sender: "bot", text: res.data}
            ]
         }))
         setInputDisabled(false)
      })
      .catch(error => console.log(error));
      setChatInput("")
   }

   useEffect(() => {
      sessionStorage.setItem("medbay-ai-chat", JSON.stringify(messages))
   }, [messages])

   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })    // scroll smoothly on new message
   }, [messages])

   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" })   // scroll instantly on chat open/bot switch
   }, [chatOpen, currentBot])

   useEffect(() => {
      if (textAreaRef.current != null) {
         textAreaRef.current.style.height = "0px"

         const computed = window.getComputedStyle(textAreaRef.current);

         // Calculate the height
         const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                 + (parseInt(computed.getPropertyValue('padding-top'), 10) / 4)
                 + textAreaRef.current.scrollHeight
                 + (parseInt(computed.getPropertyValue('padding-bottom'), 10) / 4)
                 + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
         
         textAreaRef.current.style.height = height + "px"
      }
   }, [textAreaRef, chatInput])

   return (
      <div className={`${s.chat_main} ${darkModeClass}`}>
         <div className={`${s.chat_header} ${chatOpen ? s.expanded : ""}`} onClick={() => setChatOpen(prevState => !prevState)}>
            <h3 className={s.header_title}>
               {!chatOpen ? "AI Assistant" : currentBot == "medbot" ? "MedBot" : "BayBot"}
            </h3>
            {chatOpen &&
               <button className={s["header_" + currentBot]} onClick={event => switchBot(event)}>
                  Open {currentBot == "medbot" ? "BayBot" : "MedBot"}
               </button>
            }
         </div>

         {chatOpen && <div className={s.chat_contents}>
            <div className={s.messages_container}>
               {messageElements}
               <div ref={messagesEndRef}></div>    {/* dummy div to scroll new messages */}
            </div>
            <form className={s.chat_footer} onSubmit={handleSend}>
               <textarea className={`${s.chat_input} ${inputDisabled ? s.input_disabled : ""}`} type="text"
                        onChange={event => setChatInput(event.target.value)} placeholder="Ask a question..." name="chat" value={chatInput}
                        autoComplete="off" rows={1} ref={textAreaRef} onKeyDown={event => handleKeyDown(event)}
               />
               <button className={`${s.chat_send} ${currentBot == "baybot" ? s.send_baybot : ""}`}>Send</button>
            </form>
         </div>}
      </div>
   )
}