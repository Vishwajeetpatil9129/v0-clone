"use client";

import React from 'react'
import ProjectList from '@/modules/home/components/project-list'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ProjectsPage = () => {
  return (
    <div className="min-h-screen flex items-start justify-center px-4">
      <div className="max-w-6xl w-full flex flex-col items-center">
        <div className="w-full flex justify-end mb-2">
          <Button asChild size="sm">
            <Link href="/">
              <Plus className="w-4 h-4 mr-1.5" />
              New Project
            </Link>
          </Button>
        </div>
        <ProjectList />
      </div>
    </div>
  )
}

export default ProjectsPage
