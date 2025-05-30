import React from "react";
import RecordsList from "./features/records/RecordsList";
import AddRecordForm from "./features/records/AddRecordForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Управление Записями</h1>
      <AddRecordForm />
      <RecordsList />
    </div>
  );
};

export default App;
