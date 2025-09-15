"use client";

import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Building,
  MessageSquare,
  Send,
  X,
  AlertCircle,
  CheckCircle,
  User
} from "lucide-react";

// Mock meetings data with enhanced details
const meetings = [
  {
    id: 1,
    title: "Office Hours with Prof. Smith",
    professor: "Prof. Smith",
    student: "John Doe",
    course: "CS 101",
    date: "2024-01-15",
    time: "2:00 PM - 3:00 PM",
    location: "Room 205, CS Building",
    type: "in-person",
    status: "confirmed",
    topic: "Assignment 3 Review",
    zoomLink: "https://zoom.us/j/123456789",
    comments: [
      {
        id: 1,
        author: "Prof. Smith",
        message: "Please bring your assignment questions and any specific areas you'd like to focus on.",
        timestamp: "2024-01-14 10:30 AM"
      },
      {
        id: 2,
        author: "John Doe",
        message: "Thanks Professor! I'll prepare questions about the sorting algorithms section.",
        timestamp: "2024-01-14 2:15 PM"
      }
    ]
  },
  {
    id: 2,
    title: "TA Session with Alex Johnson",
    professor: "Alex Johnson (TA)",
    student: "John Doe",
    course: "CS 201",
    date: "2024-01-16",
    time: "10:00 AM - 11:00 AM",
    location: "Zoom Meeting",
    type: "virtual",
    status: "confirmed",
    topic: "Data Structures Help",
    zoomLink: "https://zoom.us/j/987654321",
    comments: [
      {
        id: 3,
        author: "Alex Johnson",
        message: "Let's review the binary tree implementation you were working on.",
        timestamp: "2024-01-15 4:20 PM"
      }
    ]
  },
  {
    id: 3,
    title: "Project Review with Prof. Davis",
    professor: "Prof. Davis",
    student: "John Doe",
    course: "CS 301",
    date: "2024-01-18",
    time: "4:00 PM - 5:00 PM",
    location: "Room 310, Eng Building",
    type: "in-person",
    status: "pending",
    topic: "Final Project Milestone",
    zoomLink: "",
    comments: []
  }
];

export default function MeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<typeof meetings[0] | null>(null);
  const [newComment, setNewComment] = useState("");
  const [locationChange, setLocationChange] = useState("");
  const userType = localStorage.getItem("userType") || "student";

  const handleAddComment = () => {
    if (newComment.trim() && selectedMeeting) {
      // Mock comment addition - in real app this would call API
      alert("Comment added: " + newComment);
      setNewComment("");
    }
  };

  const handleLocationChange = () => {
    if (locationChange.trim() && selectedMeeting) {
      // Mock location change - in real app this would call API
      alert("Location change requested: " + locationChange);
      setLocationChange("");
    }
  };

  const handleCancellation = (meetingId: number) => {
    // Mock cancellation - in real app this would call API
    alert("Cancellation request submitted for meeting ID: " + meetingId);
  };

  const sortedMeetings = [...meetings].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time.split(' - ')[0]}`);
    const dateB = new Date(`${b.date} ${b.time.split(' - ')[0]}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Upcoming Meetings</h1>
            <p className="text-gray-600 mt-1">
              Manage your scheduled meetings and office hours
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
          </div>
        </div>

        {/* Meetings List */}
        <div className="space-y-4">
          {sortedMeetings.map((meeting) => (
            <Card key={meeting.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback>
                        {meeting.professor.split(" ")[1]?.[0] || meeting.professor[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{meeting.title}</h3>
                      <p className="text-gray-600">{meeting.course} • {meeting.professor}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {meeting.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {meeting.time}
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
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={meeting.status === "confirmed" ? "default" : "secondary"}
                      className={
                        meeting.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {meeting.status}
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedMeeting(meeting)}>
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center justify-between">
                            <span>{meeting.title}</span>
                            <Badge
                              variant={meeting.status === "confirmed" ? "default" : "secondary"}
                              className={
                                meeting.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {meeting.status}
                            </Badge>
                          </DialogTitle>
                          <DialogDescription>
                            {meeting.date} • {meeting.time}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                          {/* Meeting Details */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Course</Label>
                              <p className="text-sm">{meeting.course}</p>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Topic</Label>
                              <p className="text-sm">{meeting.topic}</p>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Professor/TA</Label>
                              <div className="flex items-center space-x-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className="text-xs">
                                    {meeting.professor.split(" ")[1]?.[0] || meeting.professor[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{meeting.professor}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Student</Label>
                              <div className="flex items-center space-x-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className="text-xs">
                                    {meeting.student.split(" ")[1]?.[0] || meeting.student[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{meeting.student}</span>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Location & Meeting Type */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {meeting.type === "virtual" ? (
                                  <Video className="w-4 h-4" />
                                ) : (
                                  <Building className="w-4 h-4" />
                                )}
                                <span className="text-sm font-medium">
                                  {meeting.type === "virtual" ? "Virtual Meeting" : "In-Person Meeting"}
                                </span>
                              </div>
                              {meeting.zoomLink && (
                                <Button size="sm" variant="outline">
                                  Join Meeting
                                </Button>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{meeting.location}</p>
                            {meeting.zoomLink && (
                              <p className="text-xs text-blue-600 break-all">{meeting.zoomLink}</p>
                            )}
                          </div>

                          {/* Location Change Request */}
                          <div className="space-y-2">
                            <Label htmlFor="locationChange" className="text-sm font-medium">
                              Request Location Change
                            </Label>
                            <div className="flex space-x-2">
                              <Input
                                id="locationChange"
                                placeholder="Suggest alternative location..."
                                value={locationChange}
                                onChange={(e) => setLocationChange(e.target.value)}
                                className="flex-1"
                              />
                              <Button
                                size="sm"
                                onClick={handleLocationChange}
                                disabled={!locationChange.trim()}
                              >
                                Request
                              </Button>
                            </div>
                          </div>

                          <Separator />

                          {/* Comments Section */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm font-medium">Comments & Discussion</Label>
                              <Badge variant="outline" className="text-xs">
                                {meeting.comments.length} comments
                              </Badge>
                            </div>

                            {/* Existing Comments */}
                            <div className="space-y-3 max-h-40 overflow-y-auto">
                              {meeting.comments.map((comment) => (
                                <div key={comment.id} className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
                                  <Avatar className="w-8 h-8">
                                    <AvatarFallback className="text-xs">
                                      {comment.author.split(" ")[1]?.[0] || comment.author[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium">{comment.author}</span>
                                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-gray-700 mt-1">{comment.message}</p>
                                  </div>
                                </div>
                              ))}
                              {meeting.comments.length === 0 && (
                                <p className="text-sm text-gray-500 text-center py-4">
                                  No comments yet. Start the conversation!
                                </p>
                              )}
                            </div>

                            {/* Add Comment */}
                            <div className="space-y-2">
                              <Textarea
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                rows={3}
                              />
                              <Button
                                onClick={handleAddComment}
                                disabled={!newComment.trim()}
                                className="w-full"
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Add Comment
                              </Button>
                            </div>
                          </div>

                          <Separator />

                          {/* Action Buttons */}
                          <div className="flex justify-between">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Reschedule
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCancellation(meeting.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Cancel Meeting
                              </Button>
                            </div>
                            <Button>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark Complete
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedMeetings.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Meetings</h3>
              <p className="text-gray-600 mb-4">You don't have any scheduled meetings at the moment.</p>
              <Button>
                Schedule a Meeting
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
