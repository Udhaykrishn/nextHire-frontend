import { useQuery } from "@tanstack/react-query";
import { ApplicationService } from "@/services/application.service";

export function useApplications() {
  const query = useQuery({
    queryKey: ["applications"],
    queryFn: () => ApplicationService.getAll(),
  });

  return {
    applications: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
