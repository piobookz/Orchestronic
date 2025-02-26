// src/app/dashboard/page.js
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
    const { sessionClaims } = await auth();
    const userRole = sessionClaims?.metadata?.role;

    return (
        <div>
            {/* Show developer-specific components */}
            {userRole === 'dev' && (
                <div>
                    <h1>Developer Dashboard</h1>
                    <button>Create Project</button>
                    <button>View Projects</button>
                </div>
            )}

            {/* Show project manager-specific components */}
            {userRole === 'pm' && (
                <div>
                    <h1>Project Manager Dashboard</h1>
                    <button>Review Requests</button>
                </div>
            )}

            {/* Show operations team-specific components */}
            {userRole === 'ops' && (
                <div>
                    <h1>Operations Dashboard</h1>
                    <button>Approve Requests</button>
                </div>
            )}
        </div>
    );
}