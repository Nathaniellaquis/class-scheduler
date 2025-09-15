"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    CheckCircle,
    Calendar,
    Clock,
    Video,
    Building,
    Mail,
    Bell,
    ArrowLeft,
    Download,
    Share2
} from "lucide-react";

// Mock booking data - in a real app, this would come from URL params or API
const mockBooking = {
    id: "BK-2024-001",
    professor: "Prof. Smith",
    course: "CS 101",
    date: "January 15, 2024",
    time: "2:00 PM - 3:00 PM",
    location: "Room 205, CS Building",
    type: "in-person",
    status: "confirmed",
    reason: "Discussion about assignment 3 requirements and project setup",
    meetingLink: "https://zoom.us/j/123456789",
    calendarInvite: true,
    emailNotification: true
};

function BookingConfirmationPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [booking] = useState(mockBooking);

    // In a real app, you'd fetch booking data based on ID from URL params
    useEffect(() => {
        const bookingId = searchParams.get("id");
        if (bookingId) {
            // Fetch booking data from API
            console.log("Fetching booking:", bookingId);
        }
    }, [searchParams]);

    const handleAddToCalendar = () => {
        // In a real app, this would generate and download an .ics file
        alert("Calendar invite downloaded! Check your downloads folder.");
    };

    const handleShareBooking = () => {
        // In a real app, this would use the Web Share API or copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert("Booking link copied to clipboard!");
    };

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Success Header */}
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Booking Confirmed!
                    </h1>
                    <p className="text-gray-600">
                        Your appointment has been successfully scheduled
                    </p>
                </div>

                {/* Booking Details Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Appointment Details</CardTitle>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                                {booking.status}
                            </Badge>
                        </div>
                        <CardDescription>
                            Booking ID: {booking.id}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Professor Info */}
                        <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
                                <AvatarFallback>
                                    {booking.professor.split(" ")[1][0]}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-medium">{booking.professor}</h3>
                                <p className="text-sm text-gray-600">{booking.course} Office Hours</p>
                            </div>
                        </div>

                        <Separator />

                        {/* Meeting Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="font-medium">{booking.date}</p>
                                        <p className="text-sm text-gray-600">Date</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="font-medium">{booking.time}</p>
                                        <p className="text-sm text-gray-600">Time</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    {booking.type === "virtual" ? (
                                        <Video className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <Building className="w-5 h-5 text-gray-400" />
                                    )}
                                    <div>
                                        <p className="font-medium">{booking.location}</p>
                                        <p className="text-sm text-gray-600">
                                            {booking.type === "virtual" ? "Virtual Meeting" : "In-Person"}
                                        </p>
                                    </div>
                                </div>

                                {booking.type === "virtual" && (
                                    <div className="flex items-center space-x-3">
                                        <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                                            <span className="text-blue-600 text-xs font-bold">Z</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Zoom Meeting</p>
                                            <p className="text-sm text-gray-600">Meeting Link</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Reason for Meeting */}
                        <div className="space-y-2">
                            <h4 className="font-medium">Reason for Meeting</h4>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                {booking.reason}
                            </p>
                        </div>

                        <Separator />

                        {/* Notifications */}
                        <div className="space-y-3">
                            <h4 className="font-medium">Notifications Sent</h4>
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-sm">Email confirmation sent to your inbox</span>
                            </div>
                            {booking.calendarInvite && (
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm">Calendar invite added to your calendar</span>
                                </div>
                            )}
                            {booking.emailNotification && (
                                <div className="flex items-center space-x-2">
                                    <Bell className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm">Reminder notifications enabled (30 min before)</span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => router.push("/dashboard")}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>

                    <div className="flex gap-3 flex-1">
                        <Button variant="outline" className="flex-1" onClick={handleAddToCalendar}>
                            <Download className="w-4 h-4 mr-2" />
                            Add to Calendar
                        </Button>

                        <Button variant="outline" className="flex-1" onClick={handleShareBooking}>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                        </Button>
                    </div>
                </div>

                {/* Additional Information */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <h4 className="font-medium">Important Information</h4>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p>• Please arrive 5-10 minutes early for your appointment</p>
                                <p>• If you need to cancel or reschedule, please do so at least 24 hours in advance</p>
                                <p>• For virtual meetings, test your audio/video setup before the meeting time</p>
                                <p>• Questions? Contact the professor directly or use the help section</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="flex justify-center space-x-4">
                    <Link href="/classes">
                        <Button variant="outline">
                            Book Another Meeting
                        </Button>
                    </Link>
                    <Link href="/calendar">
                        <Button variant="outline">
                            View Calendar
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}

export default function BookingConfirmationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BookingConfirmationPageContent />
        </Suspense>
    );
}
