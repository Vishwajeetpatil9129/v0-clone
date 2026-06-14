"use client";
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import TextAreaAutosize from "react-textarea-autosize";
import { ArrowUpIcon , Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { useState } from "react";
import z from "zod";
import { Spinner } from "@/components/ui/spinner";
import { useCreateProject } from '@/modules/projects/hooks/project';

import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Form , FormField } from "@/components/ui/form";

const formSchema = z.object({
  content: z
    .string()
    .min(1, "Project description is required")
    .max(1000, "Description is too long"),
});

const PROJECT_TEMPLATES = [
  {
    emoji: "🌐",
    title: "Build a landing page",
    prompt:
      "Build a modern SaaS landing page with a hero section (headline, subheadline, CTA button), a features section with 3 icon cards, a testimonials row, and a footer. Use a clean gradient background, smooth scroll, and dark mode.",
  },
  {
    emoji: "🧮",
    title: "Build a glassmorphism calculator",
    prompt:
      "Build a fully functional calculator with a glass-effect UI — frosted background, soft blur, rounded buttons with hover glow effects. Support basic arithmetic, keyboard input, and a clear/backspace button. Use a dark gradient background behind the glass panel.",
  },
  {
    emoji: "✅",
    title: "Build a todo list",
    prompt:
      "Build a clean todo list app with the ability to add, complete, and delete tasks. Include filter tabs (All, Active, Completed), a task counter, and smooth fade animations on add/remove. Use local state and a minimal, modern card-based layout.",
  },
  {
    emoji: "⏱️",
    title: "Build a Pomodoro timer",
    prompt:
      "Build a Pomodoro productivity timer with Work (25 min), Short Break (5 min), and Long Break (15 min) modes. Include a circular countdown ring, start/pause/reset controls, and a session counter. Use a calm color palette with smooth mode transitions.",
  },
  {
    emoji: "🌤️",
    title: "Build a weather card",
    prompt:
      "Build a weather dashboard UI with mock data showing current temperature, weather condition icon, humidity, wind speed, and a 5-day forecast row. Use a glassmorphism card design with a sky gradient background that changes based on the weather condition (sunny, rainy, cloudy).",
  },
  {
    emoji: "💸",
    title: "Build an expense tracker",
    prompt:
      "Build a personal expense tracker where users can add expenses with a name, amount, and category (Food, Travel, Shopping, etc). Show a summary card with total spent, a category breakdown with progress bars, and a scrollable transaction list. Use local state and a clean minimal design.",
  },
  {
    emoji: "🎨",
    title: "Build a color palette generator",
    prompt:
      "Build a color palette generator that shows 5 color swatches. Users can lock individual colors and click Generate to randomize the unlocked ones. Show the hex code on each swatch with a copy-to-clipboard button. Use a clean, minimal layout with smooth color transition animations.",
  },
  {
    emoji: "📝",
    title: "Build a markdown previewer",
    prompt:
      "Build a split-pane markdown editor and live previewer. Left pane is a textarea for writing markdown, right pane renders the formatted output in real time. Include a toolbar with buttons for Bold, Italic, Heading, and Code. Use a dark editor theme with a clean light preview pane.",
  },
];


const ProjectsForm = () => {
    const [isFocused , setIsFocused] = useState(false);
    const router = useRouter();
    const { mutateAsync , isPending } = useCreateProject();

    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            content:"",
        },
        mode:"onChange"
    })

    const handleTemplate = (prompt) => {
        form.setValue("content" , prompt)
    }

    const onSubmit = async(values) => {
        try{
            const res = await mutateAsync(values.content)
            await onInvokeAI(values.content, projectId)
            router.push(`/projects/${res.id}`)
            toast.success("Project created Successfully")
            form.reset()
        }catch(error){
            toast.error(error.message || "Failed to create project");
        }
    };

  const isButtonDisabled = isPending || !form.watch("content").trim()

  return (
    <div className="space-y-6 w-full">
      {/* Template Grid */}
      
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROJECT_TEMPLATES.map((template, index) => (
          <button
            key={index}
            onClick={() => handleTemplate(template.prompt)}
            // disabled={isPending}
            className="group relative p-5 rounded-2xl border bg-card hover:bg-accent/40 transition-all duration-200 text-left hover:shadow-lg hover:border-primary/30"
          >
            <div className="flex flex-col gap-2">
              <span className="text-3xl" role="img" aria-label={template.title}>
                {template.emoji}
              </span>
              <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                {template.title}
              </h3>
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
        ))}
      </div>

        <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or describe your own idea
          </span>
        </div>
      </div>

        <Form {...form}>
            <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
            isFocused && "shadow-lg ring-2 ring-primary/20"
          )}
        >
            <FormField
         control={form.control}
         name="content"
         render={({field})=>(
                <TextAreaAutosize
                {...field}
                // disabled={isPending}
                placeholder="Describe what you want to create..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                minRows={3}
                maxRows={8}
                className={cn(
                  "pt-4 resize-none border-none w-full outline-none bg-transparent",
                //   isPending && "opacity-50"
                )}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)(e);
                  }
                }}
              />
         )}
         />

         <div className="flex gap-x-2 items-end justify-between pt-2">
            <div className="text-[10px] text-muted-foreground font-mono">
                 <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span>&#8984;</span>Enter
              </kbd>
              &nbsp; to submit
            </div>
            <Button className={cn("size-8 rounded-full" , 
              isButtonDisabled && "bg-muted-foreground border"
            )}
            disabled={isButtonDisabled}
            type="submit">
              {
                isPending ? (<Spinner/>) : (<ArrowUpIcon className="size-4"/>)
              }
                {/* <ArrowUpIcon className="size-4"/> */}
            </Button>
         </div>
        </form>
        </Form>
    </div>
  )
}

export default ProjectsForm;