"use client";

import {
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useSettings } from "@/hooks/use-settings";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useAddSource } from "@/hooks/use-add-source";
import { FormEvent, useRef, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

type Source = {
  sourceName: string,
  fileUrl: string | null,
  storageId: Id<"_storage">
}

export const AddSourceModal = () => {
  const addSource = useAddSource();

  const params = useParams();
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const update = useMutation(api.documents.update);
  // const document = useQuery(api.documents.getById, {
  //   documentId: params.documentId as Id<"documents">
  // });
  const convex = useConvex();

  // const [file, setFile] = useState<File>();
  const [selectedPDF, setSelectedPDF] = useState<File | null>(null);

  const imageInput = useRef<HTMLInputElement>(null);

  async function handleAddSource(event: FormEvent) {
    event.preventDefault();

    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": selectedPDF!.type },
      body: selectedPDF,
    });
    const { storageId } = await result.json();
    // Step 3: Save the newly allocated storage id to the database
    const sourcesList = [{storageId: storageId, sourceName: selectedPDF ? selectedPDF.name : ""}];
    const stringifiedSourcesList = JSON.stringify(sourcesList);
    const source = convex.mutation(api.sources.addSource, {storageId: storageId, sourceName: stringifiedSourcesList});

    setSelectedPDF(null);
    if (imageInput.current !== null) {
      imageInput.current!.value = "";
    }
  }

  return (
    <Dialog open={addSource.isOpen} onOpenChange={addSource.onClose}>
      {/* The DialogTitle is here to fix this error:
        `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog.
        I wrapped it in VisuallyHidden element just so, in case it would interfere
        with any other divs, it doesn't because it's hidden. This error is FINALLY fixed.
        - Amin on 6/2/25
      */}
      <VisuallyHidden>
        <DialogTitle></DialogTitle>
      </VisuallyHidden>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">
            Add a source
          </h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <span className="text-[0.8rem] text-muted-foreground">
              Upload a PDF to be used a source of knowledge in IlmMind
            </span>
          </div>
            <form onSubmit={handleAddSource}>
            <input
              type="file"
              accept=".pdf"
              // ref={imageInput}
              onChange={(event) => setSelectedPDF(event.target.files![0])}
              disabled={selectedPDF !== null}
            />
            <button
              type="submit"
              value="Send PDF"
              disabled={selectedPDF === null}
            >
              Send image
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}