"use client";
import React, { useState } from "react";
import SectionTitle from "../Sesction/SectionTitle";
import ModalWraper from "../Modal/ModalWraper";
import Subtile from "../Common/Subtile";
import ButtonSolid from "../Common/ButtonSolid";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
interface PreferenceProps {}

const Preference: React.FC<PreferenceProps> = () => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [interestingAreas, setInterestingAreas] = useState<string[]>([]);
  const [languageSearchQuery, setLanguageSearchQuery] = useState("");
  const [areaSearchQuery, setAreaSearchQuery] = useState("");

  const savePreferences  = useMutation({
    mutationFn: (data: { languages: string[]; interestingAreas: string[] }) => {
      return axiosInstance.post("/preferences", data);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

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

  const toggleSelection = (
    item: string,
    selectedItems: string[],
    setSelectedItems: (items: string[]) => void,
    availableItems: string[],
    setAvailableItems: (items: string[]) => void
  ) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
      setAvailableItems([...availableItems, item]);
    } else {
      setSelectedItems([...selectedItems, item]);
      setAvailableItems(availableItems.filter((i) => i !== item));
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

  const handleSubmit = () => {
    savePreferences.mutate({ languages, interestingAreas });
  };

  return (
    <ModalWraper width="w-1/2" close={false}>
      <div className="flex flex-col gap-2 items-center">
        <SectionTitle title="Personalized Preferences" />
        <p className="text-sm text-center mb-6">
          To help us tailor your experience and provide you with the best content,
          we need to know your language preferences and areas of interest.
        </p>
      </div>

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
              onClick={() =>
                toggleSelection(
                  lang,
                  languages,
                  setLanguages,
                  availableLanguages,
                  setAvailableLanguages
                )
              }
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
              onClick={() =>
                toggleSelection(
                  area,
                  interestingAreas,
                  setInterestingAreas,
                  availableAreas,
                  setAvailableAreas
                )
              }
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
       
        <div className="flex items-center justify-end">
          <ButtonSolid
            text="Save Preferences"
            isActive={true}
            disabled={languages.length === 0 || interestingAreas.length === 0}
            onClick={handleSubmit}
          />
        </div>
      
    </ModalWraper>
  );
};

export default Preference;
