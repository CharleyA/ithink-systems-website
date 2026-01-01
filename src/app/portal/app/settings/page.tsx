"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, User, Mail, Shield } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/portal/login" });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="bg-card rounded-xl border">
        <div className="p-6 border-b">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={session?.user?.name || "Demo User"}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                value={session?.user?.email || ""}
                disabled
                className="flex-1"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Contact support to update your profile information.
          </p>
        </div>
      </div>

      <div className="bg-card rounded-xl border">
        <div className="p-6 border-b">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Password</p>
              <p className="text-sm text-muted-foreground">
                Last changed: Never
              </p>
            </div>
            <Button variant="outline" disabled>
              Change Password
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security
              </p>
            </div>
            <Button variant="outline" disabled>
              Enable
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-destructive/20">
        <div className="p-6 border-b border-destructive/20">
          <h3 className="font-semibold text-destructive flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            Sign Out
          </h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            Sign out of your account on this device.
          </p>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
