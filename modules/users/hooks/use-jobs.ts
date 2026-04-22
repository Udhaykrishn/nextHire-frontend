import { useQuery } from "@tanstack/react-query";
import { JobService } from "@/services/job.service";

export function useJobs(search?: string) {
  const query = useQuery({
    queryKey: ["jobs", search],
    queryFn: () => JobService.getAll({ search }),
  });

  return {
    jobs: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
