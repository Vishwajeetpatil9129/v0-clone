"use client";

import React from "react";
import { useGetProjects } from "@/modules/projects/hooks/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FolderKanban, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProjectList = () => {
    const { data: projects, isPending } = useGetProjects();
  const formatDate = (data) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric", 
    });
  };

  if (isPending) {
    return (
      <div className="w-full mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Your Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Your Projects</h2>
    </div>
  );
};

export default ProjectList;
