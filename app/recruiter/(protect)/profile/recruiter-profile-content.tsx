'use client';

import * as React from 'react';
import { RecruiterProfileHeader } from "./recruiter-profile-header";
import { Button } from "@/ui/button";
import { FileText, Plus, Pencil, Briefcase, Globe, Phone, Mail, Building, CheckCircle, ShieldCheck, BadgeCheck } from "lucide-react";
import { Slot } from "@/components/animate-ui/primitives/animate/slot";

interface Recruiter {
    GSTIN: string;
    admin_approved: boolean;
    category: string;
    company_role: string;
    createdAt: string;
    description: string;
    email: string;
    id: string;
    is_verified_company: boolean;
    name: string;
    phone: string;
    status: string;
    subscription: {
        current_plan: string;
        is_subscribed: boolean;
        _id: string;
    };
    updatedAt: string | null;
    website_link: string;
}

interface RecruiterProfileContentProps {
    recruiter: Recruiter;
}

export function RecruiterProfileContent({ recruiter }: RecruiterProfileContentProps) {
    return (
        <div className="flex flex-1 flex-col gap-4 max-w-4xl mx-auto w-full pb-10">
            <RecruiterProfileHeader recruiter={recruiter} />

            {/* About Section */}
            <Slot
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-foreground">About Company</h2>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {recruiter?.description || 'No description provided yet. Add a short bio to let candidates know about your company.'}
                    </p>
                </div>
            </Slot>

            {/* Company Details Section */}
            <Slot
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">Company Details</h2>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Website */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                    <Globe className="h-5 w-5 text-blue-600" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-foreground text-sm">Website</h3>
                                <a href={recruiter?.website_link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate block">
                                    {recruiter?.website_link || 'Not provided'}
                                </a>
                            </div>
                        </div>

                        {/* GSTIN */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-orange-600" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-foreground text-sm">GSTIN</h3>
                                <p className="text-sm text-muted-foreground">{recruiter?.GSTIN || 'Not provided'}</p>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                                    <Building className="h-5 w-5 text-purple-600" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-foreground text-sm">Category</h3>
                                <p className="text-sm text-muted-foreground">{recruiter?.category || 'General'}</p>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-foreground text-sm">Status</h3>
                                <p className="text-sm text-muted-foreground capitalize">{recruiter?.status || 'Active'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Slot>

            {/* Contact Information */}
            <Slot
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">Contact Information</h2>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm text-foreground">{recruiter?.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm text-foreground">{recruiter?.phone}</span>
                        </div>
                    </div>
                </div>
            </Slot>

            {/* Verification & Subscription */}
            <Slot
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">Account Status</h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Verified Badge */}
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border flex-1">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${recruiter?.is_verified_company ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                                <BadgeCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Company Verification</h3>
                                <p className="text-sm text-muted-foreground">
                                    {recruiter?.is_verified_company ? 'Verified Company' : 'Not Verified'}
                                </p>
                            </div>
                        </div>

                        {/* Subscription Badge */}
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border flex-1">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${recruiter?.subscription?.current_plan === 'premium' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Subscription Plan</h3>
                                <p className="text-sm text-muted-foreground capitalize">
                                    {recruiter?.subscription?.current_plan || 'Free'} Plan
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Slot>
        </div>
    );
}
