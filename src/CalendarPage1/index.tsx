import Calendar from "./Calendar";
import LeftMenu from "./LeftMenu";

function CalendarPage1() {
  return (
    <div className="flex items-center justify-center min-h-screen antialiased font-inter min-[320px]:text-center ">
      <div
        className="w-[1304px] h-[920.02px] 
      justify-center items-start inline-flex 
      bg-slate-300
      hover:drop-shadow-2xl
      hover:shadow-orange-500
      "
      >
        <Calendar />
        <LeftMenu />
      </div>
    </div>
  );
}

export default CalendarPage1;
