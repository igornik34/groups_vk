import { useDispatch, useSelector } from "react-redux";
import { IGetGroupsResponse } from "../../interfaces/groupsResponse";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AppDispatch, RootState } from "../../store/store";
import { groupsActions } from "../../store/groups.slice";
import { useEffect } from "react";
import ListGroups from "../../components/ListGroups/ListGroups";
import Loader from "../../components/UI/Loader/Loader";
import styles from "./Home.module.css";

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const errorRequest = useSelector((s: RootState) => s.groups.error);
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
      {!isLoading && !errorRequest && <ListGroups />}
      {errorRequest && (
        <>
          <div className={styles.errorImage}>
            <img src="/errorImage.png" alt="error image" />
          </div>
          <p className={styles.errorMessage}>{errorRequest}</p>
        </>
      )}
    </div>
  );
}

export default Home;
