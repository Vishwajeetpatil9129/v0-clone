"use server";

import { MessageRole, MessageType } from "@prisma/client";
import db from "@/lib/db";
import { inngest } from "@/inngest/client";
import { getCurrentUser } from "@/modules/auth/actions";
import { consumeCredits } from "@/lib/usage";

export const createMessages = async (value, projectId) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("Unauthorized");

  const project = await db.project.findUnique({
    where: {
      id: projectId,
      userId: user.id,
    },
  });

  if (!project) throw new Error("Project not found");

  try {
    await consumeCredits();
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Insufficient credits or rate limited";
    
    throw new Error(errorMessage);
  }

  const newMessage = await db.message.create({
    data: {
      projectId: projectId,
      content: value,
      role: MessageRole.USER,
      type: MessageType.RESULT,
    },
  });

  await inngest.send({
    name: "code-agent/run",
    data: {
      value: value,
      projectId: projectId,
    },
  });

  return newMessage;
};

export const getMessages = async (projectId) => {
  try {
    console.log("getMessages called with projectId:", projectId);

    const user = await getCurrentUser();
    console.log("Current user:", user?.id);

    if (!user) {
      console.error("No user found");
      throw new Error("Unauthorized");
    }

    const project = await db.project.findUnique({
      where: {
        id: projectId,
        userId: user.id,
      },
    });

    console.log("Project found:", project?.id);

    if (!project) {
      console.error("Project not found:", projectId);
      throw new Error("Project not found or unauthorized");
    }

    const messages = await db.message.findMany({
      where: {
        projectId: projectId,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        fragments: true,
      },
    });

    console.log("Messages fetched:", messages.length, "messages");

    return messages;
  } catch (error) {
    console.error("getMessages FATAL ERROR:", error);
    throw error;
  }
};