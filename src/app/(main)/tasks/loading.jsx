import { BeatLoader } from "react-spinners";

export default function Loading() {
  return <div className="flex justify-center items-center h-screen">
    <BeatLoader size={20} color="#f39c12" />
  </div>;
}
