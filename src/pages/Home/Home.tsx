import { useDispatch } from "react-redux";
import { IGetGroupsResponse } from "../../interfaces/groupsResponse";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { AppDispatch } from "../../store/store";
import { groupsActions } from "../../store/groups.slice";
import { useEffect } from "react";
import ListGroups from "../../components/ListGroups/ListGroups";
import Loader from "../../components/UI/Loader/Loader";
import styles from "./Home.module.css"

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const { data } = await axios.get<IGetGroupsResponse>(
          "/mockGroups.json"
        );
        if (data.result === 0 || !data.data) {
          throw new Error("Ошибка при отправке запроса");
        }
        dispatch(groupsActions.addAllGroups(data.data));
        return data;
      } catch (error) {
        throw error;
      }
    },
  });

  useEffect(() => {
    if (error) {
      dispatch(groupsActions.setError(error.message));
    }
  }, [error, dispatch]);

  return (
    <div className={styles.home}>
      {isLoading && <Loader />}
      <ListGroups />
    </div>
  );
}

export default Home;
