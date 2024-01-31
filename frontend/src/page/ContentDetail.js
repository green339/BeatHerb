import { useParams } from "react-router-dom";

export default function ContentDetail() {
  const { id } = useParams();

  return (
    <h1 className="text-primary">{id}번 음원 상세 페이지에요~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</h1>
  );
}