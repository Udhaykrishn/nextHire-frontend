"use client"

import LoginPage from "@/modules/auth/pages/login"
import { Suspense } from "react"
import { AppLayout } from "@/components/app-layout"

function LoginContent() {
    return (
        <LoginPage
            role={"admin"}
            onLogin={() => { }}
            onSocialLogin={(provider) => console.log("Social login:", provider)}
        />
    )
}

const page = () => {
    return (
        <AppLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <LoginContent />
            </Suspense>
        </AppLayout>
    )
}

export default page