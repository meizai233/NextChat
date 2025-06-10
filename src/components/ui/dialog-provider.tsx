"use client";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
  ComponentType,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// 定义对话框的配置类型
export interface DialogOptions<T = any> {
  title: string;
  component: ComponentType<T>;
  props?: T;
  className?: string;
}

// 定义上下文类型
interface DialogContextType {
  showDialog: <T>(options: DialogOptions<T>) => Promise<any>;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    options: DialogOptions | null;
    resolve?: (value: any) => void;
  }>({
    isOpen: false,
    options: null,
  });

  const showDialog = useCallback(<T extends {}>(options: DialogOptions<T>) => {
    return new Promise((resolve) => {
      setDialogState({
        isOpen: true,
        options,
        resolve,
      });
    });
  }, []);

  const handleClose = useCallback(
    (result?: any) => {
      dialogState.resolve?.(result);
      setDialogState({ isOpen: false, options: null });
    },
    [dialogState],
  );

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      {dialogState.options && (
        <Dialog open={dialogState.isOpen} onOpenChange={() => handleClose()}>
          <DialogContent className={dialogState.options.className}>
            <DialogHeader>
              <DialogTitle>{dialogState.options.title}</DialogTitle>
            </DialogHeader>
            {dialogState.options.component && (
              <dialogState.options.component
                {...dialogState.options.props}
                onClose={handleClose}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </DialogContext.Provider>
  );
}

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context.showDialog;
};
