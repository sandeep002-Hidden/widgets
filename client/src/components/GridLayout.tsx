"use client";
import React, { useEffect } from "react";
import { useLayout } from "@/context/layout/LayoutContext";

export default function GridLayout() {
  const widget = useLayout();
  useEffect(() => {
    console.log(widget);
  }, []);
  return (
    <>
      <div className="flex flex-1 h-full w-full justify-center items-center overflow-hidden">
        <div
          className={`flex flex-col rounded-2xl bg-white`}
          style={{
            width: `${widget.widget?.widgetSize?.layoutWidth}px`,
            height: `${widget.widget?.widgetSize?.layoutHeight}px`,
            border: widget.widget?.boarder?.isVisible
              ? `${widget.widget?.boarder?.borderWidth || 1}px solid ${
                  widget.widget?.boarder?.boarderColour || "black"
                }`
              : "none",
          }}
        >
          <div
            className={`p-4 border-b  rounded-t-xl border-gray-400 flex object-cover transition-all duration-100 ${
              !widget.widget?.header?.isShown
                ? "opacity-0 hidden overflow-hidden"
                : "opacity-100 h-auto"
            }  `}
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
            <div className="ml-3 overflow-hidden">
              <p className="text-lg font-extrabold hover:scale-110 transition-all duration-200 truncate">
                {widget.widget?.FullName}
              </p>
              <p className="text-sm truncate">{widget.widget?.userName}</p>
            </div>
            <div className="flex flex-1 flex-col">
              <p className="flex flex-1 justify-center items-end flex-col   text-right text-xl font-mono font-bold">
                {widget.widget?.header?.headerText}
              </p>
            </div>
          </div>
          <div
            className="flex-1 p-4 overflow-hidden rounded-b-xl "
            style={{ backgroundColor: `${widget.widget?.body?.bodyColour}` }}
          >
            <div className="h-full w-full overflow-y-auto no-web-toolkit">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-max pb-4 no-web-toolkit">
                {widget.widget?.posts!.map((item, index) => (
                  <div
                    key={index}
                    className="bg-slate-100 rounded-lg overflow-hidden shadow-md flex flex-col h-auto"
                  >
                    <div className="p-3">
                      <p className="text-sm line-clamp-3 overflow-hidden">
                        {item.postText}
                      </p>
                    </div>

                    {item.images && (
                      <div className="h-fit bg-gray-200">
                        <img
                          src={item.images}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex p-3 mt-auto">
                      <span className="mr-4 flex items-center">
                        <span className="mr-1">👍🏼</span>
                        <span>{item.likes}</span>
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">💬</span>
                        <span>{item.comments?.length}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
