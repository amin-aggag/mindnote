"use client";

import { useEffect, useState } from "react";

import { File } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Command
} from "@/components/ui/command";

import { useSearch } from "@/hooks/use-search";
import { api } from "@/convex/_generated/api";
import { DialogTitle } from "./ui/dialog";

export const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.documents.getSearch);
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    }

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  // this prevents a hydration error, which relates to ShadcnUI command component using the dialog component
  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <VisuallyHidden>
        <DialogTitle></DialogTitle>
      </VisuallyHidden>
      <CommandInput
        placeholder={`Search ${user?.fullName}'s MindNote...`}
        />
      <CommandList>
        <CommandEmpty>No results found</CommandEmpty>
        <CommandGroup heading="documents">
          {documents?.map((document) => (
            <CommandItem
            key={document._id}
            // was value={`${document._id}-${document.title}`} before
              value={`${document._id}`}
              title={document.title}
              onSelect={onSelect}
            >
              {document.icon ? (<p className="mr-2 text-[18px]">{document.icon}</p>) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>
              {document.title}
            </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}