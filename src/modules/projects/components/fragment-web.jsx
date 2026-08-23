"use client";

import React, { useEffect, useState } from "react";
import { Clock, Code, ExternalLink, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";

// E2B shuts a sandbox down 5 minutes after it is created
// (`defaultSandboxTimeoutMs` in the e2b SDK). Past that the preview URL stops
// resolving, and a cross-origin iframe cannot tell us it failed to load — so we
// go by the fragment's age instead of rendering a silently blank frame.
const SANDBOX_LIFETIME_MS = 5 * 60 * 1000;

const FragmentWeb = ({ data, onViewCode }) => {
  const [fragmentKey, setFragmentKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  // Legacy fragments stored an http:// URL, which the browser blocks as mixed
  // content when the app itself is served over https.
  const previewUrl = data.sandboxUrl?.replace(/^http:\/\//, "https://");

  useEffect(() => {
    const createdAt = new Date(data.createdAt).getTime();

    if (Number.isNaN(createdAt)) return;

    const remaining = createdAt + SANDBOX_LIFETIME_MS - Date.now();

    // A zero delay still fires on a later tick, which keeps this out of the
    // effect body itself (no cascading render on mount).
    const timer = setTimeout(() => setIsExpired(true), Math.max(remaining, 0));

    return () => clearTimeout(timer);
  }, [data.createdAt]);

  const onRefresh = () => {
    setFragmentKey((prev) => prev + 1);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(previewUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const onOpen = () => {
    if (!previewUrl) return;

    window.open(previewUrl, "_blank"); // "_blank" :- Open in NEW tab (not current tab)
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
        <Hint text={"Refresh"} side={"bottom"} align={"start"}>
          <Button size={"sm"} variant={"outline"} onClick={onRefresh}>
            <RefreshCcw />
          </Button>
        </Hint>

        <Hint
          text={copied ? "Copied" : "Click to Copy"}
          side="bottom"
          align="start"
        >
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={onCopy}
            disabled={!previewUrl || copied}
            className={"flex-1 justify-start text-start font-normal"}
          >
            <span className="truncate">{previewUrl}</span>
          </Button>
        </Hint>

        <Hint text={"Open in New Tab"} side="bottom" align="start">
          <Button size={"sm"} variant={"outline"} onClick={onOpen}>
            <ExternalLink />
          </Button>
        </Hint>
      </div>

      {isExpired ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-y-4 p-6 text-center">
          <Clock className="size-8 text-muted-foreground" />

          <div className="space-y-1">
            <p className="text-sm font-medium">This preview has expired</p>
            <p className="text-sm text-muted-foreground max-w-sm">
              Sandboxes shut down about 5 minutes after an app is generated. The
              generated code is still available.
            </p>
          </div>

          <div className="flex items-center gap-x-2">
            {onViewCode && (
              <Button size={"sm"} variant={"outline"} onClick={onViewCode}>
                <Code className="size-4" />
                View code
              </Button>
            )}

            <Button size={"sm"} variant={"outline"} onClick={onOpen}>
              <ExternalLink className="size-4" />
              Try anyway
            </Button>
          </div>
        </div>
      ) : (
        <iframe
          key={fragmentKey}
          className="h-full w-full"
          sandbox="allow-scripts allow-same-origin "
          loading="lazy"
          src={previewUrl}
        />
      )}
    </div>
  );
};

export default FragmentWeb;
