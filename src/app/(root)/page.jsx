import React from 'react'
import Image from 'next/image'
import ProjectsForm from '@/modules/home/components/project-form'

const Page = () => {
  return (
    <div className="min-h-screen flex items-start justify-center px-4"> 
      
      <div className="max-w-5xl w-full flex flex-col items-center text-center gap-5"> 

        <Image
          src={"/logo.svg"}
          width={80} 
          height={80} 
          alt='Logo'
          className='invert dark:invert-0' 
        />

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight"> 
          Build Something with heart
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-xl"> 
          Create apps and websites by chatting with AI
        </p>

        <div className="w-full max-w-3xl"> 
          <ProjectsForm/>
        </div>

      </div>
    </div>
  )
}

export default Page