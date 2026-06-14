"use client";

import React from "react";
import { useGetProjects, useDeleteProject } from "@/modules/projects/hooks/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FolderKanban, Calendar, ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProjectList = () => {
    const { data: projects, isPending } = useGetProjects();
    const { mutateAsync: deleteProject } = useDeleteProject();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric", 
    });
  };

  const handleDelete = async (event, projectId) => {
    event.preventDefault();
    event.stopPropagation();

    const confirmed = window.confirm("Delete this project? This cannot be undone.");
    if (!confirmed) return;

    await deleteProject(projectId);
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
        <div className="hidden lg:grid grid-cols-3 gap-4 max-w-6xl mx-auto">
        {projects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <Card
              key={project.id}
              className="group relative overflow-hidden hover:shadow-md transition-all duration-200 border border-border hover:border-primary/40 cursor-pointer bg-card"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <FolderKanban className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={(event) => handleDelete(event, project.id)}
                      aria-label="Delete project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
                <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {project.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 mr-2" />
                  <span>{formatDate(project.createdAt)}</span>
                </div>
              </CardContent>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </Card>
          </Link>
        ))}
      </div>

      <div className="lg:hidden max-w-4xl mx-auto px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {projects.map((project) => (
              <Link href={`/projects/${project.id}`} key={project.id}>
                <CarouselItem key={project.id} className="pl-4 md:basis-1/2">
                  <Card className="group relative overflow-hidden hover:shadow-md transition-all duration-200 border border-border hover:border-primary/40 cursor-pointer bg-card">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <FolderKanban className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            onClick={(event) => handleDelete(event, project.id)}
                            aria-label="Delete project"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                      <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {project.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5 mr-2" />
                        <span>{formatDate(project.createdAt)}</span>
                      </div>
                    </CardContent>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  </Card>
                </CarouselItem>
              </Link>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-border bg-background hover:bg-accent text-muted-foreground hover:text-foreground" />
          <CarouselNext className="border-border bg-background hover:bg-accent text-muted-foreground hover:text-foreground" />
        </Carousel>
      </div>
    </div>
  );
};

export default ProjectList;