import { useParams } from "react-router-dom";

export default function ContentDetail() {
  const { id } = useParams();

  return (
    <p className="text-primary text-3xl font-semibold">{id}번 음원 상세 페이지에요~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</p>
  );
}