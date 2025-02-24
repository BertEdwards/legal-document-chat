import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Loader2, Upload, FileText, Bot } from "lucide-react";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              DocAI
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.username}
              </span>
              <Button
                variant="ghost"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Welcome to Your Document AI Assistant
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your documents, get AI-powered insights, and edit with
            intelligent suggestions. Transform your workflow today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="p-6 rounded-lg border bg-card">
            <Upload className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Upload Documents</h3>
            <p className="text-muted-foreground mb-4">
              Support for PDF and Word documents. Easy drag and drop interface.
            </p>
            <Button onClick={() => setLocation("/workspace")} className="w-full">
              Start Working
            </Button>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <Bot className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
            <p className="text-muted-foreground mb-4">
              Get instant insights and suggestions from our advanced AI.
            </p>
            <Button
              onClick={() => setLocation("/workspace")}
              variant="secondary"
              className="w-full"
            >
              Try AI Features
            </Button>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <FileText className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Smart Editing</h3>
            <p className="text-muted-foreground mb-4">
              Edit documents with AI assistance and professional tools.
            </p>
            <Button
              onClick={() => setLocation("/workspace")}
              variant="secondary"
              className="w-full"
            >
              Open Editor
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}