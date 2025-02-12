"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useCoverImage } from "@/hooks/use-cover-image";
import {
  Dropzone,
  DropZoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneFileMessage,
  DropzoneTrigger,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneRetryFile,
  InfiniteProgress,
  useDropzone,
} from "@/components/ui/dropzone";
import { useDropzone as reactUseDropZone } from "react-dropzone";
import { CloudUploadIcon, Trash2Icon } from "lucide-react";
import { FormEvent, use, useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { get } from "http";


export const CoverImageModal = () => {
  const params = useParams();
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const update = useMutation(api.documents.update);
  // const document = useQuery(api.documents.getById, {
  //   documentId: params.documentId as Id<"documents">
  // });

  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const deleteCoverImageFile = useMutation(api.documents.deleteCoverImageFile);

  // const [file, setFile] = useState<File>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState();
  const coverImage = useCoverImage();

  const imageInput = useRef<HTMLInputElement>(null);


  // let document;
  // if (params.documentId !== undefined) {
  //   document = useQuery(api.documents.getById, {
  //     documentId: params.documentId as Id<"documents">
  //   });
  // }

  // let documentCoverPageChanged = false;

  // useEffect(() => {
  //   if (documentCoverPageChanged == true && document !== null && document?.coverImage !== undefined) {
  //     deleteCoverImageFile({
  //       documentId: params.documentId as Id<"documents">
  //     });
  //     removeCoverImage({
  //       id: params.documentId as Id<"documents">
  //     });
  //   }
  // }, [documentCoverPageChanged]);

  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        status: "success",
        result: URL.createObjectURL(file),
      };
    },
    validation: {
      accept: {
        "image/*": [".png", ".jpg", ".jpeg"],
      },
      maxSize: 1 * 1024 * 1024,
      maxFiles: 1,
    },
  });

  async function handleSendImage(event: FormEvent) {
    event.preventDefault();

    // If there already is a cover image, delete
    // that image and remove its storageId (as it
    // doesn't exist anymore) from the document
    if (coverImage.url) {
      deleteCoverImageFile({
        documentId: params.documentId as Id<"documents">
      });
      removeCoverImage({
        id: params.documentId as Id<"documents">
      });
    }

    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": selectedImage!.type },
      body: selectedImage,
    });
    const { storageId } = await result.json();
    // Step 3: Save the newly allocated storage id to the database
    await update({ id: params.documentId as Id<"documents">, coverImage: `${storageId}` });

    setSelectedImage(null);
    if (imageInput.current !== null) {
      imageInput.current!.value = "";
    }
  }

  const onDrop = useCallback((acceptedFiles: any) => {

  }, []);

  const { getRootProps, acceptedFiles, getInputProps, isDragActive } = reactUseDropZone({ onDrop });

  const selectedFile = acceptedFiles[0];
  console.log(selectedFile);

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <VisuallyHidden>
        <DialogTitle></DialogTitle>
      </VisuallyHidden>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">
            Cover Image
          </h2>
        </DialogHeader>
        <form onSubmit={handleSendImage}>
          {/* <Dropzone {...dropzone}>
            <div>
              <DropZoneArea>
                <DropzoneTrigger className="flex flex-col items-center gap-4 bg-transparent p-10 text-center text-sm w-[100%]">
                  <CloudUploadIcon className="size-8" />
                  <div>
                    <p className="font-semibold">Upload a cover image</p>
                    <p className="text-sm text-muted-foreground">
                      Click here or drag and drop to upload
                    </p>
                  </div>
                </DropzoneTrigger>
              </DropZoneArea>
            </div>
          </Dropzone> */}
          <div className="drop-zone" {...getRootProps}>
            <input {...getRootProps}/>
            {isDragActive ? (
              <div className="drop-files">
                <CloudUploadIcon className="size-8" />
              </div>
            ) : <div>Click here or drag and drop to upload</div>
            }
          </div>
        <input
        type="file"
        accept="image/*"
        // ref={imageInput}
        onChange={(event) => setSelectedImage(event.target.files![0])}
        disabled={selectedImage !== null}
        />
        <button
          type="submit"
          value="Send Image"
          disabled={selectedImage === null}
        >
          Send image
        </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}