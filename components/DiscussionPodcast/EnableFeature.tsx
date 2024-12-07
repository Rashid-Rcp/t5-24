import React from "react";
import Subtile from "../Common/Subtile";

export default function EnableFeature({ 
  title, 
  description, 
  checked = false, 
  onChange 
}: { 
  title: string, 
  description: string,
  checked?: boolean,
  onChange: (checked: boolean) => void
}) {
  return (
    <div className="w-1/4 min-w-[100px] bg-t5-white-lite p-2 rounded-lg border">
      <label className="relative flex items-center justify-between cursor-pointer">
        <Subtile title={title} />
        <div className="flex items-center">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div className="relative w-11 h-6 bg-t5-gray-200 peer-focus:outline-none rounded-full border peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-t5-black"></div>
        </div>
      </label>
      <p className="text-t5-black text-xs mt-2">{description}</p>
    </div>
  );
}
