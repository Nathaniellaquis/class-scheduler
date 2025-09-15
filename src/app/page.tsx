"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users, UserCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (userType: string) => {
    // Mock login - in a real app, this would validate credentials
    if (email && password) {
      // Store user type in localStorage for demo purposes
      localStorage.setItem("userType", userType);
      localStorage.setItem("userEmail", email);
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Class Scheduler</h1>
          <p className="text-gray-600">University Office Hours & Meeting System</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Choose your role and enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="professor" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Professor
                </TabsTrigger>
                <TabsTrigger value="ta" className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  TA
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">University Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <Input
                    id="student-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleLogin("student")}
                  disabled={!email || !password}
                >
                  Sign In as Student
                </Button>
              </TabsContent>

              <TabsContent value="professor" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="professor-email">University Email</Label>
                  <Input
                    id="professor-email"
                    type="email"
                    placeholder="professor@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="professor-password">Password</Label>
                  <Input
                    id="professor-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleLogin("professor")}
                  disabled={!email || !password}
                >
                  Sign In as Professor
                </Button>
              </TabsContent>

              <TabsContent value="ta" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ta-email">University Email</Label>
                  <Input
                    id="ta-email"
                    type="email"
                    placeholder="ta@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ta-password">Password</Label>
                  <Input
                    id="ta-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleLogin("ta")}
                  disabled={!email || !password}
                >
                  Sign In as TA
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600">Demo credentials: Use any email and password to continue</p>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/signup/student" className="text-blue-600 hover:underline">
                    Sign up as Student
                  </Link>{" "}
                  or{" "}
                  <Link href="/signup/professor" className="text-blue-600 hover:underline">
                    Professor/TA
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
