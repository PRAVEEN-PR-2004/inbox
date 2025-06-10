import React from "react";

export default function SummaryPanel({ agent }) {
  // Generate simple summary text from agent messages
  const generateSummary = () => {
    if (!agent || !agent.messages || agent.messages.length === 0) {
      return "No conversation available to summarize.";
    }

    const messages = agent.messages;
    const totalMessages = messages.length;
    const userMessages = messages.filter((msg) => msg.sender === "user");
    const agentMessages = messages.filter((msg) => msg.sender !== "user");

    // Create a simple summary paragraph
    const summary = `This conversation with ${
      agent.phone
    } contains ${totalMessages} messages. The customer sent ${
      userMessages.length
    } messages and received ${
      agentMessages.length
    } responses. The conversation started with "${messages[0].text.substring(
      0,
      50
    )}..." and the most recent message was "${messages[
      messages.length - 1
    ].text.substring(
      0,
      50
    )}...". The discussion covered various topics and the agent provided assistance throughout the conversation.`;

    return summary;
  };

  return (
    <div className="flex flex-col p-5">
      <div>
        <h2 className="mb-2 text-lg font-semibold">
          WhatsApp Conversation summary
        </h2>
      </div>
      <div>
        <p className="text-sm text-gray-600">{generateSummary()}</p>
      </div>
    </div>
  );
}
