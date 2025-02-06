import { Alert } from "@chakra-ui/react";
import {
  useEffect,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

type AlertStatus = "success" | "error";
type AlertMessage = "Blog Deleted" | "Blog Created";

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
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertState((prev) => ({ ...prev, showAlert: false }));
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [alertState.showAlert]);

  return (
    <AlertContext.Provider
      value={{
        showAlert: alertState.showAlert,
        status: alertState.status,
        message: alertState.message,
        setAlert,
      }}
    >
      {alertState.showAlert && (
        <Alert.Root status={alertState.status}>
          <Alert.Indicator />
          <Alert.Title>{alertState.message}</Alert.Title>
        </Alert.Root>
      )}
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
