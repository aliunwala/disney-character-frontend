import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import Topbar from "./components/topbar";
import Featured from "./components/featured";
import Footer from "./components/footer";
import theme from "./constants/theme";
import { useEffect, useState } from "react";
import { CharacterProps } from "./definitions/character";
import { filterCharacters, singleCharacter } from "./api/disneyAPI";
import { z } from "zod";

// STYLED LAYOUT COMPONENT
const StyledLayout = styled.div`
  text-align: center;

  main {
    background-color: ${theme.backgroundAlt};
    box-sizing: border-box;
    margin: 0 auto;
    padding: 80px;
    max-width: 1200px;
    min-width: 700px;

    @media (max-width: 960px) {
      padding: 40px;
    }
  }

  h3 {
    font-size: 40px;
    font-weight: normal;
    margin-bottom: 40px;
  }
`;

/*
 * LAYOUT COMPONENT
 *
 * description: Layout component that wraps the application
 * @returns {JSX.Element}
 */

function useDebounce(cb: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState(cb);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(cb);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [cb, delay]);
  return debounceValue;
}

const Layout = () => {
  // STATE USED BY MAIN AND RESULTS PAGES
  const [localSearch, setLocalSearch] = useState("");
  // const { search, charId, setUrlParams } = useUrlAsState();
  // const [debounceVal, setDebounceVal] = useState(search);
  const [characters, setCharacters] = useState<any>([]);
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const debounceSpeed = 750;
  const debounceValueTrigger = useDebounce(localSearch!, debounceSpeed);
  const location = useLocation();
  const isProfilePage = location.pathname.includes("/profile");
  const isUpdateProfilePage = location.pathname.includes("/updateProfile");
  const isHome = location.pathname === "/";

  const pathParams = useParams();
  const [queryParams, setQueryParams] = useSearchParams();
  const search = queryParams.get("search")!;
  const charId = pathParams.id;

  // Get initial character for home page
  useEffect(() => {
    setLocalSearch(search!);
    // console.log("Initally get data for page searchValue:", search);
    let searchString = "";
    if (search) searchString = search;
    filterCharacters(searchString).then((data) => {
      if (data) {
        setCharacters(data?.data);
      }
    });
    setLoading(false);
  }, []);

  // Get data based on current URL search
  useEffect(() => {
    let toSearch = "";
    if (search != null) {
      toSearch = search;
    }
    // console.log("Get char data from URL:", toSearch);
    setLoading(true);
    filterCharacters(toSearch).then((data) => {
      if (data) {
        setCharacters(data?.data);
      }
    });
    setLoading(false);
  }, [search]);

  // Get data based on current URL character ID
  useEffect(() => {
    if (charId) {
      setLoading(true);
      singleCharacter(charId).then((data) => {
        if (data) {
          // console.log("Get char data from charId:", charId);
          setCharacter(data?.data);
        }
      });
      setLoading(false);
    }
  }, [charId]);

  useEffect(() => {
    // console.log("Debounced: ", debounceValueTrigger);
    if (isProfilePage || isUpdateProfilePage || isHome) {
      // Make sure search query params are unset on these pages
      setQueryParams((params) => {
        params.delete("search");
        return params;
      });
    }
    if (!(isProfilePage || isUpdateProfilePage || isHome)) {
      // Do not allow setting search query params on these pages
      setQueryParams((params) => {
        params.set("search", debounceValueTrigger);
        return params;
      });
    }
  }, [debounceValueTrigger]);

  // STATE USED BY BOTH PROFILE AND EDIT_PROFILE PAGES:
  const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    favoriteCharacter: z.string(),
    favoriteRide: z.string(),
    favoriteMovie: z.string(),
    favoritePark: z.string(),
    dob: z.string(),
    city: z.string(),
    state: z.string(),
  });
  type FormFields = z.infer<typeof schema>;
  const defaultValues: FormFields = {
    firstName: "John",
    lastName: "Doe",
    favoriteCharacter: "Elsa",
    favoriteRide: "Space Mountain",
    favoriteMovie: "Moana",
    favoritePark: "Disney World, Florida",
    dob: "1980-01-01",
    city: "San Francisco",
    state: "California",
  };
  const [userState, setUserState] = useState(defaultValues);

  return (
    <StyledLayout>
      <Topbar searchQuery={localSearch} setSearchQuery={setLocalSearch} />
      <main>
        <Outlet
          context={{
            searchQuery: debounceValueTrigger,
            characters,
            setCharacters,
            loading,
            setLoading,
            userState,
            setUserState,
            character,
          }}
        />
      </main>
      <Featured />
      <Footer />
    </StyledLayout>
  );
};

export default Layout;
