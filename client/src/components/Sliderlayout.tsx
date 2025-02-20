import React, { useState, useEffect, useRef } from "react";
import { useLayout } from "@/context/layout/LayoutContext";

export default function Sliderlayout() {
  const widget = useLayout();
  const [value, setValue] = useState(50);
  const scrollableRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex flex-1 h-full w-full justify-center items-center overflow-hidden noScrollBar">
        <div
          className=" rounded-xl border-highlight border-4"
          style={{
            width: `${widget.widget?.widgetSize?.layoutWidth}px`,
            border: widget.widget?.boarder?.isVisible
              ? `${widget.widget?.boarder?.borderWidth || 1}px solid ${
                  widget.widget?.boarder?.boarderColour || "black"
                }`
              : "none",
          }}
        >
          <div
            className={`h-fit p-4 border-b border-gray-400 rounded-t-lg flex object-cover ${
              !widget.widget?.header?.isShown && "hidden"
            }`}
            style={{
              backgroundColor: `${widget.widget?.header?.headerColour}`,
            }}
          >
            <span className="h-16 w-16 flex-shrink-0">
              <img
                src={widget.widget?.profilePic!}
                alt={`${widget.widget?.FullName}'s profile pic`}
                className="h-full w-full rounded-full hover:scale-110 transition-all duration-200 object-cover"
              />
            </span>
            <div className="ml-3 overflow-hidden flex justify-between  items-center  flex-1">
              <div>
                <p className="text-lg font-extrabold  hover:scale-110 transition-all duration-200 truncate">
                  {widget.widget?.FullName}
                </p>
                <p className="text-sm truncate">{widget.widget?.userName}</p>
              </div>
              <div>
                <p className="flex flex-1 justify-center items-end flex-col   text-right text-xl font-mono font-bold">
                  {widget.widget?.header?.headerText}
                </p>
              </div>
            </div>
          </div>
          <div
            className="rounded-b-lg overflow-x-scroll noScrollBar"
            style={{ backgroundColor: `${widget.widget?.body?.bodyColour}` }}
          >
            <div className="flex justify-center mb-2">
              <button onClick={scrollRight} className="mx-1">
                ⬅️
              </button>

              <button onClick={scrollLeft} className="mx-1">
                ➡️
              </button>
            </div>
            <div
              ref={scrollableRef}
              className="h-fit flex space-x-4 overflow-scroll noScrollBar"
            >
              {widget.widget?.posts!.map((item: any, index: number) => (
                <div key={index} className=" p-2 flex-shrink-0 w-52">
                  <p className="text-sm overflow-hidden text-ellipsis line-clamp-3">
                    {item.postText}
                  </p>
                  <div className="mt-1 w-full">
                    <img
                      src={item?.images!}
                      alt=""
                      className="h-fit w-fit object-cover"
                    />
                  </div>
                  <div className="flex mt-2">
                    <span className="mr-2">
                      <p>👍🏼{item.likes}</p>
                    </span>
                    <span>
                      <p>💬{item.comments?.length}</p>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
