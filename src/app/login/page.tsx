"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Particles } from "@/components/Particles";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Logged in successfully");
        router.push("/admin");
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      <Particles />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-0" />
      
      <div className="relative z-10 w-full max-w-md p-8 glass rounded-2xl shadow-elegant border border-primary/20">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl text-primary mb-2">Admin Portal</h1>
          <p className="text-muted-foreground">Sign in to manage Khandelwal Real Estate</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/50 border-primary/20 focus:border-primary"
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background/50 border-primary/20 focus:border-primary"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-gold text-primary-foreground hover:opacity-90 transition-opacity"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
