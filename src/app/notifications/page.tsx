"use client";

import { useState } from "react";
import Link from "next/link";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Bell,
    Calendar,
    MessageSquare,
    AlertCircle,
    CheckCircle,
    Clock,
    Send,
    Trash2,
    Mail,
    Phone
} from "lucide-react";

// Mock notification data
const notifications = [
    {
        id: 1,
        type: "meeting_reminder",
        title: "Upcoming Meeting Reminder",
        message: "You have an office hours appointment with Prof. Smith in 30 minutes",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        priority: "high",
        actionRequired: false
    },
    {
        id: 2,
        type: "booking_confirmed",
        title: "Appointment Confirmed",
        message: "Your booking with Prof. Johnson for CS 201 has been confirmed for tomorrow at 2:00 PM",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        priority: "medium",
        actionRequired: false
    },
    {
        id: 3,
        type: "office_hours_change",
        title: "Office Hours Updated",
        message: "Prof. Davis has updated their office hours. New schedule: Monday 3-5 PM",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        read: true,
        priority: "medium",
        actionRequired: false
    },
    {
        id: 4,
        type: "cancellation_request",
        title: "Cancellation Request",
        message: "Student Jane Smith has requested to cancel their appointment for Friday 1:00 PM",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: false,
        priority: "high",
        actionRequired: true
    },
    {
        id: 5,
        type: "system_update",
        title: "System Maintenance",
        message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        read: true,
        priority: "low",
        actionRequired: false
    }
];

const messages = [
    {
        id: 1,
        from: "Prof. Smith",
        fromEmail: "smith@university.edu",
        subject: "Question about Assignment 3",
        content: "Hi, I had a question about the requirements for Assignment 3. Could we discuss this during our meeting tomorrow?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
        read: false,
        type: "question"
    },
    {
        id: 2,
        from: "Alex Johnson (TA)",
        fromEmail: "alex.j@university.edu",
        subject: "Office Hours Rescheduling",
        content: "Hi, I need to reschedule our meeting for next week due to a family emergency. Would Thursday work instead?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        read: true,
        type: "reschedule"
    },
    {
        id: 3,
        from: "Prof. Davis",
        fromEmail: "davis@university.edu",
        subject: "Project Feedback",
        content: "I've reviewed your project proposal and have some suggestions for improvement. Let's discuss during office hours.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        type: "feedback"
    }
];

export default function NotificationsPage() {
    const [activeTab, setActiveTab] = useState("notifications");
    const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(null);
    const [replyContent, setReplyContent] = useState("");

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "meeting_reminder":
                return <Calendar className="w-4 h-4" />;
            case "booking_confirmed":
                return <CheckCircle className="w-4 h-4" />;
            case "office_hours_change":
                return <Clock className="w-4 h-4" />;
            case "cancellation_request":
                return <AlertCircle className="w-4 h-4" />;
            default:
                return <Bell className="w-4 h-4" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-800";
            case "medium":
                return "bg-yellow-100 text-yellow-800";
            case "low":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const unreadNotifications = notifications.filter(n => !n.read).length;
    const unreadMessages = messages.filter(m => !m.read).length;

    const handleReply = () => {
        if (replyContent.trim() && selectedMessage) {
            // In a real app, this would send the reply
            alert(`Reply sent to ${selectedMessage.from}: ${replyContent}`);
            setReplyContent("");
            setSelectedMessage(null);
        }
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Notifications & Messages</h1>
                        <p className="text-gray-600 mt-1">
                            Stay updated with your appointments and communications
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Link href="/settings">
                            <Button variant="outline">
                                <Mail className="w-4 h-4 mr-2" />
                                Email Settings
                            </Button>
                        </Link>
                        <Link href="/settings">
                            <Button variant="outline">
                                <Phone className="w-4 h-4 mr-2" />
                                SMS Settings
                            </Button>
                        </Link>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="notifications" className="flex items-center gap-2">
                            <Bell className="w-4 h-4" />
                            Notifications
                            {unreadNotifications > 0 && (
                                <Badge variant="destructive" className="ml-2">
                                    {unreadNotifications}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="messages" className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Messages
                            {unreadMessages > 0 && (
                                <Badge variant="destructive" className="ml-2">
                                    {unreadMessages}
                                </Badge>
                            )}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="notifications" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Recent Notifications</CardTitle>
                                        <CardDescription>
                                            Stay informed about your appointments and updates
                                        </CardDescription>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Mark All Read
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`flex items-start space-x-4 p-4 border rounded-lg ${!notification.read ? "bg-blue-50 border-blue-200" : "bg-white"
                                                }`}
                                        >
                                            <div className={`p-2 rounded-full ${getPriorityColor(notification.priority)}`}>
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className="font-medium">{notification.title}</h3>
                                                    <div className="flex items-center space-x-2">
                                                        <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                                                            {notification.priority}
                                                        </Badge>
                                                        <span className="text-xs text-gray-500">
                                                            {notification.timestamp.toLocaleTimeString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                                                {notification.actionRequired && (
                                                    <div className="flex space-x-2">
                                                        <Button size="sm">Approve</Button>
                                                        <Button size="sm" variant="outline">Deny</Button>
                                                    </div>
                                                )}
                                            </div>
                                            {!notification.read && (
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="messages" className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Messages List */}
                            <div className="lg:col-span-1">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Inbox</CardTitle>
                                        <CardDescription>Your messages from professors and TAs</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {messages.map((message) => (
                                                <div
                                                    key={message.id}
                                                    className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${!message.read ? "bg-blue-50 border-blue-200" : ""
                                                        } ${selectedMessage?.id === message.id ? "ring-2 ring-blue-500" : ""}`}
                                                    onClick={() => setSelectedMessage(message)}
                                                >
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="font-medium text-sm">{message.from}</h4>
                                                        <span className="text-xs text-gray-500">
                                                            {message.timestamp.toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm font-medium mb-1">{message.subject}</p>
                                                    <p className="text-xs text-gray-600 truncate">{message.content}</p>
                                                    {!message.read && (
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Message Details */}
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            {selectedMessage ? selectedMessage.subject : "Select a message"}
                                        </CardTitle>
                                        {selectedMessage && (
                                            <CardDescription>
                                                From {selectedMessage.from} • {selectedMessage.timestamp.toLocaleString()}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        {selectedMessage ? (
                                            <div className="space-y-4">
                                                <div className="p-4 bg-gray-50 rounded-lg">
                                                    <p className="text-sm">{selectedMessage.content}</p>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="reply">Reply</Label>
                                                    <Textarea
                                                        id="reply"
                                                        placeholder="Type your reply..."
                                                        value={replyContent}
                                                        onChange={(e) => setReplyContent(e.target.value)}
                                                        rows={4}
                                                    />
                                                </div>

                                                <div className="flex space-x-2">
                                                    <Button onClick={handleReply} disabled={!replyContent.trim()}>
                                                        <Send className="w-4 h-4 mr-2" />
                                                        Send Reply
                                                    </Button>
                                                    <Button variant="outline">
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-gray-500">
                                                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                                <p>Select a message to view details</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
