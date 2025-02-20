import { Outlet } from "react-router";
import {LayoutContextProvider} from "@/context/layout/LayoutContext";

export default function UnAuth() {
  return (
    <div>
      <LayoutContextProvider>
        <Outlet />
      </LayoutContextProvider>
    </div>
  );
}
