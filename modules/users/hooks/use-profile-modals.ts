"use client";

import { useCallback, useState } from "react";
import { Certificate } from "@/services/certificate.service";
import { Education } from "@/services/education.service";
import { Project } from "@/services/project.service";

export function useProfileModals() {
  const [certificateState, setCertificateState] = useState<{
    isOpen: boolean;
    data: Certificate | null;
  }>({ isOpen: false, data: null });

  const [educationState, setEducationState] = useState<{
    isOpen: boolean;
    data: Education | null;
  }>({ isOpen: false, data: null });

  const [projectState, setProjectState] = useState<{
    isOpen: boolean;
    data: Project | null;
  }>({ isOpen: false, data: null });

  const openCertificate = useCallback((data: Certificate | null = null) => {
    setCertificateState({ isOpen: true, data });
  }, []);

  const closeCertificate = useCallback(() => {
    setCertificateState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const openEducation = useCallback((data: Education | null = null) => {
    setEducationState({ isOpen: true, data });
  }, []);

  const closeEducation = useCallback(() => {
    setEducationState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const openProject = useCallback((data: Project | null = null) => {
    setProjectState({ isOpen: true, data });
  }, []);

  const closeProject = useCallback(() => {
    setProjectState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return {
    certificate: {
      isOpen: certificateState.isOpen,
      data: certificateState.data,
      open: openCertificate,
      close: closeCertificate,
    },
    education: {
      isOpen: educationState.isOpen,
      data: educationState.data,
      open: openEducation,
      close: closeEducation,
    },
    project: {
      isOpen: projectState.isOpen,
      data: projectState.data,
      open: openProject,
      close: closeProject,
    },
  };
}
