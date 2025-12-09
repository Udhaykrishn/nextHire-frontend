"use client";

import { useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Search } from "lucide-react";

interface RecruiterSearchProps {
    defaultValue?: string;
}

export function RecruiterSearch({ defaultValue }: RecruiterSearchProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = (term: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams?.toString() ?? "");
            if (term) {
                params.set('search', term);
            } else {
                params.delete('search');
            }
            params.set('page', '1');
            router.replace(`${pathname}?${params.toString()}`);
        }, 300);
    };

    return (
        <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search recruiters..."
                className="pl-8"
                defaultValue={defaultValue}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
}

interface RecruiterPaginationProps {
    currentPage: number;
    totalPages: number;
}

export function RecruiterPagination({ currentPage, totalPages }: RecruiterPaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams?.toString() ?? "");
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-end space-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                Previous
            </Button>
            <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages || 1}
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                Next
            </Button>
        </div>
    );
}
