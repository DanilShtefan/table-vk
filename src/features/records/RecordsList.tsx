import React, { useEffect, useState } from "react";
import { useGetFieldsQuery, useGetRecordsQuery } from "../api/apiSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import type { Field, Record } from "../../types";
import { Table } from "antd";

const RecordsList: React.FC = () => {
  const [page, setPage] = useState(0);
  const limit = 10;

  const {
    data: records,
    error,
    isLoading,
    isFetching,
  } = useGetRecordsQuery({ page, limit });

  const [allRecords, setAllRecords] = useState<Record[]>([]);

  const { data: columns } = useGetFieldsQuery();

  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Age",
  //     dataIndex: "age",
  //     key: "age",
  //   },
  //   {
  //     title: "Address",
  //     dataIndex: "address",
  //     key: "address",
  //   },
  // ];

  const getAntdRecords = (records: Record[] | undefined) => {
    return records?.map((field) => ({ ...field, key: field.id }));
  };

  const getAntdColumns = (columns: Field[] | undefined) => {
    return columns?.map(({ id, name, key }) => ({
      title: name,
      key: id,
      dataIndex: key,
    }));
  };

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
        <Table
          dataSource={getAntdRecords(allRecords)}
          columns={getAntdColumns(columns)}
          pagination={false}
        ></Table>
        {/* <table>
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
        </table> */}
      </InfiniteScroll>
      {isFetching && page > 1 && <div>Загрузка...</div>}
    </div>
  );
};

export default RecordsList;
