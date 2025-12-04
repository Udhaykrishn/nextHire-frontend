"use client"

import SignupPage from "@/modules/auth/pages/signup"
import { AppLayout } from "@/components/app-layout"


const page = () => {
    return (
        <AppLayout>
            <SignupPage role="user" />
        </AppLayout>
    )
}

export default page