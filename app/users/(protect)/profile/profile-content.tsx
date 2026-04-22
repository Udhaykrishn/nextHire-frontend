"use client";

import * as React from "react";
import { toast } from "sonner";
import { Slot } from "@/components/animate-ui/primitives/animate/slot";
import { CertificateModal } from "@/modules/users/components/profile/certificate-modal";
import { EducationModal } from "@/modules/users/components/profile/education-modal";
import { ProjectModal } from "@/modules/users/components/profile/project-modal";
import { useProfileData } from "@/modules/users/hooks/use-profile-data";
import { useProfileModals } from "@/modules/users/hooks/use-profile-modals";
import { UserAuthService } from "@/services/auth/user.service";
import { CertificateService } from "@/services/certificate.service";
import { EducationService } from "@/services/education.service";
import { ProjectService } from "@/services/project.service";
import { type User, useAuthStore } from "@/stores/auth-store";
import { ProfileHeader } from "./profile-header";
import {
  CertificatesSection,
  EducationSection,
  ProjectsSection,
  ResumeSection,
} from "./profile-sections";

interface ProfileContentProps {
  user: User;
}

export function ProfileContent({ user }: ProfileContentProps) {
  const { updateUser } = useAuthStore();
  const {
    certificates,
    educations,
    projects,
    refetch: fetchData,
  } = useProfileData();

  const modals = useProfileModals();
  const [isUploadingResume, setIsUploadingResume] = React.useState(false);
  const resumeInputRef = React.useRef<HTMLInputElement>(null);

  const handleResumeUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploadingResume(true);
      try {
        const updatedUser = await UserAuthService.uploadResume(file);
        updateUser(updatedUser);
        toast.success("Resume uploaded successfully");
      } catch (_error) {
        toast.error("Failed to upload resume");
      } finally {
        setIsUploadingResume(false);
      }
    }
  };

  const handleDeleteResume = async () => {
    try {
      const updatedUser = await UserAuthService.deleteResume();
      updateUser(updatedUser);
      toast.success("Resume deleted");
    } catch (_error) {
      toast.error("Failed to delete resume");
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    if (confirm("Are you sure you want to delete this certificate?")) {
      try {
        await CertificateService.delete(id);
        fetchData();
        toast.success("Certificate deleted");
      } catch (_error) {
        toast.error("Failed to delete certificate");
      }
    }
  };

  const handleDeleteEducation = async (id: string) => {
    if (confirm("Are you sure you want to delete this education?")) {
      try {
        await EducationService.delete(id);
        fetchData();
        toast.success("Education deleted");
      } catch (_error) {
        toast.error("Failed to delete education");
      }
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await ProjectService.delete(id);
        fetchData();
        toast.success("Project deleted");
      } catch (_error) {
        toast.error("Failed to delete project");
      }
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 max-w-4xl mx-auto w-full pb-10">
      <ProfileHeader user={user} />

      {/* About Section */}
      <Slot
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">About</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {user?.bio ||
              "No bio provided yet. Add one to let others know about you."}
          </p>
        </div>
      </Slot>

      <ProjectsSection
        projects={projects}
        onAdd={() => modals.project.open()}
        onEdit={modals.project.open}
        onDelete={handleDeleteProject}
      />

      <EducationSection
        educations={educations}
        onAdd={() => modals.education.open()}
        onEdit={modals.education.open}
        onDelete={handleDeleteEducation}
      />

      <CertificatesSection
        certificates={certificates}
        onAdd={() => modals.certificate.open()}
        onEdit={modals.certificate.open}
        onDelete={handleDeleteCertificate}
      />

      <ResumeSection
        resumeUrl={user?.resume_url?.url}
        isUploading={isUploadingResume}
        onUpload={handleResumeUpload}
        onDelete={handleDeleteResume}
        inputRef={resumeInputRef}
      />

      <CertificateModal
        key={modals.certificate.data?._id || "new-certificate"}
        open={modals.certificate.isOpen}
        onOpenChange={modals.certificate.close}
        certificate={modals.certificate.data}
        onSuccess={fetchData}
      />
      <EducationModal
        key={modals.education.data?._id || "new-education"}
        open={modals.education.isOpen}
        onOpenChange={modals.education.close}
        education={modals.education.data}
        onSuccess={fetchData}
      />
      <ProjectModal
        key={modals.project.data?._id || "new-project"}
        open={modals.project.isOpen}
        onOpenChange={modals.project.close}
        project={modals.project.data}
        onSuccess={fetchData}
      />
    </div>
  );
}
