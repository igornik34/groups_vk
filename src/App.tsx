import { SearchForm } from "./components/SearchForm/SearchForm";
import { SearchResults } from "./components/SearchResults/SearchResults";
import UsersContextProvider from "./store/UsersContextProvider";

export default function App() {
  return (
    <UsersContextProvider>
      <SearchForm />
      <SearchResults />
    </UsersContextProvider>
  );
}
