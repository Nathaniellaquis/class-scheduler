"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, User, BookOpen } from "lucide-react";

// Mock data for available professors and their office hours
const professors = [
  {
    id: 1,
    name: "Prof. Smith",
    department: "Computer Science",
    courses: ["CS 101", "CS 102"],
    officeHours: [
      { day: "Monday", time: "2:00 PM - 4:00 PM", location: "Room 205, CS Building" },
      { day: "Wednesday", time: "10:00 AM - 12:00 PM", location: "Zoom Meeting" },
      { day: "Friday", time: "1:00 PM - 3:00 PM", location: "Room 205, CS Building" }
    ]
  },
  {
    id: 2,
    name: "Prof. Johnson",
    department: "Computer Science",
    courses: ["CS 201", "CS 202"],
    officeHours: [
      { day: "Tuesday", time: "3:00 PM - 5:00 PM", location: "Room 210, CS Building" },
      { day: "Thursday", time: "11:00 AM - 1:00 PM", location: "Zoom Meeting" }
    ]
  },
  {
    id: 3,
    name: "Prof. Davis",
    department: "Computer Science",
    courses: ["CS 301", "CS 302"],
    officeHours: [
      { day: "Monday", time: "4:00 PM - 6:00 PM", location: "Room 310, Eng Building" },
      { day: "Wednesday", time: "2:00 PM - 4:00 PM", location: "Zoom Meeting" }
    ]
  }
];

interface BookMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookMeetingModal({ isOpen, onClose }: BookMeetingModalProps) {
  const [selectedProfessor, setSelectedProfessor] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [reason, setReason] = useState("");
  const router = useRouter();

  const selectedProfData = professors.find(p => p.name === selectedProfessor);
  const availableTimeSlots = selectedProfData?.officeHours || [];

  const handleBookMeeting = () => {
    if (selectedProfessor && selectedCourse && selectedTimeSlot && reason) {
      // Mock booking - in real app this would call API
      const selectedSlot = availableTimeSlots.find(slot => `${slot.day} ${slot.time}` === selectedTimeSlot);
      alert(`Meeting booked successfully!\n\nProfessor: ${selectedProfessor}\nCourse: ${selectedCourse}\nTime: ${selectedTimeSlot}\nLocation: ${selectedSlot?.location}\nReason: ${reason}`);

      // Reset form
      setSelectedProfessor("");
      setSelectedCourse("");
      setSelectedTimeSlot("");
      setReason("");

      // Close modal and redirect to booking confirmation
      onClose();
      router.push("/booking");
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Book a Meeting
          </DialogTitle>
          <DialogDescription>
            Schedule office hours with a professor or teaching assistant
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Select Professor */}
          <div className="space-y-2">
            <Label>Select Professor/TA</Label>
            <Select value={selectedProfessor} onValueChange={setSelectedProfessor}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a professor or TA" />
              </SelectTrigger>
              <SelectContent>
                {professors.map((prof) => (
                  <SelectItem key={prof.id} value={prof.name}>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {prof.name.split(" ")[1][0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{prof.name}</div>
                        <div className="text-xs text-gray-500">{prof.department}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Select Course */}
          {selectedProfessor && (
            <div className="space-y-2">
              <Label>Select Course</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  {selectedProfData?.courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Select Time Slot */}
          {selectedProfessor && selectedCourse && (
            <div className="space-y-2">
              <Label>Select Available Time</Label>
              <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an available time slot" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimeSlots.map((slot, index) => (
                    <SelectItem key={index} value={`${slot.day} ${slot.time}`}>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div className="font-medium">{slot.day}</div>
                          <div className="text-sm text-gray-500">{slot.time}</div>
                        </div>
                        <div className="text-xs text-gray-500 ml-4">
                          {slot.location.includes("Zoom") ? "🎥 Virtual" : "🏢 In-person"}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Selected Time Details */}
          {selectedTimeSlot && (
            <div className="p-3 bg-blue-50 rounded-lg">
              {(() => {
                const selectedSlot = availableTimeSlots.find(slot => `${slot.day} ${slot.time}` === selectedTimeSlot);
                return selectedSlot ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{selectedSlot.day}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{selectedSlot.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedSlot.location.includes("Zoom") ? (
                        <User className="w-4 h-4 text-blue-600" />
                      ) : (
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      )}
                      <span className="text-sm">{selectedSlot.location}</span>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}

          {/* Reason for Meeting */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Meeting</Label>
            <Textarea
              id="reason"
              placeholder="Briefly describe what you'd like to discuss..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleBookMeeting}
              disabled={!selectedProfessor || !selectedCourse || !selectedTimeSlot || !reason.trim()}
              className="flex-1"
            >
              Book Meeting
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
