import { Separator } from "@radix-ui/react-separator";

const AuthSeperater = () => {
    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <Separator className="bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-zinc-900 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
        </div>
    )
}

export default AuthSeperater
