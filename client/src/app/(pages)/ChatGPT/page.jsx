"use client";
import TopicHeader from "@/app/components/Topic/TopicHeader";
import { useState } from "react";

const DESC = `
    A K-puzzle AI game.
`

const MESSAGES = [{
    sender: 'GPT',
    message: 'Esta es la respuesta del bot.',
}, {
    sender: 'Tú',
    message: 'Esta es la respuesta del usuario.'
}, {
    sender: 'Tú',
    message: 'Esta es la respuesta del usuario y es una respuesta muy larga para ver que no se rompe nada.'
}]

const ChatGPT = ({ }) => {
    const [messages, setMessages] = useState(MESSAGES);

    const onSend = (e) => {
        e.preventDefault();
        const message = e.target.message.value.trim();
        if (message === '') return
        e.target.message.value = '';
        const copyMessages = messages.slice(0);
        copyMessages.push({
            sender: 'Tú',
            message: message
        })
        copyMessages.push({
            sender: 'GPT',
            message: 'Hola, ¿cómo estás?'
        })
        setMessages(copyMessages)
    }

    return (
        <>
            <main>
                <article className="text-[#ffffff] pb-10">
                    <TopicHeader title="ChatGPT 2.0" description={DESC} />
                    <ul>
                        {messages.map((message, index) =>
                            <li className="messageBot" key={index}>
                                <span>{message.sender}</span>
                                <span>{message.message}</span>
                            </li>
                        )}
                    </ul>
                </article>
            </main>
            <form onSubmit={onSend}>
                <input type="text" name="message" placeholder="Escribe tu mensaje aquí ..." />
                <button> Enviar </button>
            </form>
        </>
    )
}

export default ChatGPT;