import { useState } from "react";

const PreferenceComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const options = ["Preference 1", "Preference 2", "Preference 3"];

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search preferences..."
          className="px-4 py-2 rounded-full border border-t5-black w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {options
          .filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(option)}
              className={`border rounded-full px-4 py-2 transition duration-200 ${
                selectedOption === option ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {option}
            </button>
          ))}
      </div>
    </div>
  );
};

export default PreferenceComponent; 