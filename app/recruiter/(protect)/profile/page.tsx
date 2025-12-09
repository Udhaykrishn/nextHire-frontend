import { recruiterApi } from "@/lib/recruiter.api";
import { RecruiterProfileContent } from "./recruiter-profile-content";

export default async function Page() {
    let recruiter;
    try {
        const { data } = await recruiterApi.get("/recruiter/profile");
        recruiter = data.data;
    } catch (error: any) {
        console.error("Failed to fetch recruiter profile:", error);
    }

    if (!recruiter) {
        return <div className="p-6 text-center text-muted-foreground">Failed to load profile. Please try again later.</div>
    }

    return (
        <RecruiterProfileContent recruiter={recruiter} />
    );
}
