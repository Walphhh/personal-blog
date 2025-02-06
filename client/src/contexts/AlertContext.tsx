import { Alert, AlertContent } from "@chakra-ui/react";
import React, { ReactNode, createContext, useContext, useState } from "react";

type AlertContextType = {
  status: "success" | "error";
  message: "Blog Deleted" | "Blog Created";
  showAlert: boolean;
  setAlert: (
    showing: boolean,
    status: AlertContextType["status"],
    message: AlertContextType["message"]
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
  const [showAlert, setShowAlert] = useState(false);
  const [status, setStatus] = useState<AlertContextType["status"]>("success");
  const [message, setMessage] =
    useState<AlertContextType["message"]>("Blog Created");

  // Method inside the  provider to set the states
  const setAlert = (
    show: boolean,
    newStatus: AlertContextType["status"],
    newMessage: AlertContextType["message"]
  ) => {
    setShowAlert(show);
    setStatus(newStatus);
    setMessage(newMessage);
  };

  return (
    <AlertContext.Provider value={{ showAlert, status, message, setAlert }}>
      {showAlert && (
        <Alert.Root status={status}>
          <Alert.Indicator />
          <Alert.Title>{message}</Alert.Title>
        </Alert.Root>
      )}
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
