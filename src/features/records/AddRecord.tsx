import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import {
  useAddFieldMutation,
  useAddRecordMutation,
  useGetFieldsQuery,
  useNewGetFieldsQuery,
} from "../api/apiSlice";
import type { Record } from "../../types";
import { v4 as uuidv4 } from "uuid";

enum modalSettingsT {
  AddField = "Добавить запись",
  AddEntry = "Добавить поле",
}

const AddRecord: React.FC = () => {
  const { data: fields = [] } = useGetFieldsQuery();
  const { data: newFields = [] } = useNewGetFieldsQuery();
  const [addRecord] = useAddRecordMutation();
  const [newField] = useAddFieldMutation();
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSettings, setModalSettings] = useState<modalSettingsT>(
    modalSettingsT.AddField
  );
  const [countValueInput, setCountValueInput] = useState<string[]>([]);

  const handleOk = () => {
    setIsModalOpen(false);
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setCountValueInput([]);
  };

  const onFinish = (values: Partial<Record>) => {
    addRecord(values);
    form.resetFields();
    setCountValueInput([]);
    console.log("Значения формы:", values);
  };

  const openAddEntry = () => {
    setIsModalOpen(true);
    setModalSettings(modalSettingsT.AddField);
  };

  const openAddingField = () => {
    setIsModalOpen(true);
    setModalSettings(modalSettingsT.AddEntry);
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    const filteredValues = Object.values(allValues).filter(
      (value) => value !== undefined && value !== ""
    );
    setCountValueInput(filteredValues);
  };

  return (
    <>
      <Button type="primary" onClick={openAddEntry}>
        Добавить запись
      </Button>
      <Button
        style={{ marginLeft: 20 }}
        type="primary"
        onClick={openAddingField}
      >
        Добавить поле
      </Button>
      <Modal
        title="Добавление записи"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Отмена
          </Button>,
          <Button
            type="primary"
            onClick={handleOk}
            htmlType="submit"
            key="submit"
            disabled={
              modalSettings === modalSettingsT.AddField
                ? countValueInput.length < 5
                : countValueInput.length < 2
            }
          >
            Добавить
          </Button>,
        ]}
      >
        <Form
          name="Record"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          form={form}
          onValuesChange={handleValuesChange}
        >
          {modalSettings === modalSettingsT.AddField
            ? fields?.map(({ name, key }) => (
                <Form.Item name={key} key={uuidv4()} label={name}>
                  <Input />
                </Form.Item>
              ))
            : newFields?.map(({ name, key }) => (
                <Form.Item
                  name={key}
                  key={uuidv4()}
                  label={name}
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, введите хотя бы 1 символ!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              ))}
        </Form>
      </Modal>
    </>
  );
};

export default AddRecord;
