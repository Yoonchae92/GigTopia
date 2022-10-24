import withRoot from "../withRoot";
import styles from "../css/FindWorker.module.css";
import Typography from "../components/Typography";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import WorkerList from "../components/WorkerList";

function FindWorker({ token, userInfo }) {
  const [workers, setWorkers] = useState([]);

  const getWorkers = async () => {
    const res = await axios.get("http://localhost:4000/workers");
    setWorkers(res.data.data);
  };

  useEffect(() => {
    getWorkers();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.orderlist}>
        <div className={styles.header}>
          <div className={styles.text}>Workers List of Pending State</div>
        </div>
        <div className={styles.container}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {workers.map((worker, idx) => {
              const { worker_id, nickname } = worker;
              return (
                <Grid item xs={2} sm={4} md={3} key={idx}>
                  <WorkerList
                    worker={worker}
                    worker_id={worker_id}
                    nickname={nickname}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default withRoot(FindWorker);
