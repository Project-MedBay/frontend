import React, { useState, useRef, useEffect } from "react"
import axios from "axios"
import s from "../styles/aiChat.module.css"

export default function AIChat(props) {
   
   const [chatOpen, setChatOpen] = useState(false)
   const [currentBot, setCurrentBot] = useState("medbot")
   const [chatInput, setChatInput] = useState("")
   const textAreaRef = useRef();

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
      if(event.keyCode == 13 && event.shiftKey == false) {
         handleSend(event)
      }
   }

   function handleSend(event) {
      event.preventDefault()
      setMessages(prevState => ({
         ...prevState,
         [currentBot]: [
            ...prevState[currentBot],
            {sender: "user", text: chatInput}
         ]
      }))
      setChatInput("")
      // axios poslat poruku
   }

   useEffect(() => {
      sessionStorage.setItem("medbay-ai-chat", JSON.stringify(messages))
   }, [messages])

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
         
         textAreaRef.current.style.height = `${Math.min(height, 96)}px`
      }
   }, [textAreaRef, chatInput])

   return (
      <div className={s.chat_main}>
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
            </div>
            <form className={s.chat_footer} onSubmit={handleSend}>
               <textarea className={s.chat_input} type="text" onChange={event => setChatInput(event.target.value)}
                        placeholder="Ask a question..." name="chat" value={chatInput} autoComplete="off" rows={1}
                        ref={textAreaRef} onKeyDown={event => handleKeyDown(event)}
               />
               <button className={`${s.chat_send} ${currentBot == "baybot" ? s.send_baybot : ""}`}>Send</button>
            </form>
         </div>}
      </div>
   )
}