import React, { useEffect, useState } from "react";
import { useGetRecordsQuery } from "../api/apiSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import type { Record } from "../../types";

const RecordsList: React.FC = () => {
  const [page, setPage] = useState(0);
  const limit = 5;

  const {
    data: records,
    error,
    isLoading,
    isFetching,
  } = useGetRecordsQuery({ page, limit });

  const [allRecords, setAllRecords] = useState<Record[]>([]);

  useEffect(() => {
    if (records) {
      setAllRecords((prev) => [...prev, ...records]);
    }
  }, [records]);

  const fetchMoreData = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading && page === 1) return <div>Загрузка записей...</div>;
  if (error) return <div>Ошибка при загрузке записей</div>;

  return (
    <div>
      <h2>Записи</h2>
      <InfiniteScroll
        dataLength={allRecords.length}
        next={fetchMoreData}
        hasMore={(records && records.length === limit) || false}
        loader={<h4>Загрузка...</h4>}
        endMessage={<p>Больше нет данных для отображения</p>}
      >
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {allRecords?.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.firstName}</td>
                <td>{record.lastName}</td>
                <td>{record.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
      {isFetching && page > 1 && <div>Загрузка...</div>}
    </div>
  );
};

export default RecordsList;
