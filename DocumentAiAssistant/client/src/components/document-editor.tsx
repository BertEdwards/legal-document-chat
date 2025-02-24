import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface DocumentEditorProps {
  content: string;
  onChange: (content: string) => void;
  isLoading?: boolean;
}

export default function DocumentEditor({
  content,
  onChange,
  isLoading = false,
}: DocumentEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    parseOptions: {
      preserveWhitespace: 'full',
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, true, {
        preserveWhitespace: 'full',
      });
    }
  }, [content, editor]);

  if (isLoading) {
    return (
      <div className="h-full p-4 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    );
  }

  return (
    <Card className="h-full overflow-y-auto border-0 rounded-none p-4">
      <EditorContent editor={editor} className="min-h-full" />
    </Card>
  );
}