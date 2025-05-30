import React from "react";
import RecordsList from "./features/records/RecordsList";
// import AddRecordForm from "./features/records/AddRecordForm";
import { Button } from "antd";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Управление Записями</h1>
      <Button type="primary">Добавить запись</Button>
      {/* <AddRecordForm /> */}
      <RecordsList />
    </div>
  );
};

export default App;
