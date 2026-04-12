"use client";

import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useState, useMemo, useCallback, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { CodeView } from "./code-view";
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { convertFilesToTreeItems } from "@/lib/utils";
import { TreeView } from "./tree-view";
import { Hint } from "@/components/ui/hint";

const FileBreadcrumb = ({ filePath }) => {
  if (!filePath) return null;

  const pathSegments = filePath.split("/");
  const maxSegments = 4;

  const renderBreadCrumbItems = () => {
    if (pathSegments.length <= maxSegments) {
      return pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;

        return (
          <Fragment key={index}>
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage>{segment}</BreadcrumbPage>
              ) : (
                <span className="text-muted-foreground">{segment}</span>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator />}
          </Fragment>
        );
      });
    } else {
      return (
        <>
          <BreadcrumbItem>
            <span className="text-muted-foreground">
              {pathSegments[0]}
            </span>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>...</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {pathSegments[pathSegments.length - 1]}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </>
      );
    }
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>{renderBreadCrumbItems()}</BreadcrumbList>
    </Breadcrumb>
  );
};

function getLanguageFromExtension(filename) {
  const extension = filename.split(".").pop()?.toLowerCase();

  const languageMap = {
    js: "javascript",
    jsx: "jsx",
    ts: "typescript",
    tsx: "tsx",
    py: "python",
    html: "html",
    css: "css",
    json: "json",
    md: "markdown",
  };

  return languageMap[extension] || "text";
}

export const FileExplorer = ({ files }) => {
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState(() => {
    const fileKeys = Object.keys(files || {});
    return fileKeys.length > 0 ? fileKeys[0] : null;
  });

  // Handle both file formats
  const normalizedFiles = useMemo(() => {
    if (!files) return {};

    return Object.entries(files).reduce((acc, [key, value]) => {
      acc[key] =
        typeof value === "string" ? value : value?.content || "";
      return acc;
    }, {});
  }, [files]);

  const treeData = useMemo(() => {
    return convertFilesToTreeItems(normalizedFiles);
  }, [normalizedFiles]);

  const handleFileSelect = useCallback(
    (filePath) => {
      if (normalizedFiles[filePath]) {
        setSelectedFile(filePath);
      }
    },
    [normalizedFiles]
  );

  const handleCopy = useCallback(() => {
    if (selectedFile && normalizedFiles[selectedFile]) {
      navigator.clipboard
        .writeText(normalizedFiles[selectedFile])
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((error) => {
          console.error("Failed to copy:", error);
        });
    }
  }, [selectedFile, normalizedFiles]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full w-full"
      style={{ display: "flex" }}
    >
      {/* LEFT PANEL: FILE TREE */}
      <ResizablePanel
        defaultSize={30}
        minSize={20}
        maxSize={50}
        className="flex flex-col overflow-hidden"
      >
        <div className="h-full w-full overflow-auto flex-1">
          <TreeView
            data={treeData}
            value={selectedFile}
            onSelect={handleFileSelect}
          />
        </div>
      </ResizablePanel>

      {/* DIVIDER - Make it visible */}
      <ResizableHandle 
        className="w-1 hover:bg-primary/50 transition-colors bg-border"
        withHandle
      />

      {/* RIGHT PANEL: CODE VIEW */}
      <ResizablePanel
        defaultSize={70}
        minSize={50}
        maxSize={80}
        className="flex flex-col overflow-hidden"
      >
        {selectedFile && normalizedFiles[selectedFile] ? (
          <>
            {/* HEADER: BREADCRUMB + COPY BUTTON */}
            <div className="flex-shrink-0 border-b bg-sidebar/50 px-4 py-3 flex justify-between items-center gap-x-2">
              <FileBreadcrumb filePath={selectedFile} />
              <Hint label="Copy to clipboard" side="bottom" sideOffset={4}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-background/80 flex-shrink-0"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <CopyCheckIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                </Button>
              </Hint>
            </div>

            {/* CODE VIEW */}
            <div className="flex-1 overflow-auto w-full">
              <CodeView
                code={normalizedFiles[selectedFile]}
                lang={getLanguageFromExtension(selectedFile)}
              />
            </div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <p className="text-sm">Select a file to view its content</p>
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};