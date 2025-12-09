'use client';

import * as React from 'react';
import { Camera, Pencil } from 'lucide-react';
import { Button } from '@/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { toast } from 'sonner';
import { Slot } from '@/components/animate-ui/primitives/animate/slot';

interface Recruiter {
    name: string;
    email: string;
    phone?: string;
    company_role?: string;
    description?: string;
    website_link?: string;
    // Add other fields as needed
}

interface RecruiterProfileHeaderProps {
    recruiter: Recruiter;
}

export function RecruiterProfileHeader({ recruiter }: RecruiterProfileHeaderProps) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    // Placeholder avatar state
    const [avatarUrl, setAvatarUrl] = React.useState<string | undefined>(undefined);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatarUrl(url);
            toast.success('Profile picture updated successfully');
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="bg-card rounded-xl overflow-hidden border border-border">
            {/* Banner */}
            <Slot
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="relative h-48 w-full bg-gradient-to-r from-purple-500 to-pink-500">
                    <button className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white transition-colors">
                        <Camera className="h-4 w-4" />
                        <span className="hidden sm:inline">Edit cover</span>
                    </button>
                </div>
            </Slot>

            {/* Profile Info */}
            <div className="px-6 pb-6">
                {/* Avatar */}
                <div className="relative -mt-16 mb-4">
                    <Slot
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="relative inline-block group">
                            <Avatar className="h-32 w-32 border-4 border-card cursor-pointer" onClick={triggerFileInput}>
                                <AvatarImage src={avatarUrl} alt={recruiter?.name} className="object-cover" />
                                <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700">
                                    {recruiter?.name?.slice(0, 2).toUpperCase() || 'RE'}
                                </AvatarFallback>
                            </Avatar>
                            <div
                                className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                onClick={triggerFileInput}
                            >
                                <Camera className="h-8 w-8 text-white" />
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>
                    </Slot>
                </div>

                {/* User Info */}
                <Slot
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground mb-1">{recruiter?.name}</h1>
                            <p className="text-base text-muted-foreground mb-2">
                                {recruiter?.company_role || 'Recruiter'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {recruiter?.email}
                            </p>
                        </div>
                        <Button
                            className="rounded-full bg-purple-600 hover:bg-purple-700 text-white px-6"
                            size="sm"
                        >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Profile
                        </Button>
                    </div>
                </Slot>
            </div>
        </div>
    );
}
