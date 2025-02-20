"use client";
import { useEffect, useState } from "react";
import { useLayout } from "@/context/layout/LayoutContext";
import GridLayout from "@/components/GridLayout";
import Sliderlayout from "@/components/Sliderlayout";
import SimpleLayout from "@/components/SimpleLayout";
import axios from "axios";
interface User {
  profilePic: string | null;
  FullName: string | null;
  userName: string | null;
  posts: Posts[] | null;
  header: header | null;
  body: body | null;
  boarder: boarder | null;
  widgetSize: widgetSize | null;
}
interface boarder {
  borderWidth: string | null;
  boarderColour: string | null;
  isVisible: boolean | true;
}
interface header {
  headerText: string | null;
  headerColour: string | null;
  isShown: boolean | null;
}
interface body {
  bodyColour: string | null;
}
interface widgetSize {
  layoutHeight: string | null;
  layoutWidth: string | null;
}

interface Posts {
  images: string | null;
  likes: number | null;
  comments: comments[] | null;
  postText: string | null;
}
interface comments {
  userName: string | null;
  commentString: string | null;
  likes: number | null;
}
export default function Home() {
  const [gotResponse, setResponse] = useState<boolean>(false);
  const [id, setId] = useState("");
  const [userPreferencelayout, setuserPreferencelayout] = useState("grid");
  const [header, setHeader] = useState({
    headerText: "Test Header",
    headerColour: "#ffffff",
    isShown: true,
  });
  const [layoutSize, setLayOutSize] = useState({
    layoutHeight: "420",
    layoutWidth: "700",
  });
  const [body, setBody] = useState({
    bodyColour: "#ffffff",
  });
  const [boarder, setBoarder] = useState({
    borderWidth: "4",
    boarderColour: "rgb(110,6,242)",
    isVisible: true,
  });
  const dummyUser: User = {
    profilePic:
      "https://res.cloudinary.com/dv65zmain/image/upload/v1738685299/Nexora/bkyx7tjxjt8hzrdzrhfx.png",
    FullName: "John Doe",
    userName: "johndoe123",
    posts: [
      {
        images:
          "https://res.cloudinary.com/dv65zmain/image/upload/v1730728512/create-a-cover-image-with-pubg-character-d9fb0e_qr0nou.jpg",
        likes: 150,
        comments: [
          {
            userName: "user123",
            commentString: "Great post!",
            likes: 10,
          },
          {
            userName: "user456",
            commentString: "Nice picture!",
            likes: 5,
          },
        ],
        postText: "Enjoying a beautiful day at the park!",
      },
      {
        images:
          "https://res.cloudinary.com/dv65zmain/image/upload/v1730749620/png-transparent-user_vdgdet.png",
        likes: 75,
        comments: [
          {
            userName: "user789",
            commentString: "Love this!",
            likes: 3,
          },
        ],
        postText: "Just finished reading an amazing book.",
      },
      {
        images:
          "https://res.cloudinary.com/dv65zmain/image/upload/v1730728512/create-a-cover-image-with-pubg-character-d9fb0e_qr0nou.jpg",
        likes: 150,
        comments: [
          {
            userName: "user123",
            commentString: "Great post!",
            likes: 10,
          },
          {
            userName: "user456",
            commentString: "Nice picture!",
            likes: 5,
          },
        ],
        postText: "Enjoying a beautiful day at the park!",
      },
      {
        images:
          "https://res.cloudinary.com/dv65zmain/image/upload/v1730749620/png-transparent-user_vdgdet.png",
        likes: 75,
        comments: [
          {
            userName: "user789",
            commentString: "Love this!",
            likes: 3,
          },
        ],
        postText: "Just finished reading an amazing book.",
      },
      {
        images:
          "https://res.cloudinary.com/dv65zmain/image/upload/v1730728512/create-a-cover-image-with-pubg-character-d9fb0e_qr0nou.jpg",
        likes: 150,
        comments: [
          {
            userName: "user123",
            commentString: "Great post!",
            likes: 10,
          },
          {
            userName: "user456",
            commentString: "Nice picture!",
            likes: 5,
          },
        ],
        postText: "Enjoying a beautiful day at the park!",
      },
      {
        images:
          "https://res.cloudinary.com/dv65zmain/image/upload/v1730749620/png-transparent-user_vdgdet.png",
        likes: 75,
        comments: [
          {
            userName: "user789",
            commentString: "Love this!",
            likes: 3,
          },
        ],
        postText: "Just finished reading an amazing book.",
      },
      {
        images:
          "https://res.cloudinary.com/dv65zmain/image/upload/v1730728512/create-a-cover-image-with-pubg-character-d9fb0e_qr0nou.jpg",
        likes: 150,
        comments: [
          {
            userName: "user123",
            commentString: "Great post!",
            likes: 10,
          },
          {
            userName: "user456",
            commentString: "Nice picture!",
            likes: 5,
          },
        ],
        postText: "Enjoying a beautiful day at the park!",
      },
      {
        images:
          "https://res.cloudinary.com/dv65zmain/image/upload/v1730749620/png-transparent-user_vdgdet.png",
        likes: 75,
        comments: [
          {
            userName: "user789",
            commentString: "Love this!",
            likes: 3,
          },
        ],
        postText: "Just finished reading an amazing book.",
      },
      {
        images:
          "https://res.cloudinary.com/dv65zmain/image/upload/v1730728512/create-a-cover-image-with-pubg-character-d9fb0e_qr0nou.jpg",
        likes: 150,
        comments: [
          {
            userName: "user123",
            commentString: "Great post!",
            likes: 10,
          },
          {
            userName: "user456",
            commentString: "Nice picture!",
            likes: 5,
          },
        ],
        postText: "Enjoying a beautiful day at the park!",
      },
      {
        images:
          "https://res.cloudinary.com/dv65zmain/image/upload/v1730749620/png-transparent-user_vdgdet.png",
        likes: 75,
        comments: [
          {
            userName: "user789",
            commentString: "Love this!",
            likes: 3,
          },
        ],
        postText: "Just finished reading an amazing book.",
      },
      {
        images:
          "https://res.cloudinary.com/dv65zmain/image/upload/v1730728512/create-a-cover-image-with-pubg-character-d9fb0e_qr0nou.jpg",
        likes: 150,
        comments: [
          {
            userName: "user123",
            commentString: "Great post!",
            likes: 10,
          },
          {
            userName: "user456",
            commentString: "Nice picture!",
            likes: 5,
          },
        ],
        postText: "Enjoying a beautiful day at the park!",
      },
      {
        images:
          "https://res.cloudinary.com/dv65zmain/image/upload/v1730749620/png-transparent-user_vdgdet.png",
        likes: 75,
        comments: [
          {
            userName: "user789",
            commentString: "Love this!",
            likes: 3,
          },
        ],
        postText: "Just finished reading an amazing book.",
      },
      {
        images:
          "https://res.cloudinary.com/dv65zmain/image/upload/v1730728512/create-a-cover-image-with-pubg-character-d9fb0e_qr0nou.jpg",
        likes: 150,
        comments: [
          {
            userName: "user123",
            commentString: "Great post!",
            likes: 10,
          },
          {
            userName: "user456",
            commentString: "Nice picture!",
            likes: 5,
          },
        ],
        postText: "Enjoying a beautiful day at the park!",
      },
      {
        images:
          "https://res.cloudinary.com/dv65zmain/image/upload/v1730749620/png-transparent-user_vdgdet.png",
        likes: 75,
        comments: [
          {
            userName: "user789",
            commentString: "Love this!",
            likes: 3,
          },
        ],
        postText: "Just finished reading an amazing book.",
      },
      {
        images:
          "https://res.cloudinary.com/dv65zmain/image/upload/v1730728512/create-a-cover-image-with-pubg-character-d9fb0e_qr0nou.jpg",
        likes: 150,
        comments: [
          {
            userName: "user123",
            commentString: "Great post!",
            likes: 10,
          },
          {
            userName: "user456",
            commentString: "Nice picture!",
            likes: 5,
          },
        ],
        postText: "Enjoying a beautiful day at the park!",
      },
      {
        images:
          "https://res.cloudinary.com/dv65zmain/image/upload/v1730749620/png-transparent-user_vdgdet.png",
        likes: 75,
        comments: [
          {
            userName: "user789",
            commentString: "Love this!",
            likes: 3,
          },
        ],
        postText: "Just finished reading an amazing book.",
      },
    ],
    header: header,
    body: body,
    boarder: boarder,
    widgetSize: layoutSize,
  };
  const { widget, setWidget } = useLayout();
  useEffect(() => {
    setWidget(dummyUser);
  }, []);
  useEffect(() => {
    setWidget(dummyUser)
  }, [header, layoutSize, body, boarder]);

  const renderLayout = () => {
    switch (userPreferencelayout) {
      case "simple":
        return <SimpleLayout />;
      case "grid":
        return <GridLayout />;
      case "slider":
        return <Sliderlayout />;
    }
  };
  useEffect(()=>{
    if(userPreferencelayout==="simple"){
      setLayOutSize({...layoutSize,layoutWidth:"320"})
    }
  },[userPreferencelayout])
  const saveThePost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/savewidget",
        {
          layoutData: widget,
          widget: userPreferencelayout,
        }
      );
      if (response.data.success) {
        setId(response.data.id);
        setResponse(true);
      }
      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const copylink = () => {
    const iframeCode = `<iframe src="http://localhost:5173/widgets/${id}" style="width: ${layoutSize.layoutWidth}px; height: ${layoutSize.layoutHeight}px"></iframe>`;
    navigator.clipboard.writeText(iframeCode);
  };
  
  return (
    <>
      <div className={`flex h-screen ${gotResponse && "blur-sm"}`}>
        <div className="flex h-full flex-col bg-white  border-r-4 border-blue-500 w-80 shadow-lg overflow-scroll noScrollBar">
          <div className="flex flex-1 flex-col p-6 space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-black mb-4">
                Select widget
              </h2>
              <div className="space-y-3">
                {["simple", "slider", "grid"].map((type, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="radioGroup"
                      value={type}
                      defaultChecked={true}
                      onClick={(e: any) =>
                        setuserPreferencelayout(e.target.value)
                      }
                      className="form-radio text-[rgb(110,6,242)] border-gray-300 focus:ring-[rgb(110,6,242)]"
                    />
                    <span className="text-black capitalize group-hover:text-[rgb(110,6,242)] transition-colors">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Header Config */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-black">Header</h3>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="hc"
                    id="hc"
                    defaultChecked={true}
                    onChange={() =>
                      setHeader({ ...header, isShown: !header.isShown })
                    }
                    className="form-checkbox text-[rgb(110,6,242)] rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Show Header
                  </span>
                </label>
              </div>

              {header.isShown && (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Enter Header Text"
                    value={header.headerText}
                    onChange={(e: any) =>
                      setHeader({ ...header, headerText: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(110,6,242)] focus:border-transparent"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      defaultValue={header.headerColour || "#ffffff"}
                      onChange={(e: any) =>
                        setHeader({ ...header, headerColour: e.target.value })
                      }
                      className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">Header Color</span>
                  </div>
                </div>
              )}
            </div>

            {/* Body Config */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-black">Body</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  defaultValue={body.bodyColour||"#000000"}
                  onChange={(e: any) =>
                    setBody({ ...body, bodyColour: e.target.value })
                  }
                  className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-600">Body Color</span>
              </div>
            </div>

            {/* widget Size */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-black">widget Size</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Height"
                  defaultValue={layoutSize.layoutHeight}
                  onChange={(e: any) =>
                    setLayOutSize({
                      ...layoutSize,
                      layoutHeight: e.target.value,
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(110,6,242)] focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Width"
                  defaultValue={layoutSize.layoutWidth}
                  onChange={(e: any) =>
                    setLayOutSize({
                      ...layoutSize,
                      layoutWidth: e.target.value,
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(110,6,242)] focus:border-transparent"
                />
              </div>
            </div>

            {/* Border Config */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-black">Border</h3>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    onChange={(e: any) =>
                      setBoarder({ ...boarder, isVisible: !boarder.isVisible })
                    }
                    className="form-checkbox text-[rgb(110,6,242)] rounded border-gray-300"
                  />
                  <p>{boarder.isVisible}</p>
                  <span className="ml-2 text-sm text-gray-600">
                    Show Border
                  </span>
                </label>
              </div>

              {boarder.isVisible && (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Border Width"
                    defaultValue={boarder.borderWidth||"4"}
                    onChange={(e: any) =>
                      setBoarder({ ...boarder, borderWidth: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(110,6,242)] focus:border-transparent"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      defaultValue={boarder.boarderColour}
                      onChange={(e: any) =>
                        setBoarder({
                          ...boarder,
                          boarderColour: e.target.value,
                        })
                      }
                      className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">Border Color</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 border-t border-gray-200">
            <button
              className="w-full py-2 px-4 bg-[rgb(110,6,242)] text-white rounded-lg hover:bg-[rgb(90,5,200)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(110,6,242)]"
              onClick={saveThePost}
            >
              Publish
            </button>
          </div>
        </div>
        <div className="flex flex-1 bg-gray-50">{renderLayout()}</div>
      </div>

      {gotResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-3">
                <button
                  onClick={copylink}
                  className="px-4 py-2 border border-[rgb(110,6,242)] text-[rgb(110,6,242)] rounded-lg hover:bg-[rgb(110,6,242)] hover:text-white transition-colors"
                >
                  GetEmbeded Code
                </button>
                <button
                  onClick={() => setResponse(!gotResponse)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
