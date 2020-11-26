import React from "react";

export type ListItem = {
  id: string;
  name: string;
  type: string;
  ppl: string;
  thumbnail: string;
};

type ListProps = {
  data: ListItem[];
  totalCount: number;
  loadMore: () => void;
};

const List = ({ data = [], totalCount, loadMore }: ListProps) => {
  const isEndListReached = () => totalCount <= data.length;

  return (
    <>
      <div>
        totalCount: {totalCount}, dataLength: {data.length}
      </div>
      <div data-testid={"beer-list"}>
        {data.map((element) => (
          <div data-testid={`beer-item-${element.id}`} key={element.id}>
            <div>{element.name}</div>
            <div>{element.thumbnail}</div>
            <div>{element.type}</div>
            <div>{element.ppl}</div>
          </div>
        ))}
      </div>
      {isEndListReached() ? null : <div onClick={loadMore}>load more</div>}
    </>
  );
};

export default List;
