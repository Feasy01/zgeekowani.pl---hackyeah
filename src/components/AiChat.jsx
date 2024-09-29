import { useState, useEffect } from "react"
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";


export default function AiChat() {
    const [input, setInput] = useState([]);
    const [messages, setMessages] = useState([]);

    function addMessage(newMessage) {
        setInput([...input, newMessage]);
    }

    function renderMessages() {
        return input.map((message, index) => {
            return (
                <Message
                    style={{ fontSize: 16 }}
                    key={index}
                    model={{
                        message: message.message,
                        sentTime: "just now",
                        sender: "Joe",
                    }}
                />
            );
        });
    }

    useEffect(() => {
        setMessages(renderMessages());
    }, [input]);

    return (
        <div style={{ position: "relative", height: "500px", width: "400px", boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)", borderRadius: 20 }}>
            <MainContainer style={{ height: "100%", background: "white", borderRadius: 20, padding: 20 }}>
                <ChatContainer>
                    <MessageList>
                        {messages}
                    </MessageList>
                    <MessageInput attachDisabled style={{ fontSize: 16 }} placeholder="Type message here" onSend={addMessage} />
                </ChatContainer>
            </MainContainer>
        </div>
    );
};