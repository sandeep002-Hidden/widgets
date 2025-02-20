import React, { useEffect, useState } from "react";
import axios from "axios";
import SimpleLayout from "@/components/SimpleLayout";
import GridLayout from "@/components/GridLayout";
import Sliderlayout from "@/components/Sliderlayout";
import { useLayout } from "@/context/layout/LayoutContext";
import { useParams } from "react-router";
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
interface header {
  headerText: string | null;
  headerColour: string | null;
  isShown: boolean | null;
}
interface boarder {
  borderWidth: string | null;
  boarderColour: string | null;
  isVisible: boolean | null;
}
interface body {
  bodyColour: string | null;
}
interface widgetSize {
  layoutHeight: string | null;
  layoutWidth: string | null;
}
interface comments {
  userName: string | null;
  commentString: string | null;
  likes: number | null;
}
interface Posts {
  images: string | null;
  likes: number | null;
  comments: comments[] | null;
  postText: string | null;
}

export default function Widget() {
  var { id } = useParams();
  const { widget, setWidget } = useLayout();
  const [layoutType, setLayoutType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [userData, setUserData] = useState<User>({
    FullName: null,
    userName: null,
    posts: [],
    profilePic: null,
    header: {
      headerText: null,
      headerColour: null,
      isShown: null,
    },
    body: {
      bodyColour: null,
    },
    boarder: {
      borderWidth: null,
      boarderColour: null,
      isVisible: null,
    },
    widgetSize: {
      layoutHeight: null,
      layoutWidth: null,
    },
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          throw new Error("No user ID provided");
        }

        console.log("Fetching data for ID:", id);
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/widgets/${id}`
        );
        console.log("API Response:", response.data);

        if (response.data.success) {
          const { posts } = response.data;
          const { widget } = posts;
          setLayoutType(widget);

          console.log(posts);
          setUserData({
            FullName: posts.FullName || null,
            userName: posts.userName || null,
            profilePic: posts.profilePic || null,
            posts: posts.posts || [],
            header: posts.header || {
              headerText: null,
              headerColour: null,
              isShown: null,
            },
            body: posts.body || {
              bodyColour: null,
            },
            boarder: posts.boarder || {
              borderWidth: null,
              boarderColour: null,
              isVisible: null,
            },
            widgetSize: {
              layoutHeight: posts.layoutHeight,
              layoutWidth: posts.layoutWidth,
            },
          });
        } else {
          throw new Error(response.data.message || "Failed to fetch user data");
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        setError(error.message || "An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);
  useEffect(() => {
    if (userData.FullName) {
      console.log("Updating widget context with user data:", userData);
      setWidget(userData);
    }
  }, [userData, setWidget]);

  const renderLayout = (type: string) => {
    console.log("Rendering widget type:", type);
    switch (type.toLowerCase()) {
      case "simple":
        return <SimpleLayout />;
      case "grid":
        return <GridLayout />;
      case "slider":
        return <Sliderlayout />;
      default:
        console.warn("Unknown widget type:", type);
        return <SimpleLayout />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-cyan-200">{layoutType && renderLayout(layoutType)}</div>
  );
}
