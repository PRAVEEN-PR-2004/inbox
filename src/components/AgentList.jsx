import React, { useState } from "react";
import {
  MessageCircle,
  Calendar,
  MessageSquare,
  ChevronDown,
  Search,
} from "lucide-react";

export default function AgentList({ agents, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedDropdownAgent, setSelectedDropdownAgent] = useState("all");

  // Get unique agent names
  const uniqueAgents = [...new Set(agents.map((agent) => agent.agent))];

  const filteredAgents = agents.filter((agent) => {
    const matchesDropdown =
      selectedDropdownAgent === "all" || agent.agent === selectedDropdownAgent;
    const matchesSearch = agent.phone
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesDropdown && matchesSearch;
  });

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent.phone);
    onSelect(agent);
  };

  const handleDropdownChange = (e) => {
    setSelectedDropdownAgent(e.target.value);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* first section */}
      <div className="p-4 bg-white">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select Agent
        </label>
        <div className="relative mb-3">
          <select
            value={selectedDropdownAgent}
            onChange={handleDropdownChange}
            className="w-full p-2 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Agents</option>
            <option value="Agent1">Agent1</option>
            <option value="Agent2">Agent2</option>
          </select>
          <ChevronDown
            className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2"
            size={16}
          />
        </div>

        {/* Search Input */}
        {/* <div className="relative">
          <Search
            className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div> */}
      </div>

      {/* second section */}
      <div className="px-4 py-3 bg-white">
        <h3 className="text-base font-semibold text-gray-800">
          {selectedDropdownAgent === "all"
            ? "All Agents"
            : selectedDropdownAgent}{" "}
          Messages
        </h3>
      </div>

      {/* third section */}
      <div className="flex-1 p-4 overflow-y-auto bg-white">
        <div className="space-y-3">
          {filteredAgents.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No agents found matching your search.</p>
            </div>
          ) : (
            filteredAgents.map((agent, idx) => (
              <div
                key={idx}
                className={`p-3 mx-2 border cursor-pointer rounded-2xl transition-colors ${
                  selectedAgent === agent.phone
                    ? "border-blue-500 bg-blue-50"
                    : "border-black bg-indigo-50 hover:bg-indigo-100"
                }`}
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
                          ? "font-medium"
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
