import type { Metadata } from "next";
import { JobsClient } from "./jobs-client";

export const metadata: Metadata = {
  title: "Browse Jobs | NextHire",
  description:
    "Find your perfect job opportunity on NextHire. Browse latest job openings from top companies.",
};

export default function JobsPage() {
  return <JobsClient />;
}
