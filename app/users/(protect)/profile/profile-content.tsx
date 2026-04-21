"use client";

import {
  Briefcase,
  ExternalLink,
  Eye,
  FileText,
  GraduationCap,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Slot } from "@/components/animate-ui/primitives/animate/slot";
import { CertificateModal } from "@/modules/users/components/profile/certificate-modal";
import { EducationModal } from "@/modules/users/components/profile/education-modal";
import { ProjectModal } from "@/modules/users/components/profile/project-modal";
import { UserAuthService } from "@/services/auth/user.service";
import {
  Certificate,
  CertificateService,
} from "@/services/certificate.service";
import { Education, EducationService } from "@/services/education.service";
import { Project, ProjectService } from "@/services/project.service";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/ui/button";
import { ProfileHeader } from "./profile-header";

interface ProfileContentProps {
  user: {
    bio?: string;
    resume_url?: { url: string };
  } & Record<string, unknown>;
}

export function ProfileContent({ user }: ProfileContentProps) {
  const { updateUser } = useAuthStore();
  const [certificates, setCertificates] = React.useState<Certificate[]>([]);
  const [educations, setEducations] = React.useState<Education[]>([]);
  const [projects, setProjects] = React.useState<Project[]>([]);

  // Modals state
  const [isCertificateModalOpen, setIsCertificateModalOpen] =
    React.useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    React.useState<Certificate | null>(null);

  const [isEducationModalOpen, setIsEducationModalOpen] = React.useState(false);
  const [selectedEducation, setSelectedEducation] =
    React.useState<Education | null>(null);

  const [isProjectModalOpen, setIsProjectModalOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(
    null,
  );

  const [isUploadingResume, setIsUploadingResume] = React.useState(false);
  const resumeInputRef = React.useRef<HTMLInputElement>(null);

  const fetchData = React.useCallback(async () => {
    try {
      const [certData, eduData, projData] = await Promise.all([
        CertificateService.getAll(),
        EducationService.getAll(),
        ProjectService.getAll(),
      ]);
      setCertificates(certData);
      setEducations(eduData);
      setProjects(projData);
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

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

      {/* Experience / Projects Section */}
      <Slot
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Projects</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted"
              onClick={() => {
                setSelectedProject(null);
                setIsProjectModalOpen(true);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {projects.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                No projects added yet.
              </p>
            ) : (
              projects.map((project, index) => (
                <div
                  key={project._id}
                  className={`flex gap-4 ${index > 0 ? "pt-6 border-t border-border" : ""}`}
                >
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-cyan-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {project.projectName}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {project.startDate &&
                            new Date(
                              project.startDate,
                            ).toLocaleDateString()}{" "}
                          -{" "}
                          {project.endDate
                            ? new Date(project.endDate).toLocaleDateString()
                            : "Present"}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {project.url && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => window.open(project.url, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            setSelectedProject(project);
                            setIsProjectModalOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDeleteProject(project._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Slot>

      {/* Education Section */}
      <Slot
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Education</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted"
              onClick={() => {
                setSelectedEducation(null);
                setIsEducationModalOpen(true);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {educations.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                No education history added yet.
              </p>
            ) : (
              educations.map((edu, index) => (
                <div
                  key={edu._id}
                  className={`flex gap-4 ${index > 0 ? "pt-6 border-t border-border" : ""}`}
                >
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {edu.institutionName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {edu.degree} in {edu.fieldOfStudy}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {edu.startDate &&
                            new Date(edu.startDate).getFullYear()}{" "}
                          -{" "}
                          {edu.endDate
                            ? new Date(edu.endDate).getFullYear()
                            : "Present"}
                        </p>
                        {edu.gpa && (
                          <p className="text-xs font-medium text-cyan-600 mt-1">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            setSelectedEducation(edu);
                            setIsEducationModalOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDeleteEducation(edu._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Slot>

      {/* Certificates Section */}
      <Slot
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Licenses & Certifications
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted"
              onClick={() => {
                setSelectedCertificate(null);
                setIsCertificateModalOpen(true);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {certificates.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                No certificates added yet.
              </p>
            ) : (
              certificates.map((cert, index) => (
                <div
                  key={cert._id}
                  className={`flex gap-4 ${index > 0 ? "pt-6 border-t border-border" : ""}`}
                >
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {cert.certificateName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {cert.issuingOrganization}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Issued{" "}
                          {cert.issueDate
                            ? new Date(cert.issueDate).toLocaleDateString(
                                undefined,
                                { month: "short", year: "numeric" },
                              )
                            : "N/A"}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {cert.certificateUrl && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              window.open(cert.certificateUrl, "_blank")
                            }
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            setSelectedCertificate(cert);
                            setIsCertificateModalOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDeleteCertificate(cert._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Slot>

      {/* Resume/Documents Section */}
      <Slot
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Resume</h2>
          </div>

          <div className="space-y-4">
            {user?.resume_url?.url ? (
              <div className="group relative overflow-hidden rounded-lg border border-border bg-muted/30 p-4 transition-all hover:border-cyan-500 hover:bg-muted/50">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-pink-500 shadow-md">
                    <FileText className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1">
                      My_Resume.pdf
                    </h3>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-full border-cyan-600 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
                        onClick={() =>
                          window.open(user.resume_url?.url, "_blank")
                        }
                      >
                        <Eye className="h-3.5 w-3.5 mr-1.5" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-full text-destructive hover:bg-destructive/10 border-destructive/20 hover:border-destructive"
                        onClick={handleDeleteResume}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="file"
                  className="hidden"
                  ref={resumeInputRef}
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                />
                <button
                  type="button"
                  className="w-full rounded-lg border-2 border-dashed border-border bg-muted/20 p-8 text-center transition-all hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/10 cursor-pointer"
                  onClick={() => resumeInputRef.current?.click()}
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/30 mb-4">
                    <Plus className="h-8 w-8 text-cyan-600" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {isUploadingResume ? "Uploading..." : "Upload New Resume"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click or drag and drop your file here
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    Supported formats: PDF, DOC, DOCX (Max 10MB)
                  </p>
                </button>
              </div>
            )}
          </div>
        </div>
      </Slot>

      {/* Modals */}
      <CertificateModal
        open={isCertificateModalOpen}
        onOpenChange={setIsCertificateModalOpen}
        certificate={selectedCertificate}
        onSuccess={fetchData}
      />
      <EducationModal
        open={isEducationModalOpen}
        onOpenChange={setIsEducationModalOpen}
        education={selectedEducation}
        onSuccess={fetchData}
      />
      <ProjectModal
        open={isProjectModalOpen}
        onOpenChange={setIsProjectModalOpen}
        project={selectedProject}
        onSuccess={fetchData}
      />
    </div>
  );
}
