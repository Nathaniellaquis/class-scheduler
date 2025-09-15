"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Calendar,
    Clock,
    MapPin,
    Users,
    BookOpen,
    GraduationCap,
    UserCheck,
    Plus,
    Video,
    Building
} from "lucide-react";

// Mock data
const upcomingMeetings = [
    {
        id: 1,
        title: "Office Hours with Prof. Smith",
        professor: "Prof. Smith",
        course: "CS 101",
        date: "2024-01-15",
        time: "2:00 PM - 3:00 PM",
        location: "Room 205, CS Building",
        type: "in-person",
        status: "confirmed"
    },
    {
        id: 2,
        title: "TA Session with Alex Johnson",
        professor: "Alex Johnson",
        course: "CS 201",
        date: "2024-01-16",
        time: "10:00 AM - 11:00 AM",
        location: "Zoom Meeting",
        type: "virtual",
        status: "confirmed"
    },
    {
        id: 3,
        title: "Project Review with Prof. Davis",
        professor: "Prof. Davis",
        course: "CS 301",
        date: "2024-01-18",
        time: "4:00 PM - 5:00 PM",
        location: "Room 310, Eng Building",
        type: "in-person",
        status: "pending"
    }
];

const classes = [
    { id: 1, name: "Introduction to Computer Science", code: "CS 101", professor: "Prof. Smith", enrolled: 45 },
    { id: 2, name: "Data Structures", code: "CS 201", professor: "Prof. Johnson", enrolled: 38 },
    { id: 3, name: "Algorithms", code: "CS 301", professor: "Prof. Davis", enrolled: 32 },
];

const professors = [
    { id: 1, name: "Prof. Smith", department: "Computer Science", email: "smith@university.edu", office: "CS 205" },
    { id: 2, name: "Prof. Johnson", department: "Computer Science", email: "johnson@university.edu", office: "CS 210" },
    { id: 3, name: "Prof. Davis", department: "Computer Science", email: "davis@university.edu", office: "ENG 310" },
];

const tas = [
    { id: 1, name: "Alex Johnson", course: "CS 101", email: "alex.j@university.edu" },
    { id: 2, name: "Sarah Wilson", course: "CS 201", email: "sarah.w@university.edu" },
    { id: 3, name: "Mike Chen", course: "CS 301", email: "mike.c@university.edu" },
];

export default function DashboardPage() {
    const [userType, setUserType] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const type = localStorage.getItem("userType");
        if (!type) {
            router.push("/");
            return;
        }
        setUserType(type);
    }, [router]);

    if (!userType) {
        return <div>Loading...</div>;
    }

    const isStudent = userType === "student";

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome back, {isStudent ? "Student" : userType === "professor" ? "Professor" : "TA"}!
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {isStudent ? "Manage your office hours and meetings" : "Manage your schedule and student meetings"}
                        </p>
                    </div>
                    <Link href="/classes">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            {isStudent ? "Book Meeting" : "Schedule Office Hours"}
                        </Button>
                    </Link>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{upcomingMeetings.length}</div>
                            <p className="text-xs text-muted-foreground">This week</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{classes.length}</div>
                            <p className="text-xs text-muted-foreground">This semester</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {isStudent ? "Professors" : "Students"}
                            </CardTitle>
                            {isStudent ? (
                                <Users className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            )}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{isStudent ? professors.length : "127"}</div>
                            <p className="text-xs text-muted-foreground">Total enrolled</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">TAs</CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{tas.length}</div>
                            <p className="text-xs text-muted-foreground">Available</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Upcoming Meetings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Meetings</CardTitle>
                        <CardDescription>
                            Your scheduled meetings for the next few days
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingMeetings.map((meeting) => (
                                <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <Avatar>
                                            <AvatarFallback>{meeting.professor.split(" ")[1][0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-medium">{meeting.title}</h3>
                                            <p className="text-sm text-gray-600">{meeting.course} • {meeting.professor}</p>
                                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {meeting.date} • {meeting.time}
                                                </div>
                                                <div className="flex items-center">
                                                    {meeting.type === "virtual" ? (
                                                        <Video className="w-4 h-4 mr-1" />
                                                    ) : (
                                                        <Building className="w-4 h-4 mr-1" />
                                                    )}
                                                    {meeting.location}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant={meeting.status === "confirmed" ? "default" : "secondary"}>
                                            {meeting.status}
                                        </Badge>
                                        <Link href="/meetings">
                                            <Button variant="outline" size="sm">
                                                {meeting.type === "virtual" ? "Join Meeting" : "View Details"}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Classes and People Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Classes */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Classes</CardTitle>
                            <CardDescription>
                                {isStudent ? "Your enrolled courses" : "Courses you're teaching"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {classes.map((course) => (
                                    <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <h3 className="font-medium">{course.name}</h3>
                                            <p className="text-sm text-gray-600">{course.code} • {course.professor}</p>
                                            <p className="text-xs text-gray-500">{course.enrolled} students enrolled</p>
                                        </div>
                                        <Link href="/classes">
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Professors/TAs or Students */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {isStudent ? "Your Professors & TAs" : "Your Students & TAs"}
                            </CardTitle>
                            <CardDescription>
                                {isStudent ? "Contact information and office hours" : "Student roster and TA assignments"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {(isStudent ? [...professors, ...tas] : [...professors.slice(0, 2), ...tas]).map((person) => (
                                    <div key={person.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <Avatar>
                                                <AvatarFallback>
                                                    {person.name.split(" ")[person.name.split(" ").length - 1][0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-medium">{person.name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {isStudent
                                                        ? ('department' in person ? `${person.department}` : `TA for ${person.course}`)
                                                        : ('department' in person ? `${person.department}` : `TA for ${person.course}`)
                                                    }
                                                </p>
                                                {'email' in person && (
                                                    <p className="text-xs text-gray-500">{person.email}</p>
                                                )}
                                            </div>
                                        </div>
                                        <Link href="/classes">
                                            <Button variant="outline" size="sm">
                                                {isStudent ? "Book Meeting" : "Schedule"}
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
