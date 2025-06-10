import React, { useState } from "react";
import { ArrowLeft, Phone, MessageSquare } from "lucide-react";
import messagesData from "../data/messages.json";
import AgentList from "./AgentList";
import ChatWindow from "./ChatWindow";
import SummaryPanel from "./SummaryPanel";

export default function InboxLayout() {
  const [selectedAgent, setSelectedAgent] = useState(messagesData[0]);
  const [search, setSearch] = useState("");

  const filteredAgents = messagesData.filter((msg) =>
    msg.agent.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen max-h-screen bg-sky-50">
      <div className="flex-shrink-0 px-6 py-4 bg-sky-50">
        <div className="flex items-center py-4 mb-6 space-x-3 border-b">
          <ArrowLeft className="text-gray-600 cursor-pointer" size={20} />
          <h1 className="text-xl font-semibold text-gray-800">Inbox</h1>
        </div>

        <div className="flex-shrink-0 border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center p-2 space-x-2 bg-white rounded-lg">
              <button className="flex items-center px-4 py-2 space-x-2 text-gray-700 transition-colors bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-50">
                <Phone size={16} className="text-blue-500" />
                <span className="text-sm font-medium">Voice calls</span>
              </button>
              <button className="flex items-center px-4 py-2 space-x-2 text-gray-700 transition-colors bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-50">
                <MessageSquare size={16} className="text-blue-500" />
                <span className="text-sm font-medium">Messenger</span>
              </button>
              <button className="flex items-center px-4 py-2 space-x-2 border border-blue-500 rounded-full shadow-sm bg-blue-50">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-semibold">WhatsApp</span>
              </button>
            </div>

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 min-h-0 px-6 pb-6 space-x-4">
        {/* Left sidebar - Agent List */}
        <div className="w-1/4 overflow-hidden bg-white rounded-lg shadow-sm">
          <AgentList agents={filteredAgents} onSelect={setSelectedAgent} />
        </div>

        {/* Center - Chat Window */}
        <div className="w-2/4 overflow-hidden bg-white rounded-lg shadow-sm">
          <ChatWindow agent={selectedAgent} />
        </div>

        {/* Right sidebar - Summary Panel */}
        <div className="w-1/4 overflow-hidden bg-white rounded-lg shadow-sm">
          <SummaryPanel />
        </div>
      </div>
    </div>
  );
}
