"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Users, UserCheck, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function ProfessorSignupPage() {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        department: "",
        office: "",
        bio: "",
        agreeToTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        // Username validation
        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        } else if (formData.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password must contain at least one capital letter and one special character";
        }

        // Confirm password validation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        // Role validation
        if (!formData.role) {
            newErrors.role = "Please select your role";
        }

        // Terms agreement
        if (!formData.agreeToTerms) {
            newErrors.terms = "You must agree to the terms and conditions";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // Mock signup - in a real app, this would call an API
            alert(`${formData.role} account created successfully!\n\nName: ${formData.name}\nUsername: ${formData.username}\nEmail: ${formData.email}\nDepartment: ${formData.department}`);

            // Store user data in localStorage for demo
            localStorage.setItem("userType", formData.role.toLowerCase());
            localStorage.setItem("userName", formData.name);
            localStorage.setItem("userEmail", formData.email);
            localStorage.setItem("userUsername", formData.username);
            localStorage.setItem("userDepartment", formData.department);
            localStorage.setItem("userOffice", formData.office);

            router.push("/dashboard");
        }
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back to Login Link */}
                <div className="mb-4">
                    <Link href="/">
                        <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Login
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                {formData.role === "Professor" ? (
                                    <Users className="w-6 h-6 text-green-600" />
                                ) : (
                                    <UserCheck className="w-6 h-6 text-green-600" />
                                )}
                            </div>
                        </div>
                        <CardTitle className="text-center">Professor/TA Signup</CardTitle>
                        <CardDescription className="text-center">
                            Create your account to manage office hours and student meetings
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Role Selection */}
                            <div className="space-y-2">
                                <Label htmlFor="role">I am a:</Label>
                                <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                                    <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                                        <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Professor">Professor</SelectItem>
                                        <SelectItem value="TA">Teaching Assistant</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && <p className="text-sm text-red-600">{errors.role}</p>}
                            </div>

                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    className={errors.name ? "border-red-500" : ""}
                                />
                                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                            </div>

                            {/* Username */}
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Choose a username"
                                    value={formData.username}
                                    onChange={(e) => handleInputChange("username", e.target.value)}
                                    className={errors.username ? "border-red-500" : ""}
                                />
                                {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your.email@university.edu"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    className={errors.email ? "border-red-500" : ""}
                                />
                                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                            </div>

                            {/* Department */}
                            <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <Input
                                    id="department"
                                    type="text"
                                    placeholder="e.g., Computer Science"
                                    value={formData.department}
                                    onChange={(e) => handleInputChange("department", e.target.value)}
                                />
                            </div>

                            {/* Office */}
                            <div className="space-y-2">
                                <Label htmlFor="office">Office Location</Label>
                                <Input
                                    id="office"
                                    type="text"
                                    placeholder="e.g., CS 205"
                                    value={formData.office}
                                    onChange={(e) => handleInputChange("office", e.target.value)}
                                />
                            </div>

                            {/* Bio */}
                            <div className="space-y-2">
                                <Label htmlFor="bio">Short Bio (Optional)</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Brief description about yourself..."
                                    value={formData.bio}
                                    onChange={(e) => handleInputChange("bio", e.target.value)}
                                    rows={3}
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange("password", e.target.value)}
                                        className={errors.password ? "border-red-500" : ""}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4 text-gray-400" />
                                        ) : (
                                            <Eye className="w-4 h-4 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                                <p className="text-xs text-gray-500">
                                    Must contain at least 8 characters, one capital letter, and one special character
                                </p>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                        className={errors.confirmPassword ? "border-red-500" : ""}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-4 h-4 text-gray-400" />
                                        ) : (
                                            <Eye className="w-4 h-4 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                            </div>

                            {/* Terms Agreement */}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="terms"
                                    checked={formData.agreeToTerms}
                                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", !!checked)}
                                />
                                <Label htmlFor="terms" className="text-sm">
                                    I agree to the{" "}
                                    <Link href="#" className="text-green-600 hover:underline">
                                        Terms and Conditions
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="#" className="text-green-600 hover:underline">
                                        Privacy Policy
                                    </Link>
                                </Label>
                            </div>
                            {errors.terms && <p className="text-sm text-red-600">{errors.terms}</p>}

                            {/* Submit Button */}
                            <Button type="submit" className="w-full">
                                Create {formData.role || "Professor/TA"} Account
                            </Button>
                        </form>

                        {/* Already have account */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link href="/" className="text-green-600 hover:underline">
                                    Sign in here
                                </Link>
                            </p>
                        </div>

                        {/* Student Signup Link */}
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Are you a student?{" "}
                                <Link href="/signup/student" className="text-green-600 hover:underline">
                                    Sign up here
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
