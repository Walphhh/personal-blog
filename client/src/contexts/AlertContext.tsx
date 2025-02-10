import {
  useEffect,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { toaster } from "@/components/ui/toaster";

type AlertStatus = "success" | "error";
type AlertMessage =
  | "Blog Deleted"
  | "Blog Created"
  | "Admin Logged In"
  | "Admin Logged Out";

// Shape of the Context
// Basically everything that you can access within the provider
type AlertContextType = {
  status: AlertStatus;
  message: AlertMessage;
  showAlert: boolean;
  setAlert: (
    showing: boolean,
    status: AlertStatus,
    message: AlertMessage
  ) => void;
};

// Needs a default declaration to run even if it'll be overridden later
const AlertContext = createContext<AlertContextType>({
  status: "success",
  message: "Blog Created",
  showAlert: false,
  setAlert: () => {},
});

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  // Default Declaration for values
  const [alertState, setAlertState] = useState({
    showAlert: false,
    status: "success" as AlertStatus,
    message: "Blog Created" as AlertMessage,
  });

  // Method inside the provider to set the states
  const setAlert = (
    show: boolean,
    newStatus: AlertStatus,
    newMessage: AlertMessage
  ) => {
    setAlertState({ showAlert: show, status: newStatus, message: newMessage });
  };

  // Shows and closes an Alert for when a blog is created/deleted
  const toastDuration = 3000;
  const showToast = () => {
    toaster.create({
      title: alertState.message,
      type: "success",
      duration: toastDuration,
    });
    console.log(alertState.status, alertState.message);
  };

  useEffect(() => {
    if (alertState.showAlert) {
      showToast();
      setAlertState((prev) => ({ ...prev, showAlert: false }));
    }
  });

  return (
    <AlertContext.Provider
      value={{
        showAlert: alertState.showAlert,
        status: alertState.status,
        message: alertState.message,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
