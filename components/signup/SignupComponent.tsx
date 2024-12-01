"use client"

import Image from "next/image";
import signinImage from './Login-amico.png'
import mainLogo from '@/public/mainLogo.png'
import { Button } from "../ui/button";
import Link from "next/link";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChromeIcon, KeyRoundIcon, Mail, User } from "lucide-react";
import { Separator } from "../ui/separator";
import { useState } from "react";

const SignUpComponet = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleGoogleSignUp = () => {
    setLoading(true)
    window.location.href = "http://localhost:3000/api/v1/auth/google/dashboard"
  }

  const handleSubmitButton = () => {
    console.log("submitted");
  }

  return <div className="w-full h-screen relative flex flex-col items-center">
    <div className="w-full h-full flex flex-row justify-center items-center">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center h-full ">
        <div className="w-full flex flex-col font-light px-6 gap-4 justify-center items-center ">
          <form onSubmit={handleSubmitButton} className="w-full flex flex-col justify-center items-center gap-4 max-w-md">
            <div className="w-full justify-center items-center text-xl md:text-2xl flex flex-col">
              <Image src={mainLogo} alt="logo" height={500} width={500} style={{ height: "70px", width: "50px" }} />
            </div>
            <div className="w-full justify-center font-martelsans-bold items-center text-xl md:text-2xl flex flex-col">
              Welcome To AUCESS! 👋
            </div>
            <div className="w-full flex flex-col gap-6">
              <div>
                <Label className="text-[16px] md:text-xl flex items-center gap-2">
                  <User className="md:h-5 md:w-5 h-4 w-4" />Username
                </Label>
                <Input
                  type="text"
                  placeholder="Username"
                  className="w-full max-w-lg border border-neutral-400 dark:border-neutral-600"
                  onChange={handleUsername}
                  value={username}
                  required
                />
              </div>
              <div>
                <Label className="text-[16px] md:text-xl flex items-center gap-2">
                  <Mail className="md:h-5 md:w-5 h-4 w-4" />Email
                </Label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full max-w-lg border border-neutral-400 dark:border-neutral-600"
                  onChange={handleEmail}
                  value={email}
                  required
                />
              </div>
              <div>
                <Label className="text-[16px] md:text-xl flex items-center gap-2">
                  <KeyRoundIcon className="md:h-5 md:w-5 h-4 w-4" />Password
                </Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full max-w-lg border border-neutral-400 dark:border-neutral-600"
                  onChange={handlePassword}
                  value={password}
                  required
                  minLength={6}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <div className="w-full items-center justify-between">
                <Button type="submit" className="px-4 py-2 w-full text-black hover:bg-azure-radiance-100 bg-azure-radiance-200 font-martelsans-bold">
                  Sign Up
                </Button>
              </div>
              <div className="text-sm w-full flex justify-center items-center">
                Already have an account? <Link href={'/signin'} prefetch={false} className="underline">Sign In</Link>
              </div>
            </div>
            <div className="flex flex-col w-full gap-4">
              <div className="flex flex-col gap-4">
                <Separator orientation="horizontal" className="bg-neutral-600" />
                <Button
                  type="button"
                  className="w-full items-center gap-2 bg-azure-radiance-200 text-black hover:bg-azure-radiance-100 font-martelsans-bold"
                  onClick={handleGoogleSignUp}
                >
                  <ChromeIcon className="md:w-5 md:h-5 h-4 w-4" />Sign up with Google
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:w-1/2 lg:flex flex-col justify-center items-center h-full bg-azure-radiance-50 dark:bg-azure-radiance-300">
        <Image src={signinImage} height={1000} width={1000} alt="signin" style={{ height: "600px", width: "600px" }} />
      </div>
      <div className="hidden w-1/2 md:flex lg:hidden flex-col justify-center items-center h-full bg-azure-radiance-50 dark:bg-azure-radiance-300">
        <Image src={signinImage} height={1000} width={1000} alt="signin" style={{ height: "400px", width: "400px" }} />
      </div>
    </div>
  </div>
}

export default SignUpComponet;