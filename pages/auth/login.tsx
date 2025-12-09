"use client"

import LoginPage from "@/modules/auth/pages/login"
import { Suspense } from "react"

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
        <Suspense fallback={<div>Loading...</div>}>
            <LoginContent />
        </Suspense>
    )
}

export default LoginClient;

