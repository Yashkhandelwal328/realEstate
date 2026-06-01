import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Home, FileText, MessageSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Home },
  { href: "/admin/content", label: "Posters and stuff", icon: FileText },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050510] relative z-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-card border-r border-border p-6 flex flex-col gap-6">
        <div className="font-display text-2xl text-primary">KRE Admin</div>
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium"
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <form action="/api/auth/logout" method="POST">
          <Button variant="outline" className="w-full justify-start gap-2" type="submit">
            <LogOut className="size-4" />
            Logout
          </Button>
        </form>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
