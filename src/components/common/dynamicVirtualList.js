import _ from "lodash";
import memoize from "memoize-one";
import React, { memo, useEffect, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { AutoSizer, WindowScroller } from "react-virtualized";
import { areEqual, VariableSizeList as List } from "react-window";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";
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
  let { dataSource, hasMore, loadingMore, initialLoading, onHeightChange, RowCard, cardProps, loadMore } = data;
  let numberOfRows = dataSource.length;
  let record = dataSource[index];
  if (index == numberOfRows - 1 && hasMore && !loadingMore && !initialLoading) {
    loadMore();
  }
  return (
    <div style={style}>
      <HeightDetector onHeightChange={onHeightChange} index={index}>
        <RowCard {...cardProps} record={record} />
      </HeightDetector>
    </div>
  );
}, areEqual);
const createItemData = memoize(
  (dataSource, hasMore, loadingMore, initialLoading, onHeightChange, RowCard, cardProps, loadMore) => ({
    dataSource,
    hasMore,
    loadingMore,
    initialLoading,
    onHeightChange,
    RowCard,
    cardProps,
    loadMore,
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
  fixedHeight,
  cardProps,
  RowCard,
}) => {
  const [rowHeights, setRowHeights] = useState({});
  const getItemSize = (index) => rowHeights[index] || 80;
  let listRef = useRef();
  const onHeightChange = (height, index) => {
    let newHeight = Math.floor(height) + 20;
    if (newHeight && index == 0 && _.isEmpty(rowHeights)) {
      setRowHeights(
        dataSource.reduce((prev, curr, index) => {
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
    loadMore
  );
  return initialLoading ? (
    <LoadingSpinner />
  ) : (
    <>
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
                itemCount={dataSource.length}
                itemSize={getItemSize}
                itemData={itemData}
                width={width}
                height={height}
              >
                {RowRenderer}
              </List>
            )}
          </AutoSizer>
        </div>
      ) : (
        <WindowScroller
          onScroll={({ scrollTop }) => {
            listRef.current.scrollTo(scrollTop);
          }}
        >
          {({ height }) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  ref={listRef}
                  itemCount={dataSource.length}
                  itemSize={getItemSize}
                  itemData={itemData}
                  // width={width}
                  // height={height}
                  width={width}
                  height={height}
                  style={{
                    height: "100% !important",
                  }}
                >
                  {RowRenderer}
                </List>
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      )}
      {loadingMore && <LoadingSpinner size="small" />}
    </>
  );
};
export default DynamicVirtualList;
