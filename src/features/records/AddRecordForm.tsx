import React, { useState } from "react";
import { useGetFieldsQuery, useAddRecordMutation } from "../api/apiSlice";
import type { Record } from "../../types";

const AddRecordForm: React.FC = () => {
  const { data: fields, isLoading: fieldsLoading } = useGetFieldsQuery();
  const [addRecord, { isLoading: adding }] = useAddRecordMutation();

  const [formState, setFormState] = useState<Partial<Record>>({});

  const handleChange = (field: string, value: string | number) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addRecord(formState).unwrap();
      alert("Запись успешно добавлена");
      setFormState({});
    } catch (err) {
      console.error("Ошибка при добавлении записи: ", err);
    }
  };

  if (fieldsLoading) return <div>Загрузка полей формы...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавить новую запись</h2>
      {fields &&
        fields.slice(0, 15).map((field) => (
          <div key={field.id}>
            <label htmlFor={field.name}>{field.name}</label>
            {field.type === "string" ? (
              <input
                id={field.name}
                type="text"
                value={(formState[field.name] || "") as string}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required
              />
            ) : (
              <input
                id={field.name}
                type="number"
                value={(formState[field.name] || "") as number}
                onChange={(e) =>
                  handleChange(field.name, Number(e.target.value))
                }
                required
              />
            )}
          </div>
        ))}
      <button type="submit" disabled={adding}>
        {adding ? "Добавление..." : "Добавить"}
      </button>
    </form>
  );
};

export default AddRecordForm;
