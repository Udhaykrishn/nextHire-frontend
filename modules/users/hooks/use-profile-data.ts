import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { UserAuthService } from "@/services/auth/user.service";
import { CertificateService } from "@/services/certificate.service";
import { EducationService } from "@/services/education.service";
import { ProjectService } from "@/services/project.service";

export function useProfileData() {
  const userQuery = useSuspenseQuery({
    queryKey: ["user-profile"],
    queryFn: () => UserAuthService.getProfile(),
  });
  const certificatesQuery = useQuery({
    queryKey: ["certificates"],
    queryFn: () => CertificateService.getAll(),
  });

  const educationsQuery = useQuery({
    queryKey: ["educations"],
    queryFn: () => EducationService.getAll(),
  });

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => ProjectService.getAll(),
  });

  return {
    user: userQuery.data,
    certificates: certificatesQuery.data ?? [],
    educations: educationsQuery.data ?? [],
    projects: projectsQuery.data ?? [],
    isLoading:
      userQuery.isLoading ||
      certificatesQuery.isLoading ||
      educationsQuery.isLoading ||
      projectsQuery.isLoading,
    isError:
      userQuery.isError ||
      certificatesQuery.isError ||
      educationsQuery.isError ||
      projectsQuery.isError,
    refetch: () => {
      userQuery.refetch();
      certificatesQuery.refetch();
      educationsQuery.refetch();
      projectsQuery.refetch();
    },
  };
}
