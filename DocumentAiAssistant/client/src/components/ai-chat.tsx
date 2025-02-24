import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface AIChatProps {
  documentContent: string;
  onApplyEdit: (newContent: string) => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChat({ documentContent, onApplyEdit }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { toast } = useToast();

  const editMutation = useMutation({
    mutationFn: async (instruction: string) => {
      const res = await apiRequest("POST", "/api/edit", {
        text: documentContent,
        instruction,
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.text) {
        onApplyEdit(data.text);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Changes applied successfully! The document has been updated." },
        ]);
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await apiRequest("POST", "/api/analyze", {
        text: documentContent,
        query: message
      });
      return res.json();
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    // Extract edit instruction if it starts with an edit command
    const editCommands = ["edit:", "change:", "modify:", "update:", "rewrite:"];
    const isEditCommand = editCommands.some(cmd => userMessage.toLowerCase().startsWith(cmd));

    if (isEditCommand) {
      // Get the command used (e.g., "edit:")
      const usedCommand = editCommands.find(cmd => userMessage.toLowerCase().startsWith(cmd))!;
      // Remove the command prefix and trim whitespace
      const instruction = userMessage.substring(usedCommand.length).trim();
      editMutation.mutate(instruction);
    } else {
      chatMutation.mutate(userMessage);
    }
  };

  return (
    <Card className="h-full flex flex-col border-0 rounded-none">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
        <p className="text-sm text-muted-foreground">
          Ask questions about your document or start with "edit:", "change:", or "modify:" to make changes.
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <pre className="whitespace-pre-wrap font-sans">
                  {message.content}
                </pre>
              </div>
            </div>
          ))}
          {(editMutation.isPending || chatMutation.isPending) && (
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask questions or type 'edit:' to make changes..."
          disabled={editMutation.isPending || chatMutation.isPending}
        />
        <Button
          type="submit"
          disabled={editMutation.isPending || chatMutation.isPending}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
}