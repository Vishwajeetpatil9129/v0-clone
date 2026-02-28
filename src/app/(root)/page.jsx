 import React from 'react'
 import Image from 'next/image'
import ProjectsForm from '@/modules/home/components/project-form'

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-5xl w-full flex flex-col items-center text-center space-y-6">
        <section className='space-y-8 flex flex-col items-center'>
          <div className='flex flex-col items-center'>
            <Image
            src={"/logo.svg"}
            width={100}
            height={100}
            alt='Logo'
            className='hidden md:block invert dark:invert-0'
          />
          </div>
        </section>
        <h1 className="text-3xl md:text-6xl font-bold tracking-tight">Build Something with heart</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Create apps and websites by chatting with AI
          </p>
          <div className="w-full max-w-4xl mt-8">
            <ProjectsForm/>
          </div>
      </div>
    </div>
  )
}

export default Page