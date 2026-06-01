import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Home, FileText, MessageSquare, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Home },
  { href: "/admin/content", label: "Posters and stuff", icon: FileText },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
];

function NavLinks() {
  return (
    <>
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
    </>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050510] relative z-50 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="font-display text-xl text-primary">KRE Admin</div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="size-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-card p-6 flex flex-col gap-6">
            <SheetTitle className="font-display text-2xl text-primary text-left">KRE Admin</SheetTitle>
            <nav className="flex flex-col gap-2 flex-1">
              <NavLinks />
            </nav>
            <form action="/api/auth/logout" method="POST">
              <Button variant="outline" className="w-full justify-start gap-2" type="submit">
                <LogOut className="size-4" />
                Logout
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-card border-r border-border p-6 flex-col gap-6">
        <div className="font-display text-2xl text-primary">KRE Admin</div>
        <nav className="flex flex-col gap-2 flex-1">
          <NavLinks />
        </nav>
        <form action="/api/auth/logout" method="POST">
          <Button variant="outline" className="w-full justify-start gap-2" type="submit">
            <LogOut className="size-4" />
            Logout
          </Button>
        </form>
      </aside>

      <main className="flex-1 p-4 md:p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
