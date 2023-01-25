import React, { FC, useEffect, memo } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Select,
  TimePicker,
  Input,
  Modal,
  Space,
} from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { timeToString } from "@/helpers";
import { TCalendarEvent } from "@/templates/Calendar/types";
import { eventTypeOptions, notyOptions } from "./options";

interface IEditModal {
  isModalOpen: boolean;
  currentData?: TCalendarEvent;
  handleOk: () => void;
  handleCancel: () => void;
  handleUpdare: (values: TCalendarEvent) => void;
}

const EditModal: FC<IEditModal> = ({
  isModalOpen,
  currentData,
  handleOk,
  handleCancel,
  handleUpdare,
}: IEditModal) => {
  const { TextArea } = Input;

  const [form] = Form.useForm();

  useEffect(() => {
    if (!currentData) {
      return form.resetFields();
    }
    const from = timeToString(currentData.time.from);
    const to = timeToString(currentData.time.to);

    form.setFieldsValue({
      id: currentData.id,
      content: currentData.content,
      time: [dayjs(from, "HH:mm"), dayjs(to, "HH:mm")],
      eventType: currentData.eventType,
      notifyBefore: currentData.notifyBefore,
    });
  }, [currentData, isModalOpen]);

  const onFinish = (values: TCalendarEvent & { time: Dayjs[] }) => {
    const time = {
      from: { hour: values.time[0].hour(), minute: values.time[0].minute() },
      to: { hour: values.time[1].hour(), minute: values.time[1].minute() },
    };
    const newValues = { ...values, time };
    handleUpdare(newValues);
  };

  return (
    <Modal
      title="Мероприятие"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      forceRender
      footer={[]}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item hidden name="id">
          <Input />
        </Form.Item>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="time"
              label="Время"
              rules={[{ required: true, message: "Поле обязательное!" }]}
            >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="eventType"
              label="Тип"
              rules={[{ required: true, message: "Поле обязательное!" }]}
            >
              <Select options={eventTypeOptions} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="notifyBefore"
              label="Уведомить за"
              rules={[{ required: true, message: "Поле обязательное!" }]}
            >
              <Select options={notyOptions} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="content"
              label="Описание"
              rules={[{ required: true, message: "Поле обязательное!" }]}
            >
              <TextArea style={{ width: "100%" }} placeholder="Описание" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Space>
            <Form.Item key="1">
              <Button key="back" onClick={handleCancel}>
                Закрыть
              </Button>
            </Form.Item>
            <Form.Item key="2">
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Form.Item>
          </Space>
        </Row>
      </Form>
    </Modal>
  );
};

export default memo(EditModal);
