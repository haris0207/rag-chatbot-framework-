// components/IndustrySelector.tsx
"use client";

import { useState } from "react";

// Define the available industries
const industries = [
  "customer_support",
  "healthcare",
  "finance",
"portfolio",  
];

interface IndustrySelectorProps {
  onIndustryChange: (industry: string) => void;
}

export default function IndustrySelector({ onIndustryChange }: IndustrySelectorProps) {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndustry = e.target.value;
    setSelectedIndustry(newIndustry);
    onIndustryChange(newIndustry);
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-t-lg border-b mb-2">
      <label htmlFor="industry-select" className="text-gray-700 font-medium">Select Industry:</label>
      <select
        id="industry-select"
        value={selectedIndustry}
        onChange={handleIndustryChange}
        className="border rounded-md px-3 py-1 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {industries.map(industry => (
          <option key={industry} value={industry}>
            {industry.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </option>
        ))}
      </select>
    </div>
  );
}
