"use client"

import React, { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { MessageRole } from "@prisma/client";
import {
  useGetMessages,
  prefetchMessages,
} from "@/modules/messages/hooks/message";
import MessageCard from "./message-card";
import MessageForm from "./message-form";
import MessageLoading from "./message-loader";

const MessageContainer = ({ projectId, activeFragment, setActiveFragment }) => {
  const queryClient = useQueryClient();
  const bottomRef = useRef(null);
  const lastAssistantMessageIdRef = useRef(null);

  // Fetch messages
  const {
    data: messages = [],
    isPending,
    isError,
    error,
  } = useGetMessages(projectId);

  // Prefetch on mount
  useEffect(() => {
    if (projectId) {
      prefetchMessages(queryClient, projectId);
    }
  }, [projectId, queryClient]);

  // Auto-activate latest assistant message fragment
  useEffect(() => {
    if (!messages || messages.length === 0) return;
    
    const lastAssistantMessage = messages.findLast(
      (msg) => msg.role === MessageRole.ASSISTANT
    );

    if (
      lastAssistantMessage?.fragments &&
      lastAssistantMessage.id !== lastAssistantMessageIdRef.current
    ) {
      setActiveFragment(lastAssistantMessage.fragments);
      lastAssistantMessageIdRef.current = lastAssistantMessage.id;
    }
  }, [messages, setActiveFragment]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messages && messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages?.length]);

  // LOADING STATE
  if (isPending) {
    return (
      <div className="flex items-center justify-center flex-1 h-full">
        <Spinner className="text-emerald-400" />
      </div>
    );
  }

  // ERROR STATE
  if (isError) {
    return (
      <div className="flex items-center justify-center flex-1 h-full text-red-500 text-center px-4">
        <div>
          <p className="font-semibold">Error loading messages</p>
          <p className="text-sm">{error?.message}</p>
        </div>
      </div>
    );
  }

  // EMPTY STATE
  if (!messages || messages.length === 0) {
    return (
      <div className="flex flex-col flex-1 min-h-0 bg-background">
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <p className="mb-2">No messages yet</p>
            <p className="text-sm">Start a conversation below</p>
          </div>
        </div>
        <div className="flex-shrink-0 border-t p-3">
          <MessageForm projectId={projectId} />
        </div>
      </div>
    );
  }

  // MESSAGES STATE
  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage?.role === MessageRole.USER;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-background">
      {/* Messages Scroll Area */}
      <div className="flex-1 min-h-0 overflow-y-auto px-2">
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            content={message.content}
            role={message.role}
            fragment={message.fragments}
            createdAt={message.createdAt}
            isActiveFragment={activeFragment?.id === message.fragments?.id}
            onFragmentClick={() => setActiveFragment(message.fragments)}
            type={message.type}
          />
        ))}
        
        {/* Loading indicator while AI is thinking */}
        {isLastMessageUser && <MessageLoading />}
        
        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* Message Form */}
      <div className="flex-shrink-0 border-t p-3 bg-background">
        <MessageForm projectId={projectId} />
      </div>
    </div>
  );
};

export default MessageContainer;