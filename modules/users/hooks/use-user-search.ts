import { useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function useUserSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = (term: string) => {
        // Clear previous timeout
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        // Debounce search by 300ms
        timeoutRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams?.toString());
            if (term) params.set("search", term);
            else params.delete("search");
            params.set("page", "1");
            router.replace(`${pathname}?${params.toString()}`);
        }, 300);
    };

    const setPage = (newPage: number) => {
        const params = new URLSearchParams(searchParams?.toString());
        params.set("page", newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return {
        handleSearch,
        setPage,
    };
}
