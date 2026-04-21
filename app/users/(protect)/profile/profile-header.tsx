"use client";

import { Camera, Pencil } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Slot } from "@/components/animate-ui/primitives/animate/slot";
import { EditProfileModal } from "@/modules/users/components/profile/edit-profile-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profile_url?: { key: string; url: string };
  role_of_title?: string;
  location?: string;
  bio?: string;
}

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = React.useState(user?.profile_url?.url);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (user?.profile_url?.url) {
      setAvatarUrl(user.profile_url.url);
    }
  }, [user?.profile_url?.url]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const response = await (await import("@/lib/user.api")).userApi.post(
          "/user/profile/upload",
          (() => {
            const formData = new FormData();
            formData.append("image", file);
            return formData;
          })(),
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        if (response.data) {
          setAvatarUrl(response.data.profile_url?.url);
          toast.success("Profile picture updated successfully");
        }
      } catch (_error) {
        toast.error("Failed to upload image");
      }
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
        <div className="relative h-48 w-full bg-gradient-to-r from-cyan-500 to-blue-500">
          <button
            type="button"
            className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white transition-colors"
          >
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
              <button
                type="button"
                className="relative p-0 border-0 bg-transparent cursor-pointer rounded-full overflow-hidden"
                onClick={triggerFileInput}
                aria-label="Change profile picture"
              >
                <Avatar className="h-32 w-32 border-4 border-card">
                  <AvatarImage
                    src={avatarUrl}
                    alt={user?.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-cyan-100 to-blue-100 text-cyan-700">
                    {user?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </button>
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
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {user?.name}
              </h1>
              <p className="text-base text-muted-foreground mb-2">
                {user?.role_of_title || "Software Developer"}
              </p>
              <p className="text-sm text-muted-foreground">
                {user?.location || "Bangalore, India"}
              </p>
            </div>
            <Button
              className="rounded-full bg-cyan-600 hover:bg-cyan-700 text-white px-6"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </Slot>
        <EditProfileModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      </div>
    </div>
  );
}
