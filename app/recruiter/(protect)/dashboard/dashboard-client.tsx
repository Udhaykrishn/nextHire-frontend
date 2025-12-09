'use client';

interface DashboardClientProps {
    usersData?: any;
    recruitersData?: any;
}

export function DashboardClient({ usersData: initialUsersData, recruitersData }: DashboardClientProps) {

    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center p-6 flex-col gap-2">
                    <span className="text-3xl font-bold">12</span>
                    <span className="text-muted-foreground">Active Jobs</span>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center p-6 flex-col gap-2">
                    <span className="text-3xl font-bold">48</span>
                    <span className="text-muted-foreground">New Applicants</span>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center p-6 flex-col gap-2">
                    <span className="text-3xl font-bold">5</span>
                    <span className="text-muted-foreground">Interviews Scheduled</span>
                </div>
            </div>
            <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <p className="text-muted-foreground">Activity feed will go here.</p>
                {/* Debug data if needed */}
                {/* <pre>{JSON.stringify(initialUsersData, null, 2)}</pre> */}
            </div>
        </div>
    );
}
