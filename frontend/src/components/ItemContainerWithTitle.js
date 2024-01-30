import { Link } from "react-router-dom";

export default function ItemContainerWithTitle({ title, link, children }) {
  return (
    <div className="w-full p-8">
      <div className="flex text-base-content gap-16 mb-4">
        <h1>{title}</h1>
        <Link to={link} className="text-base-content hover:text-base-content flex items-center">바로가기</Link>
      </div>
      <div className="w-full">
        { children }
      </div>
    </div>
  );
}