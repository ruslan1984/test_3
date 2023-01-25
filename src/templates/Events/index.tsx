import React, { FC, memo } from "react";
import { useParams, Link } from "react-router-dom";
import EventList from "@/components/EventList";
import { Empty, Alert } from "antd";
import styles from "./styles.module.css";

const Events: FC = () => {
  const { year, month, date } = useParams();
  const formatDate = new Date(Number(year), Number(month), Number(date));
  return (
    <div className={styles.container}>
      <Link className={styles.link} to="/">
        Перейти в календарь
      </Link>
      {year && month && date ? (
        <div className={styles.eventList}>
          <Alert
            message={`События на ${formatDate.toLocaleDateString("ru-RU")}`}
          />
          <EventList
            year={Number(year)}
            month={Number(month)}
            date={Number(date)}
          />
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};
export default memo(Events);
