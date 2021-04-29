import { Button, Card, PageHeader, Switch } from "antd";
import React, { useEffect, useState } from "react";
import DynamicVirtualList from "../../components/common/dynamicVirtualList";

const HeightChanger = ({ record }) => {
  let [height, setHeight] = useState(70);
  return (
    <Card
      hoverable
      bodyStyle={{
        height: height,
      }}
      cover={
        <img
          style={{
            height: 300,
            width: "100%",
            objectFit: "cover",
          }}
          src="https://source.unsplash.com/random"
        />
      }
    >
      {record}

      <Button onClick={() => setHeight((prev) => prev + 10)}>More</Button>
    </Card>
  );
};

export default function Dashboard() {
  const [grid, setGrid] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  let pageNumber = 1;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setTimeout(() => {
      setLoadingMore(() => false);
      setInitialLoading(false);
      setDataSource((state) => [...state, ...new Array(10).fill(pageNumber)]);
    }, 5000);
  };

  const handleLoadMore = () => {
    setLoadingMore(() => true);
    pageNumber = pageNumber + 1;
    getData();
  };
  return (
    <div>
      <Switch checked={grid} onChange={(t) => setGrid(t)}>
        Gird
      </Switch>

      <PageHeader title="Dashboard"></PageHeader>
      <DynamicVirtualList
        dataSource={dataSource}
        RowCard={HeightChanger}
        GridCard={HeightChanger}
        // fixedCardWidth={100}
        isGrid={grid}
        loadMore={handleLoadMore}
        hasMore={true}
        initialLoading={initialLoading}
        loadingMore={loadingMore}
        // overscanCount={5}
        // fixedHeight={600}
      />
    </div>
  );
}
