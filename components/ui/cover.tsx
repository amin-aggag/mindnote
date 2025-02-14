"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({
  url,
  preview
}: CoverImageProps) => {
  const params = useParams();

  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const deleteCoverImageFile = useMutation(api.documents.deleteCoverImageFile);
  const coverImage = useCoverImage();
  
  const onRemove = async () => {
    if (url) {
      await deleteCoverImageFile({
        documentId: params.documentId as Id<"documents">
      });
    }
    removeCoverImage({
      id: params.documentId as Id<"documents">
    });
  };
  
  return (
    <div className={cn(
      "relative w-full h-[35vh] group",
      !url && "h-[12vh]",
      url && "bg-muted"
    )}>
      {!!url && (
        // I used the Image component from next/image but it kept resulting
        // in internal server 500 errors when the image sizes were bigger,
        // I don't know how many megabytes the error would start at,
        // but for a 9mb file, it resulted in this error. Very irritating.
        // - Amin on 12/2/25
        <img
          src={url}
          alt="Cover"
          className="object-cover relative w-full h-[35vh] group"
        />
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2"/>
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2"/>
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}

Cover.Skeleton = function CoverSkeleton() {
  return (
    <Skeleton className="w-full h-[12vh]"/>
  )
}