import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import DocumentEditor from "@/components/document-editor";
import AIChat from "@/components/ai-chat";
import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Save, Upload } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Document } from "@shared/schema";
import { saveDocument, type DocumentFormat } from "@/lib/document-utils";

export default function WorkspacePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
  const [content, setContent] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filename, setFilename] = useState("document");
  const [format, setFormat] = useState<DocumentFormat>("docx");

  const { data: documents, isLoading: isLoadingDocs } = useQuery<Document[]>({
    queryKey: ["/api/documents"],
  });

  const { data: currentDoc } = useQuery<Document>({
    queryKey: ["/api/documents", selectedDocId],
    enabled: !!selectedDocId,
  });

  const saveMutation = useMutation({
    mutationFn: async (content: string) => {
      if (selectedDocId) {
        return apiRequest("PUT", `/api/documents/${selectedDocId}`, { content });
      } else {
        return apiRequest("POST", "/api/documents", {
          title: filename || "Untitled Document",
          content,
          metadata: {},
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      toast({
        title: "Success",
        description: "Document saved successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSave = async () => {
    try {
      // Save to cloud
      await saveMutation.mutateAsync(content);

      // Download locally
      await saveDocument(content, format, filename);

      setShowSaveDialog(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            DocAI Workspace
          </h1>
          <div className="flex items-center gap-4">
            <FileUpload onUpload={setContent} />
            <Button
              onClick={() => setShowSaveDialog(true)}
              disabled={saveMutation.isPending}
              className="gap-2"
            >
              {saveMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save
            </Button>
          </div>
        </div>
      </header>

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Document</DialogTitle>
            <DialogDescription>
              Choose a name and format for your document.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="filename">Filename</label>
              <Input
                id="filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="Enter filename"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="format">Format</label>
              <Select value={format} onValueChange={(value) => setFormat(value as DocumentFormat)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="docx">Microsoft Word (.docx)</SelectItem>
                  <SelectItem value="pdf">PDF Document (.pdf)</SelectItem>
                  <SelectItem value="txt">Plain Text (.txt)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!filename || saveMutation.isPending}>
              {saveMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={70} minSize={30}>
            <DocumentEditor
              content={content}
              onChange={setContent}
              isLoading={isLoadingDocs}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30} minSize={20}>
            <AIChat
              documentContent={content}
              onApplyEdit={(newContent) => setContent(newContent)}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}