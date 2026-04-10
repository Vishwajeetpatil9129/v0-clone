"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import ProjectHeader from "./project-header";
// import MessageContainer from "./message-container";
// import { Code, CrownIcon, EyeIcon } from "lucide-react";
// import FragmentWeb from "./fragment-web";
// import { FileExplorer } from "./file-explorer";


const ProjectView = ({projectId}) => {
  return (
    <div className="h-screen">
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel
      defaultSize={35}
      minSize={20}
      className="flex flex-col min-h-0"
    >
      <ProjectHeader projectId={projectId}/>
      {/* TODO MESSAGE CONTAINER */}
    </ResizablePanel>
  </ResizablePanelGroup>
</div>
  )
}

export default ProjectView;