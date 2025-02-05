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

export const SettingsModal = () => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
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
            My settings
          </h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>
              Appearance
            </Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customise how IlmMind looks on your device
            </span>
          </div>
          <ModeToggle/>
        </div>
      </DialogContent>
    </Dialog>
  )
}