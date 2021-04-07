import { Col, Row } from "antd";
import _ from "lodash";
import memoize from "memoize-one";
import React, { memo, useEffect, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import AutoSizer from "react-virtualized-auto-sizer";
import { areEqual, VariableSizeList as List } from "react-window";
import WindowScroller from "../../utilities/windowScroller/windowScroller";
import LoadingSpinner from "./loadingSpinner";

const GridViewRowRenderer = ({ GridCard, itemsToShow, numberOfCol, cardProps }) => {
  return (
    <Row gutter={16}>
      {itemsToShow.map((item, i) => (
        <Col span={numberOfCol} key={i}>
          <GridCard {...cardProps} record={item} />
        </Col>
      ))}
    </Row>
  );
};

const cardWidth = 300;

const getNumberOfProductsToShow = (width) => Math.floor(width / cardWidth) || 1;

const HeightDetector = ({ index, children, onHeightChange }) => {
  const { height, ref } = useResizeDetector();
  useEffect(() => {
    if (height) {
      onHeightChange(height, index);
    }
  }, [height]);
  return <div ref={ref}>{children}</div>;
};
const RowRenderer = memo(({ index, style, data }) => {
  let {
    dataSource,
    hasMore,
    loadingMore,
    initialLoading,
    onHeightChange,
    cardProps,
    loadMore,
    width,
    isGrid,
    GridCard,
    RowCard,
  } = data;
  let numberOfRows = dataSource.length;
  let record = dataSource[index];
  let numberOfCol;
  let itemsToShow;
  let numberOfProductsToShow = 1;

  if (isGrid) {
    numberOfProductsToShow = getNumberOfProductsToShow(width);
    numberOfCol = Math.floor(24 / numberOfProductsToShow);
    itemsToShow = _.take(_.drop(dataSource, index * numberOfProductsToShow), numberOfProductsToShow);
    numberOfRows = Math.ceil(dataSource.length / getNumberOfProductsToShow(width));
  }
  if (index == numberOfRows - 1 && hasMore && !loadingMore && !initialLoading) {
    loadMore();
  }

  return (
    <div style={style}>
      <HeightDetector
        onHeightChange={(height, index) => {
          onHeightChange(height, index, numberOfProductsToShow);
        }}
        index={index}
      >
        {isGrid ? (
          <GridViewRowRenderer
            GridCard={GridCard}
            itemsToShow={itemsToShow}
            numberOfCol={numberOfCol}
            cardProps={cardProps}
          />
        ) : (
          <RowCard {...cardProps} record={record} />
        )}
      </HeightDetector>
    </div>
  );
}, areEqual);
const createItemData = memoize(
  (
    dataSource,
    hasMore,
    loadingMore,
    initialLoading,
    onHeightChange,
    RowCard,
    cardProps,
    loadMore,
    isGrid,
    GridCard
  ) => ({
    dataSource,
    hasMore,
    loadingMore,
    initialLoading,
    onHeightChange,
    RowCard,
    cardProps,
    loadMore,
    isGrid,
    GridCard,
  })
);

/**
 *
 * @param {function} loadMore function called last row is rendered
 * @param {boolean} loadingMore boolean which tells new data loading
 * @param {boolean} hasMore boolean for new data
 * @param {boolean} initialLoading boolean for initial loading
 * @param {Array} dataSource array of data
 * @param {number} fixedHeight height for container. If not provided uses windows scroller
 * @param {*} cardProps props to be passes to list item
 * @param {*} RowCard react component to be rendered against list item
 * @returns
 */
const DynamicVirtualList = ({
  loadMore = () => {},
  loadingMore = false,
  hasMore = false,
  initialLoading = false,
  dataSource = [],
  overscanCount = 20,
  fixedHeight,
  cardProps,
  RowCard,
  GridCard,
  isGrid,
}) => {
  const [rowHeights, setRowHeights] = useState({});
  const getItemSize = (index) => rowHeights[index] || 80;
  let listRef = useRef();
  const onHeightChange = (height, index, columnNumber) => {
    let newHeight = Math.floor(height) + 20;
    if (newHeight && index == 0 && _.isEmpty(rowHeights)) {
      setRowHeights(
        new Array(Math.ceil(dataSource.length / columnNumber)).fill(0).reduce((prev, curr, index) => {
          prev[index] = newHeight;
          return prev;
        }, {})
      );
      listRef.current.resetAfterIndex(0);
    }
    if (newHeight && newHeight !== rowHeights[index]) {
      setRowHeights((state) => ({
        ...state,
        [index]: newHeight,
      }));
      listRef.current.resetAfterIndex(index);
    }
  };

  const itemData = createItemData(
    dataSource,
    hasMore,
    loadingMore,
    initialLoading,
    onHeightChange,
    RowCard,
    cardProps,
    loadMore,
    isGrid,
    GridCard
  );
  useEffect(() => {
    if (!_.isEmpty(rowHeights)) {
      let newHeights = new Array(
        Math.ceil(
          isGrid ? dataSource.length / getNumberOfProductsToShow(parentRef.current.offsetWidth) : dataSource.length
        )
      )
        .fill(0)
        .reduce((prev, curr, index) => {
          prev[index] = rowHeights[0];
          return prev;
        }, {});
      setRowHeights((prev) => ({
        ...newHeights,
        ...prev,
      }));
      listRef.current.resetAfterIndex(0);
    }
  }, [dataSource]);

  const parentRef = useRef();

  useEffect(() => {
    setRowHeights({});
    listRef.current && listRef.current.resetAfterIndex(0);
  }, [isGrid]);

  return initialLoading ? (
    <LoadingSpinner />
  ) : (
    <div ref={parentRef}>
      {fixedHeight ? (
        <div
          style={{
            height: fixedHeight,
          }}
        >
          <AutoSizer>
            {({ width, height }) => (
              <List
                ref={listRef}
                itemCount={isGrid ? Math.ceil(dataSource.length / getNumberOfProductsToShow(width)) : dataSource.length}
                itemSize={getItemSize}
                itemData={{ ...itemData, width }}
                width={width}
                height={height}
                overscanCount={overscanCount}
              >
                {(props) => <RowRenderer {...props} />}
              </List>
            )}
          </AutoSizer>
        </div>
      ) : (
        <div
          style={{
            padding: 15,
          }}
        >
          <WindowScroller
            onScroll={({ scrollTop }) => {
              listRef.current.scrollTo(scrollTop);
            }}
          >
            {() => <div></div>}
          </WindowScroller>
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                ref={listRef}
                itemCount={isGrid ? Math.ceil(dataSource.length / getNumberOfProductsToShow(width)) : dataSource.length}
                itemSize={getItemSize}
                itemData={{ ...itemData, width }}
                width={width}
                height={window.innerHeight}
                style={{
                  height: "100% !important",
                  overflowY: "hidden",
                  overflowX: "hidden",
                }}
                overscanCount={overscanCount}
              >
                {(props) => <RowRenderer {...props} />}
              </List>
            )}
          </AutoSizer>
        </div>
      )}
      {loadingMore && <LoadingSpinner size="small" />}
    </div>
  );
};
export default DynamicVirtualList;
