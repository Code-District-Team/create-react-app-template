import { Button, Card, PageHeader, Switch } from "antd";
import React, { useState } from "react";
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
  const [number, setNumber] = useState(100);
  const [grid, setGrid] = useState(true);
  return (
    <div>
      <Switch checked={grid} onChange={(t) => setGrid(t)}>
        Gird
      </Switch>

      <PageHeader title="Dashboard"></PageHeader>
      <DynamicVirtualList
        dataSource={new Array(number).fill((() => Math.random() * 10000)()).map((item, i) => i)}
        RowCard={HeightChanger}
        GridCard={HeightChanger}
        // fixedCardWidth={100}
        isGrid={grid}
        loadMore={() => {
          setNumber((prev) => (prev <= 200 ? prev + 10 : prev));
        }}
        hasMore={true}
        initialLoading={false}
        loadingMore={false}
        overscanCount={5}
        // fixedHeight={600}
      />
    </div>
  );
}
