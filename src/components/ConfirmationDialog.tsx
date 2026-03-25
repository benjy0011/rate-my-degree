'use client'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog"
import { cn } from "@/lib/utils";
import { Description } from "@radix-ui/react-dialog";
import { CircleAlert, Trash2 } from "lucide-react";
import ShadowWrapper from "./ShadowWrapper";
import { ReactElement, useState } from "react";

type ConfirmationDialogType = "DELETE" | "CONFIRM"

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onAction?: () => Promise<void> | void;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  text?: string;
  type?: ConfirmationDialogType;
  actionButtonText?: string;
}


const DIALOG_COLOR: Record<
  ConfirmationDialogType, 
  { bgColor: string, iconColor: string, btnColor: string }
> = {
  CONFIRM: {
    bgColor: "bg-blue-100",
    iconColor: "text-blue-700",
    btnColor: "",
  },
  DELETE: {
    bgColor: "bg-red-100",
    iconColor: "text-red-700",
    btnColor: "bg-red-700 text-white",
  },
}

const DialogIcon = ({ type } : { type?: ConfirmationDialogType }): ReactElement => {
  const Icon = 
    type === "DELETE"
    ? Trash2
    : CircleAlert

  return <Icon size={30} />
}


const ConfirmationDialog = ({
  open,
  onClose,
  onAction,
  onOpenChange,
  title = "CONFIRM",
  text = "Dialog Text",
  type = "CONFIRM",
  actionButtonText,
} : ConfirmationDialogProps) => {

  const [ loading, setLoading ] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "shadow-div-effect-lg",
          "rounded-none",
          "lg:max-w-[30%] p-10"
        )}
        onInteractOutside={() => onClose?.()}
      >
        <Description className="hidden"></Description>

        <div className="flex flex-col justify-center items-center gap-5">
          <div className={cn(
            "rounded-full border-2 border-gray-500 w-fit p-3 border-dashed",
            DIALOG_COLOR[type].bgColor,
            DIALOG_COLOR[type].iconColor
          )}>
            <DialogIcon type={type} />
          </div>

          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>

          <DialogDescription className="text-center text-gray-600">{text}</DialogDescription>

          <div className="flex gap-6 mt-4">
            <ShadowWrapper
              className="text-black bg-white"
              onClick={() => onClose?.()}
            >
              Cancel
            </ShadowWrapper>

            <ShadowWrapper
              className={DIALOG_COLOR[type].btnColor}
              loading={loading}
              onClick={async () => {
                setLoading(true);
                await onAction?.();
                setLoading(false);
                onClose?.();
              }}
            >
              {actionButtonText ?? type}
            </ShadowWrapper>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default ConfirmationDialog