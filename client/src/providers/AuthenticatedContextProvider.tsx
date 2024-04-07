import { ReactNode } from "react";
import {
  AuthenticatedContext,
  useAuthenticatedContextSetup,
} from "../hooks/useAuthenticatedContext";

export const AuthenticatedContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const authenticatedContext = useAuthenticatedContextSetup();
  if (authenticatedContext == null) {
    return <h1>loading...</h1>;
  }
  return (
    <AuthenticatedContext.Provider value={authenticatedContext}>
      {children}
    </AuthenticatedContext.Provider>
  );
};
