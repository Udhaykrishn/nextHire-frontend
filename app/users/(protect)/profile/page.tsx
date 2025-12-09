import { userApi } from "@/lib/user.api";
import { ProfileContent } from "./profile-content";

export default async function ProfilePage() {
    let user;
    try {
        const { data } = await userApi.get("/user/profile");
        user = data.data;
    } catch (error: any) {
        console.log(error.response.data);
    }

    return <ProfileContent user={user} />;
}

