import Message from "./Message";

interface MessageListProps {
  messages: string[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <ul className="list-none p-0">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </ul>
  );
}
