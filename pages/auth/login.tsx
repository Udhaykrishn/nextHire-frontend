"use client"

import LoginPage from "@/modules/auth/pages/login"
import { Suspense } from "react"
import { AppLayout } from "@/components/app-layout"

const LoginContent = () => {
    return (
        <LoginPage
            role={"user"}
            onLogin={() => { }}
            onForgotPassword={() => console.log("Forgot password")}
            onSocialLogin={(provider) => console.log("Social login:", provider)}
        />
    )
}

export const LoginClient = () => {
    return (
        <AppLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <LoginContent />
            </Suspense>
        </AppLayout>
    )
}

export default LoginClient;

