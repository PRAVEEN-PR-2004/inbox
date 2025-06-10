import React, { useState } from "react";
import {
  MessageCircle,
  Calendar,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

export default function AgentList({ agents, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");

  const filteredAgents = agents.filter((agent) =>
    agent.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent.phone);
    onSelect(agent);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* first section */}
      <div className="p-4 bg-white ">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select Agent
        </label>
        <div className="relative">
          <select className="w-full p-2 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Agent Name</option>
          </select>
          <ChevronDown
            className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2"
            size={16}
          />
        </div>
      </div>

      {/* second section */}
      <div className="px-4 py-3 bg-white ">
        <h3 className="text-base font-semibold text-gray-800">
          "Agent Name" Messages
        </h3>
      </div>

      {/* third section */}
      <div className="flex-1 p-4 overflow-y-auto bg-white ">
        <div className="space-y-3">
          {filteredAgents.map((agent, idx) => (
            <div
              key={idx}
              className="p-3 mx-2 border border-black cursor-pointer bg-indigo-50 rounded-2xl"
              onClick={() => handleAgentSelect(agent)}
            >
              {/* Phone Icon and Number */}
              <div className="flex items-center mb-2">
                <MessageCircle className="mr-2 text-gray-700" size={16} />
                <div className="text-sm font-semibold text-gray-800">
                  {agent.phone}
                </div>
              </div>

              {/* Date/Time (Left) and Reply Count (Right) in single line */}
              <div className="flex items-center justify-between ml-6 text-xs">
                {/* Date and Time - Left Side */}
                <div className="flex items-center text-gray-600">
                  <Calendar className="mr-1" size={12} />
                  <span>
                    {agent.date} | {agent.time}
                  </span>
                </div>

                {/* Reply Count - Right Side */}
                <div className="flex items-center">
                  <MessageSquare className="mr-1" size={12} />
                  <span
                    className={`${
                      agent.messages.length > 0
                        ? " font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {agent.messages.length > 0
                      ? `${agent.messages.length} reply`
                      : "No reply"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
