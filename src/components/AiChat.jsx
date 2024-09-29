import { useEffect, useState } from "react"
import "react-chat-elements/dist/main.css"
import { MessageList, MessageBox } from "react-chat-elements"
import { Input, Button } from 'antd';
import { IoSendSharp } from "react-icons/io5";
import { PulseLoader } from 'react-spinners'
import { BiFontFamily } from "react-icons/bi";


const { TextArea } = Input;

export default function AiChat() {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");

    const [callingModel, setCallingModel] = useState(false);

    async function callModelAPI() {

        // Logika, call do API -------------------------

        // Wiadomość zwrotna z modelu ------------------
        const message = {
            position: 'left',
            type: 'text',
            text: "test output...",
            title: "Bot",
            className: "bot-message"
        }

        //Do zmiany jak będzie request do API
        setTimeout(() => {
            setCallingModel(false);
            setMessages([...messages, message]);
        }, 1000)
    }

    function addMessage(text, position, title = null, type) {
        if (text === "") {
            return
        }
        const message = {
            position: position,
            type: 'text',
            title: title,
            text: text,
            className: type
        }
        setMessages([...messages, message]);
        setUserMessage("")

        setCallingModel(true);

        console.log(results)
    }

    useEffect(() => {
        if (callingModel)
            callModelAPI();
    }, [callingModel]);

    return (
        <div style={{ boxShadow: "0 4px 5px 0 rgba(0, 0, 0, .5)" }}>
            <div className="message-list-container" style={{ height: "500px", maxHeight: "500px", width: "400px", backgroundColor: "#E2E2E2", overflow: 'scroll', overflowX: 'hidden' }}>
                <MessageList
                    className='message-list'
                    lockable={false}
                    toBottomHeight={'100%'}
                    dataSource={messages}
                />
                <PulseLoader
                    color={'#5B7FFF'}
                    loading={callingModel}
                    size={8}
                    style={{ padding: 10 }}
                />
            </div>
            <div style={{ background: "#F3F1F1", width: "100%", height: "54px", display: "flex", flexDirection: "row", justifyContent: "center", }}>
                <div style={{ width: "100%", background: "#F3F1F1" }}>
                    <TextArea placeholder="Type here..."
                        value={userMessage}
                        style={{ borderRadius: 0, background: "#F3F1F1", border: "none" }}
                        onChange={(e) => setUserMessage(e.target.value)}
                        autoSize={{ minRows: 2, maxRows: 2 }} />
                </div>
                <Button
                    icon={<IoSendSharp />}
                    style={{ borderRadius: 0, height: "54px", width: "54px", background: "#5B7FFF", border: "none", color: "white" }}
                    onClick={() => { addMessage(userMessage, "right", "You", "user-message") }} title="Send" />
            </div>
        </div >
    );
};