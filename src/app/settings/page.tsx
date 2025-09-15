"use client";

import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    User,
    Bell,
    Calendar,
    Shield,
    Globe,
    Mail,
    Phone,
    Clock,
    Save,
    Upload
} from "lucide-react";

// Mock user data
const userData = {
    name: "John Doe",
    email: "john.doe@university.edu",
    role: "student",
    timezone: "America/New_York",
    avatar: null
};

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        // Notification Settings
        emailNotifications: true,
        smsNotifications: false,
        reminderNotifications: true,
        reminderTime: "30", // minutes before meeting

        // Calendar Integration
        googleCalendar: true,
        outlookCalendar: false,
        appleCalendar: true,

        // Privacy Settings
        profileVisibility: "private",
        showEmail: false,
        showPhone: false,

        // Account Settings
        name: userData.name,
        email: userData.email,
        timezone: userData.timezone,
        bio: "Computer Science major interested in software engineering and AI."
    });

    const handleSave = () => {
        // In a real app, this would save to backend
        alert("Settings saved successfully!");
    };

    const updateSetting = (key: string, value: string | boolean | number) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                        <p className="text-gray-600 mt-1">
                            Manage your account preferences and integrations
                        </p>
                    </div>
                    <Button onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </Button>
                </div>

                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="profile" className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="flex items-center gap-2">
                            <Bell className="w-4 h-4" />
                            Notifications
                        </TabsTrigger>
                        <TabsTrigger value="calendar" className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Calendar
                        </TabsTrigger>
                        <TabsTrigger value="privacy" className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Privacy
                        </TabsTrigger>
                    </TabsList>

                    {/* Profile Settings */}
                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>
                                    Update your personal information and profile details
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Avatar Section */}
                                <div className="flex items-center space-x-4">
                                    <Avatar className="w-20 h-20">
                                        <AvatarImage src={userData.avatar || ""} />
                                        <AvatarFallback className="text-lg">
                                            {userData.name.split(" ").map(n => n[0]).join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <Button variant="outline" onClick={() => alert("Avatar upload functionality coming soon!")}>
                                            <Upload className="w-4 h-4 mr-2" />
                                            Change Avatar
                                        </Button>
                                        <p className="text-sm text-gray-500 mt-1">
                                            JPG, GIF or PNG. 1MB max.
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                {/* Personal Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={settings.name}
                                            onChange={(e) => updateSetting("name", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={settings.email}
                                            onChange={(e) => updateSetting("email", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="America/New_York">Eastern Time</SelectItem>
                                            <SelectItem value="America/Chicago">Central Time</SelectItem>
                                            <SelectItem value="America/Denver">Mountain Time</SelectItem>
                                            <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                                            <SelectItem value="Europe/London">London</SelectItem>
                                            <SelectItem value="Europe/Paris">Paris</SelectItem>
                                            <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        placeholder="Tell us about yourself..."
                                        value={settings.bio}
                                        onChange={(e) => updateSetting("bio", e.target.value)}
                                        rows={3}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notification Settings */}
                    <TabsContent value="notifications">
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Email Notifications</CardTitle>
                                    <CardDescription>
                                        Choose how you want to receive email notifications
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <Label>Appointment Confirmations</Label>
                                            <p className="text-sm text-gray-500">
                                                Receive emails when appointments are confirmed or changed
                                            </p>
                                        </div>
                                        <Switch
                                            checked={settings.emailNotifications}
                                            onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <Label>Meeting Reminders</Label>
                                            <p className="text-sm text-gray-500">
                                                Get reminded before your scheduled meetings
                                            </p>
                                        </div>
                                        <Switch
                                            checked={settings.reminderNotifications}
                                            onCheckedChange={(checked) => updateSetting("reminderNotifications", checked)}
                                        />
                                    </div>

                                    {settings.reminderNotifications && (
                                        <div className="ml-6 space-y-2">
                                            <Label htmlFor="reminderTime">Reminder Time</Label>
                                            <Select
                                                value={settings.reminderTime}
                                                onValueChange={(value) => updateSetting("reminderTime", value)}
                                            >
                                                <SelectTrigger className="w-48">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="15">15 minutes before</SelectItem>
                                                    <SelectItem value="30">30 minutes before</SelectItem>
                                                    <SelectItem value="60">1 hour before</SelectItem>
                                                    <SelectItem value="120">2 hours before</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>SMS Notifications</CardTitle>
                                    <CardDescription>
                                        Receive important notifications via text message
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <Label>Urgent Notifications</Label>
                                            <p className="text-sm text-gray-500">
                                                Receive SMS for urgent appointment changes or cancellations
                                            </p>
                                        </div>
                                        <Switch
                                            checked={settings.smsNotifications}
                                            onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Calendar Integration */}
                    <TabsContent value="calendar">
                        <Card>
                            <CardHeader>
                                <CardTitle>Calendar Integration</CardTitle>
                                <CardDescription>
                                    Sync your appointments with your preferred calendar applications
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                                            <span className="text-red-600 font-bold text-sm">G</span>
                                        </div>
                                        <div>
                                            <Label>Google Calendar</Label>
                                            <p className="text-sm text-gray-500">
                                                Sync appointments with Google Calendar
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={settings.googleCalendar}
                                        onCheckedChange={(checked) => updateSetting("googleCalendar", checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                            <span className="text-blue-600 font-bold text-sm">O</span>
                                        </div>
                                        <div>
                                            <Label>Microsoft Outlook</Label>
                                            <p className="text-sm text-gray-500">
                                                Sync appointments with Outlook Calendar
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={settings.outlookCalendar}
                                        onCheckedChange={(checked) => updateSetting("outlookCalendar", checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                                            <Calendar className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <div>
                                            <Label>Apple Calendar</Label>
                                            <p className="text-sm text-gray-500">
                                                Sync appointments with Apple Calendar
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={settings.appleCalendar}
                                        onCheckedChange={(checked) => updateSetting("appleCalendar", checked)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Privacy Settings */}
                    <TabsContent value="privacy">
                        <Card>
                            <CardHeader>
                                <CardTitle>Privacy Settings</CardTitle>
                                <CardDescription>
                                    Control your privacy and data sharing preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Profile Visibility</Label>
                                    <Select
                                        value={settings.profileVisibility}
                                        onValueChange={(value) => updateSetting("profileVisibility", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                                            <SelectItem value="private">Private - Only professors and TAs can see your profile</SelectItem>
                                            <SelectItem value="hidden">Hidden - Only you can see your profile</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label>Show Email Address</Label>
                                        <p className="text-sm text-gray-500">
                                            Allow others to see your email address
                                        </p>
                                    </div>
                                    <Switch
                                        checked={settings.showEmail}
                                        onCheckedChange={(checked) => updateSetting("showEmail", checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label>Show Phone Number</Label>
                                        <p className="text-sm text-gray-500">
                                            Allow others to see your phone number
                                        </p>
                                    </div>
                                    <Switch
                                        checked={settings.showPhone}
                                        onCheckedChange={(checked) => updateSetting("showPhone", checked)}
                                    />
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h4 className="font-medium text-sm">Data Retention</h4>
                                    <p className="text-sm text-gray-600">
                                        Your appointment data is automatically deleted 7 years after your last activity,
                                        in compliance with university retention policies.
                                    </p>
                                    <Button variant="outline" size="sm" onClick={() => alert("Data export request submitted! You'll receive an email with your data within 24 hours.")}>
                                        Request Data Export
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
