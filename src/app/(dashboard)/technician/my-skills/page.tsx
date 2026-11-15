import SkillsManagement from "@/components/modules/dashboard/technician/skills/skills-management";



export default function SkillsPage() {
  return (
    <main className="space-y-6 p-4 md:p-6 lg:p-8">
      <section>
        <h1 className="text-2xl font-bold tracking-tight">My Skills</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage your professional skills and the services you are qualified to
          provide.
        </p>
      </section>

      <SkillsManagement />
    </main>
  );
}
