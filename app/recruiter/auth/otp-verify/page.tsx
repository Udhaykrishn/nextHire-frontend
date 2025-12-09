import { USER_ROLES } from "@/constants";
import OtpVerifyPage from "@/modules/auth/pages/otp-verify";

export default function RecruiterOtpVerifyPage() {
    return <OtpVerifyPage role={USER_ROLES.RECRUITER} />;
}
