import { AuthenticatedContextProvider } from "./providers/AuthenticatedContextProvider";

function App() {
  return (
    <AuthenticatedContextProvider>
      <div className="text-lg">hello</div>
    </AuthenticatedContextProvider>
  );
}

export default App;
