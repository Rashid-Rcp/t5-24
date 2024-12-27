    "use client";
    import React, { useState, useEffect, useRef } from 'react';
    import Dp from './Dp';

    interface User {
    id: string;
    name: string;
    image: string;
    }

    interface UserSelectProps {
    onSelect: (userId: string) => void;
    selectedUsers?: string[];
    placeholder?: string;
    }

    export default function UserSelect({ onSelect, selectedUsers = [], placeholder = "Search users..." }: UserSelectProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Mock data - Replace with actual API call
    const mockUsers: User[] = [
        { id: '1', name: 'John Doe', image: '/img/demo/bg-placeholder.webp' },
        { id: '2', name: 'Jane Smith', image: '/img/demo/bg-placeholder.webp' },
        { id: '3', name: 'Bob Johnson', image: '/img/demo/bg-placeholder.webp' },
        { id: '4', name: 'Alice Johnson', image: '/img/demo/bg-placeholder.webp' },
        { id: '5', name: 'Rashid Khan', image: '/img/demo/bg-placeholder.webp' },
        { id: '6', name: 'Rohit Sharma', image: '/img/demo/bg-placeholder.webp' },
        { id: '7', name: 'Rashid Rcp', image: '/img/demo/bg-placeholder.webp' },
    ];

    useEffect(() => {
        // Filter users based on search term
        const filteredUsers = mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setUsers(filteredUsers);
    }, [searchTerm]);

    useEffect(() => {
        // Close dropdown when clicking outside
        function handleClickOutside(event: MouseEvent) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (userId: string) => {
        onSelect(userId);
        setSearchTerm('');
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" ref={wrapperRef}>
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="w-full px-4 py-2 border bg-t5-white-lite border-t5-gray-200 rounded-full focus:outline-none focus:border-t5-black text-sm"
        />
        
        {isOpen && users.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-t5-white border border-t5-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {users.map((user) => (
                <button
                key={user.id}
                onClick={() => handleSelect(user.id)}
                disabled={selectedUsers.includes(user.id)}
                className={`w-full px-2 py-1 flex items-center gap-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedUsers.includes(user.id) ? 'bg-gray-50' : ''
                }`}
                >
                <Dp url={user.image} size="sm" />
                <span className="text-xs text-t5-black">{user.name}</span>
                </button>
            ))}
            </div>
        )}
        </div>
    );
    }
