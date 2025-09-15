"use client";

import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
    Calendar as CalendarIcon,
    Clock,
    MapPin,
    Video,
    Building,
    ChevronLeft,
    ChevronRight,
    Plus,
    Users
} from "lucide-react";

// Mock meeting data
const meetings = [
    {
        id: 1,
        title: "Office Hours with Prof. Smith",
        professor: "Prof. Smith",
        course: "CS 101",
        date: new Date(2024, 0, 15), // January 15, 2024
        time: "2:00 PM - 3:00 PM",
        location: "Room 205, CS Building",
        type: "in-person",
        status: "confirmed",
        attendees: ["John Doe", "Jane Smith"],
        description: "Discussion about assignment 3 and project requirements"
    },
    {
        id: 2,
        title: "TA Session with Alex Johnson",
        professor: "Alex Johnson",
        course: "CS 201",
        date: new Date(2024, 0, 16), // January 16, 2024
        time: "10:00 AM - 11:00 AM",
        location: "Zoom Meeting",
        type: "virtual",
        status: "confirmed",
        attendees: ["John Doe"],
        description: "Review of data structures concepts and homework help"
    },
    {
        id: 3,
        title: "Project Review with Prof. Davis",
        professor: "Prof. Davis",
        course: "CS 301",
        date: new Date(2024, 0, 18), // January 18, 2024
        time: "4:00 PM - 5:00 PM",
        location: "Room 310, Eng Building",
        type: "in-person",
        status: "pending",
        attendees: ["John Doe"],
        description: "Final project milestone review and feedback"
    },
    {
        id: 4,
        title: "Group Study Session",
        professor: "Prof. Johnson",
        course: "CS 201",
        date: new Date(2024, 0, 20), // January 20, 2024
        time: "1:00 PM - 2:30 PM",
        location: "Library Study Room 3",
        type: "in-person",
        status: "confirmed",
        attendees: ["John Doe", "Alice Brown", "Bob Wilson"],
        description: "Group study session for upcoming midterm"
    },
    {
        id: 5,
        title: "Career Advice Session",
        professor: "Prof. Smith",
        course: "CS 101",
        date: new Date(2024, 0, 22), // January 22, 2024
        time: "3:00 PM - 4:00 PM",
        location: "Zoom Meeting",
        type: "virtual",
        status: "confirmed",
        attendees: ["John Doe"],
        description: "Discussion about career paths in computer science"
    }
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedMeeting, setSelectedMeeting] = useState<typeof meetings[0] | null>(null);

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Get meetings for selected date
    const getMeetingsForDate = (date: Date) => {
        return meetings.filter(meeting => isSameDay(meeting.date, date));
    };

    const navigateMonth = (direction: "prev" | "next") => {
        setCurrentMonth(prev =>
            direction === "next" ? addMonths(prev, 1) : subMonths(prev, 1)
        );
    };

    const getMeetingsForMonth = () => {
        const meetingsByDate: { [key: string]: typeof meetings } = {};
        meetings.forEach(meeting => {
            const dateKey = format(meeting.date, "yyyy-MM-dd");
            if (!meetingsByDate[dateKey]) {
                meetingsByDate[dateKey] = [];
            }
            meetingsByDate[dateKey].push(meeting);
        });
        return meetingsByDate;
    };

    const meetingsByDate = getMeetingsForMonth();

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
                        <p className="text-gray-600 mt-1">
                            View and manage your scheduled meetings
                        </p>
                    </div>
                    <Button onClick={() => alert("Add Event functionality coming soon!")}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Event
                    </Button>
                </div>

                {/* Calendar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Calendar Grid */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => navigateMonth("prev")}
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => navigateMonth("next")}
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Week day headers */}
                                <div className="grid grid-cols-7 gap-1 mb-4">
                                    {weekDays.map(day => (
                                        <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar days */}
                                <div className="grid grid-cols-7 gap-1">
                                    {monthDays.map(day => {
                                        const dateKey = format(day, "yyyy-MM-dd");
                                        const dayMeetings = meetingsByDate[dateKey] || [];
                                        const isToday = isSameDay(day, new Date());
                                        const isSelected = selectedDate && isSameDay(day, selectedDate);

                                        return (
                                            <div
                                                key={day.toISOString()}
                                                className={`
                          min-h-[100px] p-2 border rounded-lg cursor-pointer hover:bg-gray-50
                          ${isToday ? "bg-blue-50 border-blue-200" : "border-gray-200"}
                          ${isSelected ? "ring-2 ring-blue-500" : ""}
                        `}
                                                onClick={() => setSelectedDate(day)}
                                            >
                                                <div className="text-sm font-medium mb-1">
                                                    {format(day, "d")}
                                                </div>
                                                <div className="space-y-1">
                                                    {dayMeetings.slice(0, 2).map(meeting => (
                                                        <div
                                                            key={meeting.id}
                                                            className="text-xs p-1 rounded bg-blue-100 text-blue-800 truncate"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedMeeting(meeting);
                                                            }}
                                                        >
                                                            {meeting.title}
                                                        </div>
                                                    ))}
                                                    {dayMeetings.length > 2 && (
                                                        <div className="text-xs text-gray-500">
                                                            +{dayMeetings.length - 2} more
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Selected Date Details */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
                                </CardTitle>
                                <CardDescription>
                                    {selectedDate ? `${getMeetingsForDate(selectedDate).length} meeting(s)` : "Click on a date to view details"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {selectedDate && (
                                    <div className="space-y-4">
                                        {getMeetingsForDate(selectedDate).map(meeting => (
                                            <div
                                                key={meeting.id}
                                                className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                                                onClick={() => setSelectedMeeting(meeting)}
                                            >
                                                <h4 className="font-medium text-sm mb-2">{meeting.title}</h4>
                                                <div className="space-y-1 text-xs text-gray-600">
                                                    <div className="flex items-center">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {meeting.time}
                                                    </div>
                                                    <div className="flex items-center">
                                                        {meeting.type === "virtual" ? (
                                                            <Video className="w-3 h-3 mr-1" />
                                                        ) : (
                                                            <Building className="w-3 h-3 mr-1" />
                                                        )}
                                                        {meeting.location}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Users className="w-3 h-3 mr-1" />
                                                        {meeting.professor}
                                                    </div>
                                                </div>
                                                <Badge
                                                    variant={meeting.status === "confirmed" ? "default" : "secondary"}
                                                    className="mt-2 text-xs"
                                                >
                                                    {meeting.status}
                                                </Badge>
                                            </div>
                                        ))}
                                        {getMeetingsForDate(selectedDate).length === 0 && (
                                            <p className="text-sm text-gray-500 text-center py-4">
                                                No meetings scheduled for this date
                                            </p>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Meeting Details Dialog */}
                <Dialog open={!!selectedMeeting} onOpenChange={() => setSelectedMeeting(null)}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>{selectedMeeting?.title}</DialogTitle>
                            <DialogDescription>
                                {selectedMeeting && format(selectedMeeting.date, "MMMM d, yyyy")}
                            </DialogDescription>
                        </DialogHeader>

                        {selectedMeeting && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Time</Label>
                                        <div className="flex items-center text-sm">
                                            <Clock className="w-4 h-4 mr-2" />
                                            {selectedMeeting.time}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Location</Label>
                                        <div className="flex items-center text-sm">
                                            {selectedMeeting.type === "virtual" ? (
                                                <Video className="w-4 h-4 mr-2" />
                                            ) : (
                                                <Building className="w-4 h-4 mr-2" />
                                            )}
                                            {selectedMeeting.location}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Professor/Instructor</Label>
                                    <div className="flex items-center space-x-2">
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback>
                                                {selectedMeeting.professor.split(" ")[1][0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">{selectedMeeting.professor}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Course</Label>
                                    <p className="text-sm">{selectedMeeting.course}</p>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Attendees</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedMeeting.attendees.map((attendee, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {attendee}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Description</Label>
                                    <p className="text-sm text-gray-600">{selectedMeeting.description}</p>
                                </div>

                                <div className="flex items-center justify-between pt-4">
                                    <Badge
                                        variant={selectedMeeting.status === "confirmed" ? "default" : "secondary"}
                                    >
                                        {selectedMeeting.status}
                                    </Badge>
                                    <div className="space-x-2">
                                        <Button variant="outline" size="sm">
                                            Edit
                                        </Button>
                                        <Button size="sm">
                                            {selectedMeeting.type === "virtual" ? "Join Meeting" : "View Location"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
