"use client";

import {
  BlockNoteEditor,
  PartialBlock
} from "@blocknote/core";

import {
  useBlockNote,
  useCreateBlockNote
} from "@blocknote/react";
import {
  BlockNoteView
} from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { constants } from "node:fs/promises";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface EditorProps {
  documentId: Id<"documents">;
  onContentChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

export const Editor = ({
  documentId,
  onContentChange,
  initialContent,
  editable
}: EditorProps) => { 
  const { resolvedTheme } = useTheme();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  // const fileURL = (documentId: Id<"documents">, storageId: Id<"_storage">) => {
  //   const result = useQuery(api.documents.getFileUrl, {
  //   documentId: documentId,
  //   storageId: `${storageId}` as Id<"_storage">,});
  //   // console.log(result);
  //   // console.log("potato in fileURL");
  //   return result;
  // };

  // const url = useQuery(api.documents.getFileUrl, {
  //   documentId: documentId,
  //   storageId: "kg2cyr78d10kqz7zw4f0trvt3h7ab3nw" as Id<"_storage">,});
  // console.log(`${url}`);
  // console.log(url);
  console.log(documentId);

  async function handleSendFile(file: File) {
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file!.type },
      body: file,
    });
    const { storageId } = await result.json();
    
    const url = useQuery(api.documents.getFileUrl, {
      documentId: documentId,
      storageId: "kg2cyr78d10kqz7zw4f0trvt3h7ab3nw" as Id<"_storage">,});
    console.log(`storageId = ${storageId}`);
    console.log(null);
    console.log(`the returned url is ${url}`);
    return `${url}`;
  }



  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
    ? JSON.parse(initialContent) as PartialBlock[]
    : undefined,
    uploadFile: handleSendFile,
  });

  // const editor: BlockNoteEditor = useMemo(() => {
  //   if (initialContent === undefined) {
  //     return undefined;
  //   }
  //   return BlockNoteEditor.create({ initialContent: JSON.parse(initialContent) });
  // }, [initialContent]);

  return (
      <BlockNoteView 
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        editable={true}
        onChange={() => {onContentChange(JSON.stringify(editor.document, null, 2))}}
      />
  )
}