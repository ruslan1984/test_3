import React, { FC, useState, useCallback } from "react";
import { Button, List, Divider, Badge } from "antd";
import type { BadgeProps } from "antd";
import { TCalendarEvent } from "@/templates/Calendar/types";
import { timeToString } from "@/helpers";
import EditModal from "../EditModal";

interface IPresenter {
  eventsList?: TCalendarEvent[];
  isModalOpen: boolean;
  removeEvent: (index: number) => () => void;
  updateEvent: (values: TCalendarEvent, activeIndex?: number) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const Presenter: FC<IPresenter> = ({
  eventsList,
  isModalOpen,
  removeEvent,
  updateEvent,
  setIsModalOpen,
}) => {
  const [currentData, setCurrentData] = useState<TCalendarEvent | undefined>();
  const [activeIndex, setActiveIndex] = useState<number>();

  const handleOk = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const showModal = useCallback(
    (activeId: number) => () => {
      setActiveIndex(activeId);
      if (activeId > 0 && eventsList) {
        const activeEventList = eventsList.find(({ id }) => id === activeId);
        setCurrentData(activeEventList);
      } else {
        setCurrentData(undefined);
      }
      setIsModalOpen(true);
    },
    [eventsList]
  );

  const handleUpdare = (values: TCalendarEvent) => {
    updateEvent(values, activeIndex);
  };

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={eventsList}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <a key="list-loadmore-edit" onClick={showModal(item.id)}>
                редактировать
              </a>,
              <a onClick={removeEvent(item.id)} key="list-loadmore-more">
                удалить
              </a>,
            ]}
          >
            <List.Item.Meta
              title={`${timeToString(item.time.from)} - ${timeToString(
                item.time.to
              )}`}
              description={
                <Badge
                  status={item.eventType as BadgeProps["status"]}
                  text={item.content}
                />
              }
            />
          </List.Item>
        )}
      />
      <Divider />
      <Button
        style={{ marginBottom: "20px" }}
        type="primary"
        onClick={showModal(-1)}
      >
        Добавить мероприятие
      </Button>
      <EditModal
        isModalOpen={isModalOpen}
        currentData={currentData}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleUpdare={handleUpdare}
      />
    </>
  );
};

export default Presenter;
