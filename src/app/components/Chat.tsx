"use client";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import useChat from "../hooks/useChat";

export default function Chat() {
  const { messages, sendMessage } = useChat("live-chat");

  return (
    <div className="text-black">
      <MessageList messages={messages.map((msg) => `${msg.sender}: ${msg.text}`)} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
}
