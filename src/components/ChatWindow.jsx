import React from "react";
import { Navigation } from "lucide-react";

export default function ChatWindow({ agent }) {
  return (
    <div className="flex flex-col h-full max-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="p-4 bg-white">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          WhatsApp Conversation with {agent.phone}
        </h2>

        <div className="flex space-x-3">
          <button className="px-4 py-2 text-sm text-gray-700 transition-colors bg-gray-200 rounded-full hover:bg-gray-300">
            Mark Resolved
          </button>
          <button className="flex items-center px-4 py-2 space-x-1 text-sm text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600">
            <span>Start new convo</span>
            <Navigation size={16} />
          </button>
        </div>
      </div>

      {/* Message Conversation Header */}
      <div className="px-4 py-3 bg-white">
        <h3 className="text-sm font-medium text-gray-700">
          Message Conversation
        </h3>
      </div>

      {/* Messages Container */}
      <div className="flex-1 min-h-0 p-4 overflow-y-auto bg-white">
        <div className="space-y-4">
          {agent.messages.map((msg, idx) => (
            <div key={idx} className="space-y-2">
              <div
                className={`flex ${
                  msg.sender === "user" ? "justify-start" : "justify-end"
                }`}
              >
                <div className="max-w-[70%] p-3 rounded-lg relativ bg-blue-100 text-gray-800 shadow-sm">
                  {msg.sender === "user" && (
                    <div className="flex items-center mb-2">
                      <Navigation size={14} className="mr-1 text-green-500" />
                      <span className="text-xs font-bold">{msg.time}</span>
                    </div>
                  )}

                  {msg.sender !== "user" && (
                    <div className="flex items-center justify-end mt-2 space-x-1">
                      <span className="text-xs font-bold">{msg.time}</span>
                      <Navigation size={14} className="text-green-500" />
                    </div>
                  )}
                  <div className="text-sm leading-relaxed text-gray-500">
                    {msg.text}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="p-4 bg-white">
        <div className="flex px-4 py-2 rounded-lg shadow-md bg-gray-50">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 font-bold text-black placeholder-gray-500 border-0 bg-gray-50 focus:outline-none"
          />
          <button className="px-2 font-bold text-blue-500 transition-colors bg-white hover:bg-gray-50">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
