// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

//Importing relevant dependencies
import { Suspense } from "react";
import MainPage from "./pages/MainPage";
import stores from "./store/stores";
import AlertModal from "./statics/AlertModal";
import WalletConfirmation from "./statics/WalletConfirmation";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

// Suspense beforen mounting UI
const renderLoader = () => <p></p>;

// JSX Component APP
const App = () => {
  const queryClient = new QueryClient();

  // HTML Building block -- JSX
  return (
    <Suspense fallback={renderLoader()}>
      <ReduxProvider store={stores}>
        <QueryClientProvider client={queryClient}>
          <Router>
              <MainPage />
              <WalletConfirmation />
              <AlertModal />
          </Router>
        </QueryClientProvider>
      </ReduxProvider>
    </Suspense>
  );
};

export default App;
