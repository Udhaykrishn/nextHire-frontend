"use client";

import { Building2, Calendar, Mail, Shield } from "lucide-react";
import { type Recruiter } from "@/services/admin/recruiter-management.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";

interface RecruiterDetailsModalProps {
  recruiter: Recruiter | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RecruiterDetailsModal({
  recruiter,
  open,
  onOpenChange,
}: RecruiterDetailsModalProps) {
  if (!recruiter) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Recruiter Details</DialogTitle>
          <DialogDescription>
            View detailed information about this recruiter
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={recruiter.profile_url?.url}
                alt={recruiter.name}
              />
              <AvatarFallback className="text-2xl">
                {recruiter.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">{recruiter.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant={
                    recruiter.status === "active"
                      ? "default"
                      : recruiter.status === "blocked"
                        ? "destructive"
                        : "secondary"
                  }
                  className={
                    recruiter.status === "active"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : ""
                  }
                >
                  {recruiter.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
              <Mail className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Email Address
                </p>
                <p className="text-base font-medium">{recruiter.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
              <Building2 className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Company Name
                </p>
                <p className="text-base font-medium">
                  {recruiter.company_name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
              <Calendar className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Joined Date
                </p>
                <p className="text-base font-medium">
                  {new Date(recruiter.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
              <Shield className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Account Status
                </p>
                <p className="text-base font-medium capitalize">
                  {recruiter.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
