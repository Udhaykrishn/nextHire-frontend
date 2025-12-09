'use client';

import * as React from 'react';
import { ProfileHeader } from "./profile-header";
import { Button } from "@/ui/button";
import { FileText, Plus, Download, Eye, Pencil, Briefcase, GraduationCap } from "lucide-react";
import { Slot } from "@/components/animate-ui/primitives/animate/slot";

interface ProfileContentProps {
    user: any;
}

export function ProfileContent({ user }: ProfileContentProps) {
    return (
        <div className="flex flex-1 flex-col gap-4 max-w-4xl mx-auto w-full pb-10">
            <ProfileHeader user={user} />

            {/* About Section */}
            <Slot
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-foreground">About</h2>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {user?.bio || 'Passionate software developer with 5+ years of experience in building scalable web applications. Specialized in React, TypeScript, and Node.js. Always eager to learn new technologies and solve complex problems.'}
                    </p>
                </div>
            </Slot>

            {/* Experience Section */}
            <Slot
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">Experience</h2>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="space-y-6">
                        {/* Experience Item 1 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="h-12 w-12 rounded-lg bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center">
                                    <Briefcase className="h-6 w-6 text-cyan-600" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="font-semibold text-foreground">Senior Frontend Developer</h3>
                                        <p className="text-sm text-muted-foreground">TechCorp · Full-time</p>
                                        <p className="text-xs text-muted-foreground mt-1">Jan 2022 - Present · 2 yrs 11 mos</p>
                                        <p className="text-xs text-muted-foreground">Bangalore, India</p>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                                    Leading frontend development team, building scalable React applications with TypeScript. Mentoring junior developers and establishing best practices.
                                </p>
                            </div>
                        </div>

                        {/* Experience Item 2 */}
                        <div className="flex gap-4 pt-6 border-t border-border">
                            <div className="flex-shrink-0">
                                <div className="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                                    <Briefcase className="h-6 w-6 text-emerald-600" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="font-semibold text-foreground">Frontend Developer</h3>
                                        <p className="text-sm text-muted-foreground">StartupXYZ · Full-time</p>
                                        <p className="text-xs text-muted-foreground mt-1">Jun 2019 - Dec 2021 · 2 yrs 6 mos</p>
                                        <p className="text-xs text-muted-foreground">Bangalore, India</p>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                                    Developed and maintained web applications using React and Redux. Collaborated with design team to implement responsive UI components.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Slot>

            {/* Education Section */}
            <Slot
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">Education</h2>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                <GraduationCap className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground">Bachelor of Technology in Computer Science</h3>
                            <p className="text-sm text-muted-foreground">University Name</p>
                            <p className="text-xs text-muted-foreground mt-1">2015 - 2019</p>
                        </div>
                    </div>
                </div>
            </Slot>

            {/* Skills Section */}
            <Slot
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">Skills</h2>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'Next.js', 'Node.js', 'JavaScript', 'HTML/CSS', 'TailwindCSS', 'Git', 'REST APIs', 'GraphQL'].map((skill, index) => (
                            <Slot
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                            >
                                <span className="inline-flex items-center rounded-full bg-cyan-50 dark:bg-cyan-900/20 px-3 py-1.5 text-sm font-medium text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors cursor-pointer">
                                    {skill}
                                </span>
                            </Slot>
                        ))}
                    </div>
                </div>
            </Slot>

            {/* Resume/Documents Section */}
            <Slot
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">Resume</h2>
                    </div>

                    <div className="space-y-4">
                        {/* Existing Resume Card */}
                        <div className="group relative overflow-hidden rounded-lg border border-border bg-muted/30 p-4 transition-all hover:border-cyan-500 hover:bg-muted/50">
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-pink-500 shadow-md">
                                    <FileText className="h-7 w-7 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-foreground mb-1">Resume_2024.pdf</h3>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Added Dec 1, 2024
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            2.4 MB
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-3">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 rounded-full border-cyan-600 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
                                        >
                                            <Eye className="h-3.5 w-3.5 mr-1.5" />
                                            View
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 rounded-full"
                                        >
                                            <Download className="h-3.5 w-3.5 mr-1.5" />
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upload New Resume Area */}
                        <div className="relative">
                            <div className="rounded-lg border-2 border-dashed border-border bg-muted/20 p-8 text-center transition-all hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/10 cursor-pointer">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/30 mb-4">
                                    <Plus className="h-8 w-8 text-cyan-600" />
                                </div>
                                <h3 className="text-base font-semibold text-foreground mb-1">Upload New Resume</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Drag and drop your file here or click to browse
                                </p>
                                <Button
                                    className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full px-6 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Choose File
                                </Button>
                                <p className="text-xs text-muted-foreground mt-3">
                                    Supported formats: PDF, DOC, DOCX (Max 5MB)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Slot>
        </div>
    );
}
