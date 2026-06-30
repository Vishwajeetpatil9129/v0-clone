import React from 'react'
import Image from 'next/image'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import ProjectsForm from '@/modules/home/components/project-form'
import LandingPage from '@/modules/home/components/landing-page'

const Page = () => {
  return (
    <>

      <SignedOut>
        <LandingPage />
      </SignedOut>

      {/* Authenticated users see the existing dashboard */}
      <SignedIn>
        <div className="h-[calc(100vh-5rem)] flex items-center justify-center px-4">
          <div className="max-w-5xl w-full flex flex-col items-center text-center gap-5"> 
            <Image
              src={"/logo.svg"}
              width={80} 
              height={80} 
              alt='Logo'
              className='invert dark:invert-0' 
            />
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight"> 
              Build Something with Knowledge.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl"> 
              Create apps and websites by chatting with AI.
            </p>
            <div className="w-full max-w-3xl"> 
              <ProjectsForm/>
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  )
}

export default Page