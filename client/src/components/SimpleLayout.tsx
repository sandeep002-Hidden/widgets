import React, { useEffect } from "react";
import { useLayout } from "@/context/layout/LayoutContext";
export default function SimpleLayout() {
  const widget = useLayout();
  return (
    <>
      <div className="flex justify-center h-full items-center flex-1">
        <div
          className=" rounded-xl border-4 border-highlight overflow-y-scroll noScrollBar"
          style={{
            width: `${widget.widget?.widgetSize?.layoutWidth}px`,
            height: "70vh",
            border: widget.widget?.boarder?.isVisible
              ? `${widget.widget?.boarder?.borderWidth || 1}px solid ${
                  widget.widget?.boarder?.boarderColour || "black"
                }`
              : "none",
          }}
        >
          <div
            className={`h-fit border-b border-gray-400 flex object-cover p-3 ${
              !widget.widget?.header?.isShown && "hidden"
            }`}
            style={{
              backgroundColor: `${widget.widget?.header?.headerColour}`,
            }}
          >
            <span className="h-16 w-16">
              <img
                src={widget.widget?.profilePic!}
                alt={`${widget.widget?.FullName}'s profile pic`}
                className=" h-full w-full rounded-full hover:scale-110 transition-all duration-200 object-cover"
              />
            </span>
            <div className="ml-3 flex items-center justify-between flex-1">
              <div>
                <p className="font-extrabold">{widget.widget?.FullName}</p>
                <p className="text-sm">{widget.widget?.userName}</p>
              </div>
              <div>
                <p>{widget.widget?.header?.headerText}</p>
              </div>
            </div>
          </div>
          <div
            style={{ backgroundColor: `${widget.widget?.body?.bodyColour}` }}
          >
            {widget.widget?.posts?.map((items, index) => (
              <div key={index} className="px-2 mb-4">
                <p>{items?.postText}</p>
                <div className="px-1 >">
                  <img src={items?.images!} alt="" className="" />
                </div>
                <div className="flex">
                  <span className="mr-2">
                    <p>👍🏼{items.likes}</p>
                  </span>
                  <span>
                    <p>💬{items.comments?.length}</p>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
