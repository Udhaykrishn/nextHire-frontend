export default function NotificationsPage() {
    return (
        <div className="flex flex-1 flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Notifications</h1>
                    <p className="text-muted-foreground">Stay updated with your job search</p>
                </div>
                <button className="text-sm text-blue-600 hover:underline">Mark all as read</button>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
                {/* Unread notification */}
                <div className="rounded-xl border bg-blue-50 dark:bg-blue-950/20 p-4 relative">
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-600"></div>
                    <div className="flex items-start gap-4 pl-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium">Interview Scheduled!</p>
                            <p className="text-sm text-muted-foreground mt-1">Your interview with Google for Senior Frontend Developer position is scheduled for Dec 10, 2024 at 3:00 PM IST.</p>
                            <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                        </div>
                    </div>
                </div>

                {/* Unread notification */}
                <div className="rounded-xl border bg-blue-50 dark:bg-blue-950/20 p-4 relative">
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-600"></div>
                    <div className="flex items-start gap-4 pl-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium">Application Viewed</p>
                            <p className="text-sm text-muted-foreground mt-1">A recruiter from Meta viewed your application for Full Stack Engineer position.</p>
                            <p className="text-xs text-muted-foreground mt-2">5 hours ago</p>
                        </div>
                    </div>
                </div>

                {/* Read notification */}
                <div className="rounded-xl border bg-card p-4">
                    <div className="flex items-start gap-4 pl-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-muted-foreground">New Job Match</p>
                            <p className="text-sm text-muted-foreground mt-1">We found 5 new jobs matching your profile: React Developer, Frontend Engineer...</p>
                            <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
                        </div>
                    </div>
                </div>

                {/* Read notification */}
                <div className="rounded-xl border bg-card p-4">
                    <div className="flex items-start gap-4 pl-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-muted-foreground">New Message</p>
                            <p className="text-sm text-muted-foreground mt-1">You have a new message from TechCorp recruiter regarding your application.</p>
                            <p className="text-xs text-muted-foreground mt-2">2 days ago</p>
                        </div>
                    </div>
                </div>

                {/* Read notification */}
                <div className="rounded-xl border bg-card p-4">
                    <div className="flex items-start gap-4 pl-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-muted-foreground">Application Update</p>
                            <p className="text-sm text-muted-foreground mt-1">Unfortunately, your application for Spotify - React Developer was not selected.</p>
                            <p className="text-xs text-muted-foreground mt-2">3 days ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
