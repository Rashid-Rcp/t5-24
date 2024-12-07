import React from 'react'
import Subtile from '../Common/Subtile';
import SectionTitle from '../Sesction/SectionTitle';

interface ProfileAboutProps {
  createdDate?: string;
  aboutContent?: string;
  interests?: string[];
}

export default function ProfileAbout({ 
  createdDate = "January 1, 2024",
  aboutContent = "Hi there! I'm a software developer passionate about creating amazing web experiences. I love working with React, TypeScript, and exploring new technologies.",
  interests = ["Programming", "Web Development", "Open Source", "UI/UX Design", "Tech Gadgets"]
}: ProfileAboutProps) {
  return (
    <div className="space-y-6 p-4">
      <div>
        <SectionTitle title='Member Since'/>
        <p className="text-gray-600 text-sm">{createdDate}</p>
      </div>
      
      <div>
      <SectionTitle title='About'/>

        <p className="text-gray-600 text-sm">{aboutContent}</p>
      </div>
      
      <div>
        <SectionTitle title='Interests'/>
        <ul className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <li 
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700"
            >
              {interest}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
