"use client"

import LoginPage from "@/modules/auth/pages/login"
import { Suspense } from "react"

export function LoginContent() {
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
        <Suspense fallback={<div>Loading...</div>}>
            <LoginContent />
        </Suspense>
    )
}

export default page