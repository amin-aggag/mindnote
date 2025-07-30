// without this "use client", there will be a SWR import error, alhamdulillah for this thread for the solution https://github.com/vercel/swr/issues/2694
"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();
  const createPage = useMutation(api.documents.createPage);

  const onCreatePage = () => {
    const promise = createPage({ title: "Untitled page" });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note."
    });
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s MindNote
      </h2>
      <Button onClick={onCreatePage}>
        <PlusCircleIcon className="h-4 w-4 mr-2"/>
        Create a note
      </Button>
    </div>
  );
}

export default DocumentsPage;