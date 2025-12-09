export default function ApplicationsPage() {
    return (
        <div className="flex flex-1 flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">My Applications</h1>
                    <p className="text-muted-foreground">Track your job applications</p>
                </div>
                <div className="flex gap-2">
                    <select className="rounded-lg border bg-background px-4 py-2 text-sm">
                        <option>All Status</option>
                        <option>Applied</option>
                        <option>In Review</option>
                        <option>Interview</option>
                        <option>Offered</option>
                        <option>Rejected</option>
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-5">
                <div className="rounded-xl border bg-card p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">24</p>
                    <p className="text-sm text-muted-foreground">Total</p>
                </div>
                <div className="rounded-xl border bg-card p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-600">12</p>
                    <p className="text-sm text-muted-foreground">In Review</p>
                </div>
                <div className="rounded-xl border bg-card p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">5</p>
                    <p className="text-sm text-muted-foreground">Interview</p>
                </div>
                <div className="rounded-xl border bg-card p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">3</p>
                    <p className="text-sm text-muted-foreground">Offered</p>
                </div>
                <div className="rounded-xl border bg-card p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">4</p>
                    <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
            </div>

            {/* Applications List */}
            <div className="rounded-xl border bg-card overflow-hidden">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="text-left p-4 font-medium text-muted-foreground">Company</th>
                            <th className="text-left p-4 font-medium text-muted-foreground">Position</th>
                            <th className="text-left p-4 font-medium text-muted-foreground">Applied Date</th>
                            <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                            <th className="text-left p-4 font-medium text-muted-foreground">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t hover:bg-muted/30 transition-colors">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                                        G
                                    </div>
                                    <span className="font-medium">Google</span>
                                </div>
                            </td>
                            <td className="p-4">Senior Frontend Developer</td>
                            <td className="p-4 text-muted-foreground">Dec 2, 2024</td>
                            <td className="p-4">
                                <span className="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full dark:bg-purple-900/30 dark:text-purple-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                                    Interview
                                </span>
                            </td>
                            <td className="p-4">
                                <button className="text-sm text-blue-600 hover:underline">View Details</button>
                            </td>
                        </tr>
                        <tr className="border-t hover:bg-muted/30 transition-colors">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                                        M
                                    </div>
                                    <span className="font-medium">Meta</span>
                                </div>
                            </td>
                            <td className="p-4">Full Stack Engineer</td>
                            <td className="p-4 text-muted-foreground">Nov 28, 2024</td>
                            <td className="p-4">
                                <span className="inline-flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full dark:bg-yellow-900/30 dark:text-yellow-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                                    In Review
                                </span>
                            </td>
                            <td className="p-4">
                                <button className="text-sm text-blue-600 hover:underline">View Details</button>
                            </td>
                        </tr>
                        <tr className="border-t hover:bg-muted/30 transition-colors">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                                        A
                                    </div>
                                    <span className="font-medium">Amazon</span>
                                </div>
                            </td>
                            <td className="p-4">Backend Developer</td>
                            <td className="p-4 text-muted-foreground">Nov 25, 2024</td>
                            <td className="p-4">
                                <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                    Offered
                                </span>
                            </td>
                            <td className="p-4">
                                <button className="text-sm text-blue-600 hover:underline">View Details</button>
                            </td>
                        </tr>
                        <tr className="border-t hover:bg-muted/30 transition-colors">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                                        S
                                    </div>
                                    <span className="font-medium">Spotify</span>
                                </div>
                            </td>
                            <td className="p-4">React Developer</td>
                            <td className="p-4 text-muted-foreground">Nov 20, 2024</td>
                            <td className="p-4">
                                <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full dark:bg-red-900/30 dark:text-red-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                                    Rejected
                                </span>
                            </td>
                            <td className="p-4">
                                <button className="text-sm text-blue-600 hover:underline">View Details</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
