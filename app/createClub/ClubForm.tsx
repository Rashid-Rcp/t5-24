"use client";
import React, { use, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import ParticipantHolder from "@/components/DiscussionPodcast/ParticipantHolder";
import Dp from "@/components/Common/Dp";
import UserName from "@/components/Common/UserName";
import {
  IoAddCircleOutline,
  IoInformationCircleOutline,
  IoClose,
} from "react-icons/io5";
import { RiImageAddLine } from "react-icons/ri";
import Subtile from "@/components/Common/Subtile";
import ButtonSolid from "@/components/Common/ButtonSolid";
import Spacer from "@/components/Common/Spacer";
import UserSelect from "@/components/Common/UserSelect";
import { ClubFormData } from "@/Type/club";
import { ClubFormDataValidation } from "@/Type/club";

import { useQuery } from "@tanstack/react-query";
import { UserBasic } from "@/Type/user";
import { toast } from "react-toastify";
import PreferenceList from "@/components/DiscussionPodcast/PreferenceList";

export default function ClubForm() {


    const { data: userData } = useQuery({
      queryKey: ["user"],
      queryFn: async () => {
        const response = await axiosInstance.get('/user/head');
        return response.data;
      },
      refetchOnMount: false,
    });
 
  const [formData, setFormData] = useState<ClubFormData>({
    name: "",
    tagline: "",
    about: "",
    isPrivate: false,
    contributors: [],
    coverImage: null ,
    profileImage: null,
    languages: [],
    interestingAreas: [],
  });
  const [coverImage, setCoverImage] = useState< string >('/img/demo/bg-placeholder.webp');
  const [profileImage, setProfileImage] = useState< string>('/img/demo/bg-placeholder.webp');
  const [errors, setErrors] = useState<Partial<ClubFormDataValidation>>({});
  const [contributors, setContributors] = useState<UserBasic[]>([]);

 


  const createClubMutation = useMutation({
    mutationFn: (data: ClubFormData) => {
      const formDataToSend = new FormData();
      // Append all text fields
      formDataToSend.append('name', data.name);
      formDataToSend.append('tagline', data.tagline);
      formDataToSend.append('about', data.about);
      formDataToSend.append('isPrivate', data.isPrivate.toString());
      
      // Append contributors array
      data.contributors.forEach(contributorId => {
        formDataToSend.append('contributors[]', contributorId._id);
      });
       // Append interestingAreas array
      data.interestingAreas.forEach((area: string) => {
        formDataToSend.append('interestingAreas[]', area);
      });
      // Append languages array
      data.languages.forEach((language: string) => {
        formDataToSend.append('languages[]', language);
      });


      // Append files if they exist
      if (data.coverImage) {
        formDataToSend.append('coverImage', data.coverImage);
      }
      if (data.profileImage) {
        formDataToSend.append('profileImage', data.profileImage);
      }

      return axiosInstance.post("/club/create", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: (data:any) => {
      
        if(data.data.clubExist){
            setErrors({name: "Club with this name already exists"});
            toast.error("Club with this name already exists", {theme:"colored"});
        }
        if(data.data.success){
            toast.success("Club created.");
            //router.push(`/club/${data.club?.name}`);
        }
    //  toast.success("Club created successfully!");
      // Add navigation or reset form here
    },
    onError: (error) => {
     // toast.error("Failed to create club. Please try again.");
    },
  });

  const validateForm = () => {
    const newErrors: Partial<ClubFormDataValidation> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter a name";
    else if (!/^[a-zA-Z0-9_]+$/.test(formData.name)) newErrors.name = "Club name can only contain letters, numbers, and underscores";
    else if(formData.name.length < 3) newErrors.name = "Club name must be at least 3 characters long";
    else if(formData.name.length > 50) newErrors.name = "Club name must be less than 50 characters";
    
    if (!formData.tagline.trim()) newErrors.tagline = "Please enter a tag line";
    else if(formData.tagline.length < 3) newErrors.tagline = "Tag line must be at least 3 characters long";
    else if(formData.tagline.length > 250) newErrors.tagline = "Tag line must be less than 250 characters";

    if (!formData.about.trim()) newErrors.about = "Please enter about";
    else if(formData.about.length < 10) newErrors.about = "About must be at least 10 characters long";
    else if(formData.about.length > 500) newErrors.about = "About must be less than 500 characters";
    if(formData.languages.length===0) newErrors.languages = "Please select at least one language";
    if(formData.interestingAreas.length===0) newErrors.interestingAreas = "Please select at least one area";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    setErrors(newErrors);
   
    if (Object.keys(newErrors).length === 0) {
     createClubMutation.mutate(formData);
    }
  };
  const handleCoverImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setCoverImage(URL.createObjectURL(file));
        setFormData(prev => ({ ...prev, coverImage: file }));
      }

    };
    input.click();
  };
  const handleProfileImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setProfileImage(URL.createObjectURL(file));
        setFormData(prev => ({ ...prev, profileImage: file }));
      }

    };
    input.click();
  };
  const handleContributorSelect = (user: UserBasic) => {
    setFormData(prev => ({ ...prev, contributors: [...prev.contributors, user] }));
    setContributors([...contributors, user]);
  };
  const handleRemoveContributor = (userId: string) => {
    setFormData(prev => ({ ...prev, contributors: prev.contributors.filter(user => user._id !== userId) }));
    setContributors(contributors.filter(user => user._id !== userId));
  };

  const handleClear = () => {
    setFormData({
      name: "",
      tagline: "",
      about: "",
      isPrivate: false,
      contributors: [],
      languages: [],
      interestingAreas: [],
    });
    setErrors({});
  }
  const handleLanguagesSelected = (languages: string[]) => {
    setFormData(prev => ({ ...prev, languages }));
  };
  const handleAreasSelected = (areas: string[]) => {
    setFormData(prev => ({ ...prev, interestingAreas: areas }));
  };

  return (
    <>
      <div className="w-full h-40 rounded-lg overflow-hidden relative">
        <img
          src={coverImage}
          alt="club"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2">
          <button className="flex items-center gap-2 bg-t5-white border w-fit px-2 py-1 rounded-full" onClick={handleCoverImage}>
            <RiImageAddLine size={20} />
            <p className="text-t5-black text-sm">Add Cover Photo</p>
          </button>
        </div>
      </div>
      <Spacer size="sm" />
      <div className="flex gap-6">
        <div className="relative w-20 h-20">
          <img
            src={profileImage}
            alt="dp"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-t5-white border w-fit  rounded-full" onClick={handleProfileImage}>
            <IoAddCircleOutline size={25} />
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-6 max-w-lg">
          <div className="w-full relative">
            <Subtile title="Name" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
              }}
              placeholder="Enter Club Name"
              className={`border-b ${errors.name ? 'border-red-500' : 'border-t5-gray-200'} focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs absolute">{errors.name}</p>
            )}
          </div>
          <div className="relative">
            <Subtile title="Tag Line" />
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, tagline: e.target.value }));
                if (errors.tagline) setErrors(prev => ({ ...prev, tagline: "" }));
              }}
              placeholder="Enter Club Tag Line"
              className={`border-b ${errors.tagline ? 'border-red-500' : 'border-t5-gray-200'} focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full`}
            />
            {errors.tagline && (
              <p className="text-red-500 text-xs absolute">{errors.tagline}</p>
            )}
          </div>
          <div className="relative">
            <Subtile title="Contributors" />
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-2">
                <ParticipantHolder>
                  <Dp url={ userData?.profileImage } size="sm" />
                  <UserName name="You" size="sm" />
                </ParticipantHolder>
                {contributors.map((contributor) => (
                  <div className="relative" key={contributor._id}>
                  <ParticipantHolder>
                    <Dp url={contributor?.profileImage || null} size="sm" />
                    <UserName name={contributor.username} size="sm" />
                    <button 
                      onClick={() => handleRemoveContributor(contributor._id)}
                      className="absolute top-0 right-0 hover:bg-gray-100 rounded-full bg-t5-white "
                    >
                      <IoClose size={16} className="text-red-400" />
                    </button>
                  </ParticipantHolder>
                  </div>
                ))}
              </div>
              <div className="max-w-60 mb-4">
                <UserSelect
                  prefix="@"
                  onSelect={handleContributorSelect}
                  selectedUsers={formData.contributors.map(contributor => contributor._id)}
                  placeholder="Select contributors..."
                />
              </div>
            </div>
          </div>
          <div>
            <Subtile title="Private" />
            <div className="flex items-center justify-start gap-2 mt-2">
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-t5-gray-200 peer-focus:outline-none rounded-full border peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-t5-black"></div>
                  <span className="text-sm text-t5-black ms-2">
                    Make this club private
                  </span>
                </label>
              </div>
              <button className="group relative">
                <IoInformationCircleOutline
                  className="text-t5-gray-400"
                  size={20}
                />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-t5-black text-t5-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  Private clubs are only visible to invited members. Content and
                  discussions remain exclusive to the club members.
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Spacer size="sm" />
      <div className="w-full relative">
        <Subtile title="About" />
        <textarea
          value={formData.about}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, about: e.target.value }));
            if (errors.about) setErrors(prev => ({ ...prev, about: "" }));
          }}
          placeholder="Tell about your club"
          className={`w-full border-b ${errors.about ? 'border-red-500' : 'border-t5-gray-200'} focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent`}
        />
        {errors.about && (
          <p className="text-red-500 text-xs absolute">{errors.about}</p>
        )}
      </div>
      <Spacer size="sm" />
      <PreferenceList onLanguagesSelected={handleLanguagesSelected} onAreasSelected={handleAreasSelected} />
      {
        errors.languages && (
          <p className="text-red-500 text-xs ">{errors.languages}</p>
        )
      }
      {
        errors.interestingAreas && (
          <p className="text-red-500 text-xs ">{errors.interestingAreas}</p>
        )
      }
      <Spacer size="md" />

      <div className="flex items-center gap-2 justify-end">
        <ButtonSolid 
          text="Clear" 
          onClick={handleClear} 
        />
        <ButtonSolid 
          text={createClubMutation.isPending ? "Creating..." : "Create"}
          onClick={handleSubmit}
          disabled={createClubMutation.isPending}
        />
      </div>
    </>
  );
}
