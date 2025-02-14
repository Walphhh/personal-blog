import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogActionTrigger,
} from "@/components/ui/dialog";
import { Button, DialogRoot, DialogTrigger } from "@chakra-ui/react";

const Confirmation_Info = {
  delete: {
    message: "Are you sure you want to delete this blog post?",
    action: "Delete",
  },
  add: {
    message: "Create new blog post?",
    action: "Create",
  },
  edit: {
    message: "Save changes to this blog post?",
    action: "Edit",
  },
} as const;

type ConfirmationType = keyof typeof Confirmation_Info;

interface props {
  type: ConfirmationType;
  buttonStyle: "green" | "red" | "gray";
  onConfirm: () => void;
}

const ConfirmationDialog = ({ type, buttonStyle, onConfirm }: props) => {
  const info = Confirmation_Info[type];

  return (
    <DialogRoot>
      <DialogTrigger>
        <Button colorPalette={buttonStyle}>{info.action}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>{info.message}</p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button colorPalette={buttonStyle} onClick={onConfirm}>
            {info.action}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default ConfirmationDialog;
