"use client";
import React, { useState } from "react";
import Subtile from "../Common/Subtile";
type PreferenceListProps = {
  onLanguagesSelected: (languages: string[]) => void;
  onAreasSelected: (areas: string[]) => void;
};

const PreferenceList = ({
  onLanguagesSelected,
  onAreasSelected,
}: PreferenceListProps) => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [interestingAreas, setInterestingAreas] = useState<string[]>([]);
  const [languageSearchQuery, setLanguageSearchQuery] = useState("");
  const [areaSearchQuery, setAreaSearchQuery] = useState("");

  const [availableLanguages, setAvailableLanguages] = useState<string[]>([
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Italian",
    "Portuguese",
    "Japanese",
    "Russian",
    "Arabic",
    "Hindi",
    "Korean",
    "Turkish",
    "Dutch",
    "Swedish",
  ]);

  const [availableAreas, setAvailableAreas] = useState<string[]>([
    "Technology",
    "Art",
    "Science",
    "Sports",
    "Music",
    "Health",
    "Business",
    "Education",
    "Travel",
    "Food",
    "Gaming",
    "History",
    "Literature",
    "Politics",
    "Environment",
  ]);

  const toggleSelection = (item: string, type: string) => {
    if (type === "languages") {
      if (languages.includes(item)) {
        // Remove from selected languages
        const updatedLanguages = languages.filter((i) => i !== item);
        setLanguages(updatedLanguages);
        setAvailableLanguages([...availableLanguages, item]);
        onLanguagesSelected(updatedLanguages);
      } else {
        // Add to selected languages
        const updatedLanguages = [...languages, item];
        setLanguages(updatedLanguages);
        setAvailableLanguages(availableLanguages.filter((i) => i !== item));
        onLanguagesSelected(updatedLanguages);
      }
    } else {
      if (interestingAreas.includes(item)) {
        // Remove from selected areas
        const updatedAreas = interestingAreas.filter((i) => i !== item);
        setInterestingAreas(updatedAreas);
        setAvailableAreas([...availableAreas, item]);
        onAreasSelected(updatedAreas);
      } else {
        // Add to selected areas
        const updatedAreas = [...interestingAreas, item];
        setInterestingAreas(updatedAreas);
        setAvailableAreas(availableAreas.filter((i) => i !== item));
        onAreasSelected(updatedAreas);
      }
    }
  };

  const handleLanguageSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLanguageSearchQuery(e.target.value.toLowerCase());
  };

  const handleAreaSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAreaSearchQuery(e.target.value.toLowerCase());
  };

  const filteredLanguages = [
    ...languages,
    ...availableLanguages.filter((lang) =>
      lang.toLowerCase().includes(languageSearchQuery)
    ),
  ].slice(0, 10);

  const filteredAreas = [
    ...interestingAreas,
    ...availableAreas.filter((area) =>
      area.toLowerCase().includes(areaSearchQuery)
    ),
  ].slice(0, 10);

  return (
    <>
      <div className="mb-6 flex flex-col gap-2">
        <Subtile title="Preferred Languages" />
        <input
          type="text"
          placeholder="Search languages..."
          value={languageSearchQuery}
          onChange={handleLanguageSearchChange}
          className="rounded-full bg-t5-white-lite appearance-none border border-t5-black w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <div className="flex flex-wrap gap-2">
          {filteredLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => toggleSelection(lang, "languages")}
              className={`py-2 px-3 border rounded-full transition-all text-xs ${
                languages.includes(lang)
                  ? "bg-t5-black text-t5-white-lite"
                  : "bg-t5-white-lite text-t5-black border-gray-400 hover:bg-gray-200"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-2">
        <Subtile title="Areas of Interest" />
        <input
          type="text"
          placeholder="Search interesting areas..."
          value={areaSearchQuery}
          onChange={handleAreaSearchChange}
          className="rounded-full bg-t5-white-lite appearance-none border border-t5-black w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <div className="flex flex-wrap gap-2">
          {filteredAreas.map((area) => (
            <button
              key={area}
              onClick={() => toggleSelection(area, "areas")}
              className={`py-2 px-3 border rounded-full transition-all text-xs ${
                interestingAreas.includes(area)
                  ? "bg-t5-black text-t5-white-lite"
                  : "bg-t5-white-lite text-t5-black border-gray-400 hover:bg-gray-200"
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default PreferenceList;
