"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Calendar,
    Clock,
    MapPin,
    Users,
    Video,
    Building,
    Plus,
    CheckCircle,
    AlertCircle
} from "lucide-react";

// Mock data for classes and office hours
const classes = [
    {
        id: 1,
        name: "Introduction to Computer Science",
        code: "CS 101",
        professor: "Prof. Smith",
        professorEmail: "smith@university.edu",
        enrolledStudents: 45,
        officeHours: [
            {
                id: 1,
                day: "Monday",
                time: "2:00 PM - 4:00 PM",
                location: "Room 205, CS Building",
                type: "in-person",
                capacity: 5,
                booked: 3,
                isAvailable: true
            },
            {
                id: 2,
                day: "Wednesday",
                time: "10:00 AM - 12:00 PM",
                location: "Zoom Meeting",
                type: "virtual",
                capacity: 10,
                booked: 8,
                isAvailable: true
            },
            {
                id: 3,
                day: "Friday",
                time: "1:00 PM - 3:00 PM",
                location: "Room 205, CS Building",
                type: "in-person",
                capacity: 5,
                booked: 5,
                isAvailable: false
            }
        ]
    },
    {
        id: 2,
        name: "Data Structures",
        code: "CS 201",
        professor: "Prof. Johnson",
        professorEmail: "johnson@university.edu",
        enrolledStudents: 38,
        officeHours: [
            {
                id: 4,
                day: "Tuesday",
                time: "3:00 PM - 5:00 PM",
                location: "Room 210, CS Building",
                type: "in-person",
                capacity: 6,
                booked: 4,
                isAvailable: true
            },
            {
                id: 5,
                day: "Thursday",
                time: "11:00 AM - 1:00 PM",
                location: "Zoom Meeting",
                type: "virtual",
                capacity: 8,
                booked: 6,
                isAvailable: true
            }
        ]
    },
    {
        id: 3,
        name: "Algorithms",
        code: "CS 301",
        professor: "Prof. Davis",
        professorEmail: "davis@university.edu",
        enrolledStudents: 32,
        officeHours: [
            {
                id: 6,
                day: "Monday",
                time: "4:00 PM - 6:00 PM",
                location: "Room 310, Eng Building",
                type: "in-person",
                capacity: 4,
                booked: 2,
                isAvailable: true
            },
            {
                id: 7,
                day: "Wednesday",
                time: "2:00 PM - 4:00 PM",
                location: "Zoom Meeting",
                type: "virtual",
                capacity: 12,
                booked: 9,
                isAvailable: true
            }
        ]
    }
];

export default function ClassesPage() {
    const router = useRouter();
    const [selectedClass, setSelectedClass] = useState<typeof classes[0] | null>(null);
    const [selectedOfficeHour, setSelectedOfficeHour] = useState<number | null>(null);
    const [bookingReason, setBookingReason] = useState("");

    const handleBookAppointment = (classData: typeof classes[0], officeHourId: number) => {
        setSelectedClass(classData);
        setSelectedOfficeHour(officeHourId);
    };

    const confirmBooking = () => {
        if (selectedClass && selectedOfficeHour && bookingReason) {
            // In a real app, this would make an API call
            router.push("/booking");
        }
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Classes & Office Hours</h1>
                        <p className="text-gray-600 mt-1">
                            Book appointments with professors and teaching assistants
                        </p>
                    </div>
                    <Button onClick={() => alert("Request submitted! We'll contact you about additional office hours.")}>
                        <Plus className="w-4 h-4 mr-2" />
                        Request Additional Hours
                    </Button>
                </div>

                {/* Classes Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {classes.map((course) => (
                        <Card key={course.id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{course.name}</CardTitle>
                                        <CardDescription>{course.code}</CardDescription>
                                    </div>
                                    <Badge variant="outline">
                                        {course.enrolledStudents} students
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="flex items-center space-x-3 mb-4">
                                    <Avatar>
                                        <AvatarFallback>
                                            {course.professor.split(" ")[1][0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{course.professor}</p>
                                        <p className="text-sm text-gray-600">{course.professorEmail}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-medium text-sm">Office Hours</h4>
                                    {course.officeHours.map((hour) => (
                                        <div key={hour.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <Badge variant="outline" className="text-xs">
                                                        {hour.day}
                                                    </Badge>
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {hour.time}
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    {hour.type === "virtual" ? (
                                                        <Video className="w-3 h-3 mr-1" />
                                                    ) : (
                                                        <Building className="w-3 h-3 mr-1" />
                                                    )}
                                                    {hour.location}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {hour.booked}/{hour.capacity} spots taken
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant={hour.isAvailable ? "default" : "secondary"}
                                                disabled={!hour.isAvailable}
                                                onClick={() => handleBookAppointment(course, hour.id)}
                                            >
                                                {hour.isAvailable ? "Book" : "Full"}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Booking Dialog */}
                <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Book Office Hours</DialogTitle>
                            <DialogDescription>
                                Confirm your appointment booking details
                            </DialogDescription>
                        </DialogHeader>

                        {selectedClass && selectedOfficeHour && (
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-medium mb-2">{selectedClass.name}</h3>
                                    <p className="text-sm text-gray-600 mb-1">{selectedClass.professor}</p>
                                    {(() => {
                                        const hour = selectedClass.officeHours.find(h => h.id === selectedOfficeHour);
                                        return hour ? (
                                            <div className="text-sm space-y-1">
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    {hour.day}
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-2" />
                                                    {hour.time}
                                                </div>
                                                <div className="flex items-center">
                                                    {hour.type === "virtual" ? (
                                                        <Video className="w-4 h-4 mr-2" />
                                                    ) : (
                                                        <Building className="w-4 h-4 mr-2" />
                                                    )}
                                                    {hour.location}
                                                </div>
                                            </div>
                                        ) : null;
                                    })()}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reason">Reason for meeting</Label>
                                    <Textarea
                                        id="reason"
                                        placeholder="Briefly describe what you'd like to discuss..."
                                        value={bookingReason}
                                        onChange={(e) => setBookingReason(e.target.value)}
                                        rows={3}
                                    />
                                </div>

                                <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                                    <AlertCircle className="w-4 h-4 text-blue-600" />
                                    <p className="text-sm text-blue-800">
                                        You will receive a confirmation email and calendar invite
                                    </p>
                                </div>

                                <div className="flex space-x-3">
                                    <Button variant="outline" onClick={() => setSelectedClass(null)} className="flex-1">
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={confirmBooking}
                                        disabled={!bookingReason.trim()}
                                        className="flex-1"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Confirm Booking
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
