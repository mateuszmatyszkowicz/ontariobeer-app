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
      <div data-testid={"list"}>
        {data.map((element) => (
          <div
            className="flex items-center p-4 bg-white rounded-lg shadow-xs "
            data-testid={`list-item-${element.id}`}
            key={element.id}
          >
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full">
              <img
                className="w-10 h-10 rounded-2xl"
                src={element.thumbnail}
                alt={element.name}
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 ">
                {element.name} ({element.type})
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {element.ppl}$
              </p>
            </div>
          </div>
        ))}
      </div>
      {isEndListReached() ? null : <div onClick={loadMore}>load more</div>}
    </>
  );
};

export default List;
