import Piano from "../components/Piano";

export default function WorkPlace() {
  return (
    <div>
      <p className="text-primary text-3xl font-semibold">작업실 화면이에요~~~~~~~~</p>
      <div className="h-screen">
        <div className="flex w-full h-4/6">
          <div className="w-4/12 bg-base-200 border-r-2 border-b-2 border-gray-300" >1</div>
          <div className="w-8/12 bg-base-200 border-b-2 border-gray-300">2</div>
        </div>
        <div className="flex w-full h-2/6">
          <div className="w-4/12 bg-base-200 border-r-2 border-gray-300">3</div>
          <div className="w-8/12 bg-base-200"><Piano></Piano></div>
        </div>
</div>
    </div>
  );
}
