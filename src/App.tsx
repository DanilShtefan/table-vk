import React from "react";
import RecordsList from "./features/records/RecordsList";
import AddRecord from "./features/records/AddRecord";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="page-wrapper">
      <h1>Управление Записями</h1>

      <AddRecord />
      <RecordsList />
    </div>
  );
};

export default App;
