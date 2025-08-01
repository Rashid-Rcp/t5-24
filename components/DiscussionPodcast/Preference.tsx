"use client";
import React, { useState } from "react";
import SectionTitle from "../Sesction/SectionTitle";
import ModalWraper from "../Modal/ModalWraper";
import Subtile from "../Common/Subtile";
import ButtonSolid from "../Common/ButtonSolid";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import PreferenceList from "./PreferenceList";
interface PreferenceProps {}

const Preference: React.FC<PreferenceProps> = () => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [interestingAreas, setInterestingAreas] = useState<string[]>([]);

  const savePreferences  = useMutation({
    mutationFn: (data: { languages: string[]; interestingAreas: string[] }) => {
      return axiosInstance.post("/preferences", data);
    },
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = () => {
    if(languages.length===0 || interestingAreas.length===0){
      return
    }
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

      <PreferenceList onLanguagesSelected={setLanguages} onAreasSelected={setInterestingAreas} />
       
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
