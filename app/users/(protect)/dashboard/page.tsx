import { userApi } from "@/lib/user.api";

export default async function DashboardPage() {
    let user;
    try {
        const { data } = await userApi.get("/user/profile");
        user = data.data;
    } catch (error: any) {
        console.log("error is that:", error.response.data);
    }

    return (
        <div className="flex flex-1 flex-col gap-6">
            <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <h1 className="text-2xl font-bold">Welcome back, {user?.name}! 👋</h1>
                <p className="mt-2 text-blue-100">Here's what's happening with your job search today.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Applied Jobs</p>
                            <p className="text-2xl font-bold">24</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Interviews</p>
                            <p className="text-2xl font-bold">5</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900/30">
                            <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Pending</p>
                            <p className="text-2xl font-bold">12</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                            <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Saved Jobs</p>
                            <p className="text-2xl font-bold">18</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Activity */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                                <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Applied to Frontend Developer at TechCorp</p>
                                <p className="text-xs text-muted-foreground">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                                <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Interview scheduled with StartupXYZ</p>
                                <p className="text-xs text-muted-foreground">Yesterday</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900/30">
                                <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Saved React Developer position</p>
                                <p className="text-xs text-muted-foreground">2 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Recommended for You</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                                    G
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Senior React Developer</p>
                                    <p className="text-xs text-muted-foreground">Google • Remote</p>
                                </div>
                            </div>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">
                                95% Match
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                                    M
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Full Stack Engineer</p>
                                    <p className="text-xs text-muted-foreground">Meta • Hybrid</p>
                                </div>
                            </div>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">
                                88% Match
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                                    A
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Frontend Lead</p>
                                    <p className="text-xs text-muted-foreground">Amazon • On-site</p>
                                </div>
                            </div>
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full dark:bg-yellow-900/30 dark:text-yellow-400">
                                75% Match
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}