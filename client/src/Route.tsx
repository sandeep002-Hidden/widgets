import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import Home from "@/routes/Home/Home";
import UnAuthlayout from "./Layout/UnAuth";
import Widget from "./routes/widgets/Widget";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<UnAuthlayout />}>
        <Route path="" element={<Home />} />
        <Route path="widgets/:id" element={<Widget />} />
      </Route>
    </>
  )
);
