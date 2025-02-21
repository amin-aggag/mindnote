"use client";

import {
  BlockNoteEditor,
  PartialBlock
} from "@blocknote/core";

import {
  useCreateBlockNote
} from "@blocknote/react";
import {
  BlockNoteView
} from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useActionState, useEffect, useMemo, useState } from "react";
import { constants } from "node:fs/promises";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface EditorProps {
  documentId: Id<"documents">;
  onContentChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

// export const getFileUrl = async (storageId: Id<"_storage">) => {
//   let url;
//   url = await useQuery(api.documents.getFileUrl, {
//     storageId: "kg2f310mx7z1z0ckkpjc52rs8n7ac8w3" as Id<"_storage">}) as string;
//     console.log(`url from getFileUrl = ${url}`);
//     return url;
// }

// This handleSendFile function doesn't even upload the file, the console.log for the postUrl doesn't even work
// I'm thinking this is because of the convex function being defined inside the function it's used, but is it really because of that?
// Although, the documentation done it that way so maybe it is because of that.
// I have been trying for 3 days now to make this upload-image functionality in BlockNote work but I still haven't been successful. If this is
// why being a software engineer is hard, I can REALLY feel it now. You're following the documentation as best as you can and it STILL doesn't
// work, not matter what you try, no matter how you rearrange the functions, basically no matter what you try, although that's basically a summary
// of everything I've tried because it's all API functions (meaning library functions), so there's not much I can do other than call them at different
// times or try to console.log them to see their response, but the console logs aren't even running in the first place, so I have a hunch that the
// useQuery just isn't running inside the handleSendFile function that is INSIDE the editor component. But why??? Why isn't it running?
// The useQuery is working just fine outside of that function, so why can't it work inside that function? Do I really have to know exactly how useQuery
// works just to fix this issue? Like that would take wayyyy too much time, and isn't the whole point of using a library is so that you can just follow
// the documentation and have it work without wasting too much time having to making it work yourself? It's really annoying how this is not working.
// I don't know if this is Convex's or BlockNote's fault, but it's really irritating and frustrating.
// export const handleSendFile = async function(file: File) {
//   const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
//   // Step 1: Get a short-lived upload URL
//   const postUrl = await generateUploadUrl();
//   console.log(`the postUrl is ${postUrl}`);
//   // Step 2: POST the file to the URL
//   const result = await fetch(postUrl, {
//     method: "POST",
//     headers: { "Content-Type": file!.type },
//     body: file,
//   });
//   const { storageId } = await result.json();
//   useQuery(api.documents.getFileUrl, "skip");
//   console.log("The useQuery actually ran!!");
//   return getFileUrl(storageId);
//   // console.log(`storageId = ${storageId}`);
//   // if (useQuery(api.documents.getFileUrl, {
//   //   storageId: storageId as Id<"_storage">,}) == null || useQuery(api.documents.getFileUrl, {
//   //     storageId: storageId as Id<"_storage">,}) == undefined) {
//   //     console.log("THIS WAS NULL THE WHOLE TIME!!!");
//   // } else {
//   //   console.log("OK, IT WASN'T NULL, I STILL DON'T KNOW WHAT THE PROBLEM IS.");
//   // }
//   // await getFileUrl(storageId) && console.log("getFileUrl returned something");

//   // return "https://courteous-marten-397.convex.cloud/api/storage/d2049b05-befb-4335-8756-4028d9285be2";
//   // console.log(`storagkeId = ${storageId}`);
//   // console.log(null);
//   // console.log(`the returned url is ${url}`);
//   // return `${url}`;
// }

export const Editor = ({
  documentId,
  onContentChange,
  initialContent,
  editable
}: EditorProps) => { 
  const { resolvedTheme } = useTheme();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [stateStorageId, setStateStorageId] = useState();
  const convex = useConvex();

  // const getUrl = useQuery(api.documents.getFileUrl, {
  //   storageId: stateStorageId as Id<"_storage">
  // }) as string;

  // useEffect(() => {
  //   setUrl(getUrl);
  // }, [getUrl]);

  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const getFileUrl2 = useQuery(api.documents.getFileUrl, "skip");
  // const fileURL = (documentId: Id<"documents">, storageId: Id<"_storage">) => {
  //   const result = useQuery(api.documents.getFileUrl, {
  //   documentId: documentId,
  //   storageId: `${storageId}` as Id<"_storage">,});
  //   // console.log(result);
  //   // console.log("potato in fileURL");
  //   return result;
  // };

  console.log(useQuery(api.documents.getFileUrl, {
    // documentId: documentId,
    storageId: "kg2693aw5s73sw6js7vzq5vpm17adgzk" as Id<"_storage">,}));
  console.log(useQuery(api.documents.getFileUrl, {
    // documentId: documentId,
    storageId: "kg2cyr78d10kqz7zw4f0trvt3h7ab3nw" as Id<"_storage">,}));
  // console.log(`${url}`);
  // console.log(url);
  // console.log(documentId);

  const getFileUrl = (storageId: Id<"_storage">) => {
      let url;
      console.log(`url from getFileUrl = ${url}`);
      url = useQuery(api.documents.getFileUrl, {
        storageId: "kg2f310mx7z1z0ckkpjc52rs8n7ac8w3" as Id<"_storage">
      });
      console.log(`url from getFileUrl = ${url}`);
      return url as string;
    }

  const handleSendFile = async function(file: File) {
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    console.log(`the postUrl is ${postUrl}`);
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file!.type },
      body: file,
    });
    const { storageId } = await result.json();
    // setStateStorageId(storageId);
    const fileUrl = await convex.query(api.documents.getFileUrl, { storageId });
    console.log("File URL:", fileUrl);
    return fileUrl as string;
    // console.log(`storageId = ${storageId}`);
    // if (useQuery(api.documents.getFileUrl, {
    //   storageId: storageId as Id<"_storage">,}) == null || useQuery(api.documents.getFileUrl, {
    //     storageId: storageId as Id<"_storage">,}) == undefined) {
    //     console.log("THIS WAS NULL THE WHOLE TIME!!!");
    // } else {
    //   console.log("OK, IT WASN'T NULL, I STILL DON'T KNOW WHAT THE PROBLEM IS.");
    // }
    // await getFileUrl(storageId) && console.log("getFileUrl returned something");

    // return "https://courteous-marten-397.convex.cloud/api/storage/d2049b05-befb-4335-8756-4028d9285be2";
    // console.log(`storagkeId = ${storageId}`);
    // console.log(null);
    // console.log(`the returned url is ${url}`);
    // return `${url}`;
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