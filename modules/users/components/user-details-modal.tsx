"use client";

import { type User } from "@/services/admin/user-management.service";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import {
    Mail,
    Phone,
    Calendar,
    Shield,
    Briefcase,
    FileText,
    Award,
    CreditCard,
    Linkedin,
    Globe,
    Github,
    User as UserIcon
} from "lucide-react";
import { Button } from "@/ui/button";

interface UserDetailsModalProps {
    user: User | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserDetailsModal({ user, open, onOpenChange }: UserDetailsModalProps) {
    if (!user) return null;

    const isBlocked = user.status === "block";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                    <DialogDescription>
                        Complete information about this user
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Profile Section */}
                    <div className="flex items-start gap-4 pb-4 border-b">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user.profile_url?.url} alt={user.name} />
                            <AvatarFallback className="text-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                {user.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <h3 className="text-2xl font-semibold">{user.name}</h3>
                                {user.badge && (
                                    <Badge variant="default" className="bg-blue-100 text-blue-700">
                                        <Award className="h-3 w-3 mr-1" />
                                        Verified
                                    </Badge>
                                )}
                            </div>
                            {user.role_of_title && (
                                <p className="text-muted-foreground mt-1">{user.role_of_title}</p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                                <Badge
                                    variant={isBlocked ? "destructive" : "default"}
                                    className={
                                        isBlocked
                                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                                            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                    }
                                >
                                    {isBlocked ? "Blocked" : "Active"}
                                </Badge>
                                <Badge variant="outline" className="capitalize">
                                    {user.subscription.current_plan}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Bio Section */}
                    {user.bio && (
                        <div className="p-4 rounded-lg border bg-muted/50">
                            <p className="text-sm font-medium text-muted-foreground mb-2">About</p>
                            <p className="text-sm">{user.bio}</p>
                        </div>
                    )}

                    {/* Contact Information */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
                            <Mail className="h-5 w-5 mt-0.5 text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                                <p className="text-base font-medium break-all">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
                            <Phone className="h-5 w-5 mt-0.5 text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                                <p className="text-base font-medium">{user.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className="grid gap-4 md:grid-cols-2">
                        {user.experience && (
                            <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
                                <Briefcase className="h-5 w-5 mt-0.5 text-muted-foreground" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-muted-foreground">Experience</p>
                                    <p className="text-base font-medium">{user.experience}</p>
                                </div>
                            </div>
                        )}

                        {user.resume_url && (
                            <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
                                <FileText className="h-5 w-5 mt-0.5 text-muted-foreground" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-muted-foreground">Resume</p>
                                    <Button
                                        variant="ghost"
                                        className="h-auto p-0 text-base font-medium text-primary hover:underline"
                                        onClick={() => window.open(user.resume_url, '_blank')}
                                    >
                                        View Resume
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Social Links */}
                    {user.social_link && (user.social_link.linkedin || user.social_link.portfolio || user.social_link.github) && (
                        <div className="space-y-3">
                            <p className="text-sm font-medium text-muted-foreground">Social Links</p>
                            <div className="grid gap-3 md:grid-cols-3">
                                {user.social_link.linkedin && (
                                    <Button
                                        variant="outline"
                                        className="justify-start"
                                        onClick={() => window.open(user.social_link?.linkedin, '_blank')}
                                    >
                                        <Linkedin className="h-4 w-4 mr-2" />
                                        LinkedIn
                                    </Button>
                                )}
                                {user.social_link.portfolio && (
                                    <Button
                                        variant="outline"
                                        className="justify-start"
                                        onClick={() => window.open(user.social_link?.portfolio, '_blank')}
                                    >
                                        <Globe className="h-4 w-4 mr-2" />
                                        Portfolio
                                    </Button>
                                )}
                                {user.social_link.github && (
                                    <Button
                                        variant="outline"
                                        className="justify-start"
                                        onClick={() => window.open(user.social_link?.github, '_blank')}
                                    >
                                        <Github className="h-4 w-4 mr-2" />
                                        GitHub
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Subscription & Account Info */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
                            <CreditCard className="h-5 w-5 mt-0.5 text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-muted-foreground">Subscription</p>
                                <p className="text-base font-medium capitalize">
                                    {user.subscription.current_plan} Plan
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {user.subscription.is_subscribed ? "Active Subscription" : "No Active Subscription"}
                                </p>
                            </div>
                        </div>

                        {user.createdAt && (
                            <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
                                <Calendar className="h-5 w-5 mt-0.5 text-muted-foreground" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-muted-foreground">Joined Date</p>
                                    <p className="text-base font-medium">
                                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Account Status */}
                    <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
                        <Shield className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-muted-foreground">Account Status</p>
                            <p className="text-base font-medium capitalize">{user.status}</p>
                            {user.google_id && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    Signed in with Google
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
