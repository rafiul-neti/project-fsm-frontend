import DashboardStats from "@/components/modules/dashboard/technician/home/dashboard-stats";
import RecentRequests from "@/components/modules/dashboard/technician/home/recent-requests";


export default function TechnicianDashboardHome() {
  return (
    <main className="space-y-8 p-4 md:p-6 lg:p-8">
      {/* Welcome Section */}
      <section>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome to Your Dashboard
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Keep track of your service requests and manage your work efficiently.
        </p>
      </section>

      {/* Statistics Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Here's a summary of your service activities.
          </p>
        </div>

        <DashboardStats />
      </section>

      {/* Recent Requests Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Recent Service Requests</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Stay updated with your latest assigned jobs.
          </p>
        </div>

        <RecentRequests />
      </section>
    </main>
  );
}

