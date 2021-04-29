import { Col, Row } from "antd";
import _ from "lodash";
import memoize from "memoize-one";
import React, { memo, useEffect, useRef, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
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

const findAntdColumn = (columnNumber) =>
  24 % columnNumber == 0 || columnNumber == 0 ? columnNumber || 1 : findAntdColumn(columnNumber - 1);

const getNumberOfCardsToShow = (width, fixedCardWidth) => {
  if (width > fixedCardWidth) {
    if (width % fixedCardWidth == 0) {
      return findAntdColumn(width / fixedCardWidth || 1);
    } else {
      return getNumberOfCardsToShow(Math.floor(width / fixedCardWidth) * fixedCardWidth, fixedCardWidth);
    }
  } else {
    return 1;
  }
};

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
  let { dataSource, onHeightChange, cardProps, width, isGrid, GridCard, RowCard, fixedCardWidth } = data;
  let numberOfRows = dataSource.length;
  let record = dataSource[index];
  let numberOfCol;
  let itemsToShow;
  let numberOfCardsToShow = 1;
  if (isGrid) {
    numberOfCardsToShow = getNumberOfCardsToShow(width, fixedCardWidth);
    numberOfCol = Math.floor(24 / numberOfCardsToShow);
    itemsToShow = _.take(_.drop(dataSource, index * numberOfCardsToShow), numberOfCardsToShow);
    numberOfRows = Math.ceil(dataSource.length / getNumberOfCardsToShow(width, fixedCardWidth));
  }

  return (
    <div style={style}>
      <HeightDetector
        onHeightChange={(height, index) => {
          onHeightChange(height, index, numberOfCardsToShow);
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
const createItemData = memoize((dataSource, onHeightChange, RowCard, cardProps, isGrid, GridCard, fixedCardWidth) => ({
  dataSource,
  onHeightChange,
  RowCard,
  cardProps,
  isGrid,
  GridCard,
  fixedCardWidth,
}));

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
  fixedCardWidth = 250,
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

  const itemData = createItemData(dataSource, onHeightChange, RowCard, cardProps, isGrid, GridCard, fixedCardWidth);
  useEffect(() => {
    if (!_.isEmpty(rowHeights)) {
      let newHeights = new Array(
        Math.ceil(
          isGrid
            ? dataSource.length / getNumberOfCardsToShow(parentRef.current.offsetWidth, fixedCardWidth)
            : dataSource.length
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

  const containerRef = useBottomScrollListener(() => {
    if (hasMore && !loadingMore && !initialLoading) {
      loadMore();
    }
  });

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
                itemCount={
                  isGrid
                    ? Math.ceil(dataSource.length / getNumberOfCardsToShow(width, fixedCardWidth))
                    : dataSource.length
                }
                itemSize={getItemSize}
                itemData={{ ...itemData, width }}
                width={width}
                height={height}
                overscanCount={overscanCount}
                outerRef={containerRef}
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
              listRef.current && listRef.current.scrollTo(scrollTop);
            }}
          >
            {() => <div></div>}
          </WindowScroller>
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                ref={listRef}
                itemCount={
                  isGrid
                    ? Math.ceil(dataSource.length / getNumberOfCardsToShow(width, fixedCardWidth))
                    : dataSource.length
                }
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
