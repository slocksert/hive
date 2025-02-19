import { useEffect, useState } from "react";
import Ably from "ably";

interface ChatMessage {
  sender: string;
  text: string;
}

export default function useChat(channelName: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Conexão com ably 
  useEffect(() => {
    async function initializeAbly() {
      try {
        const response = await fetch("/api/auth");
        const tokenRequest = await response.json();

        const ablyClient = new Ably.Realtime({
          authCallback: (tokenParams, callback) => {
            callback(null, tokenRequest);
          },
        });

        const channel = ablyClient.channels.get(channelName);
        channel.subscribe("first", (msg) => {
          setMessages((prev) => [...prev, msg.data]);
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }

    initializeAbly();
  }, [channelName]);

  const sendMessage = async (text: string) => {
    try {
      const ablyClient = new Ably.Realtime({ authUrl: "/api/auth" });
      const channel = ablyClient.channels.get(channelName);
      const message: ChatMessage = { sender: "User", text };

      await channel.publish("first", message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { messages, sendMessage };
}
