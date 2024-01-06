import imageBotLeft from "@/assets/calendar1-sidebar-siluet.png"

function LeftMenu() {
  return (
    <div className="w-[252px] h-[920.02px] relative">
          <div className="w-[252px] h-[920px] left-0 top-0 absolute">
            <div className="w-[252px] h-[920px] left-0 top-0 absolute bg-white rounded-tl-md rounded-bl-md"></div>
            <div className="w-[252px] h-[920px] left-0 top-0 absolute rounded-tl-md rounded-bl-md border border-gray-200"></div>
          </div>
          <img
            className="w-[251.20px] h-[189px] left-[0.21px] top-[731.02px] absolute"
            src={imageBotLeft}
          />
          <div className="w-24 h-[239px] left-[22px] top-[96px] absolute">
            <div className="w-[86px] h-5 left-0 top-[183px] absolute justify-center items-start gap-[9px] inline-flex">
              <div className="w-5 h-5 p-px shadow justify-center items-center inline-flex">
                <div className="w-[18px] h-[18px] relative">
                  <div className="w-[18px] h-[18px] left-0 top-0 absolute bg-green-500 rounded-[3px]"></div>
                </div>
              </div>
              <div className="text-gray-600 text-sm font-medium tracking-wide">
                Holiday
              </div>
            </div>
            <div className="w-[58px] h-5 left-0 top-[219px] absolute justify-center items-start gap-[9px] inline-flex">
              <div className="w-5 h-5 p-px shadow justify-center items-center inline-flex">
                <div className="w-[18px] h-[18px] relative">
                  <div className="w-[18px] h-[18px] left-0 top-0 absolute bg-cyan-500 rounded-[3px]"></div>
                </div>
              </div>
              <div className="text-gray-600 text-sm font-medium tracking-wide">
                ETC
              </div>
            </div>
            <div className="w-[79px] h-5 left-0 top-[147px] absolute justify-center items-start gap-[9px] inline-flex">
              <div className="w-5 h-5 p-px shadow justify-center items-center inline-flex">
                <div className="w-[18px] h-[18px] relative">
                  <div className="w-[18px] h-[18px] left-0 top-0 absolute bg-orange-400 rounded-[3px]"></div>
                </div>
              </div>
              <div className="text-gray-600 text-sm font-medium tracking-wide">
                Family
              </div>
            </div>
            <div className="w-24 h-5 pr-px left-0 top-[111px] absolute justify-center items-start gap-[9px] inline-flex">
              <div className="w-5 h-5 p-px shadow justify-center items-center inline-flex">
                <div className="w-[18px] h-[18px] relative">
                  <div className="w-[18px] h-[18px] left-0 top-0 absolute bg-indigo-500 rounded-[3px]"></div>
                </div>
              </div>
              <div className="text-gray-600 text-sm font-medium tracking-wide">
                Business
              </div>
            </div>
            <div className="w-[95px] h-5 pr-px left-0 top-[75px] absolute justify-center items-start gap-[9px] inline-flex">
              <div className="w-5 h-5 p-px shadow justify-center items-center inline-flex">
                <div className="w-[18px] h-[18px] relative">
                  <div className="w-[18px] h-[18px] left-0 top-0 absolute bg-red-500 rounded-[3px]"></div>
                </div>
              </div>
              <div className="text-gray-600 text-sm font-medium tracking-wide">
                Personal
              </div>
            </div>
            <div className="w-[89px] h-5 left-0 top-[39px] absolute justify-center items-start gap-[9px] inline-flex">
              <div className="w-5 h-5 p-px shadow justify-center items-center inline-flex">
                <div className="w-[18px] h-[18px] relative">
                  <div className="w-[18px] h-[18px] left-0 top-0 absolute bg-indigo-500 rounded-[3px]"></div>
                </div>
              </div>
              <div className="text-gray-600 text-sm font-medium tracking-wide">
                View All
              </div>
            </div>
            <div className="w-[46px] h-[23px] pr-px left-[1px] top-0 absolute justify-center items-center inline-flex">
              <div className="text-stone-300 text-xs font-medium uppercase leading-[23px] tracking-wide">
                Filter
              </div>
            </div>
          </div>
          <div className="w-[213px] h-[38px] left-[22px] top-[19px] absolute">
            <div className="w-[213px] h-[38px] left-0 top-0 absolute">
              <div className="w-[213px] h-[38px] left-0 top-0 absolute bg-indigo-500 rounded-[5px]"></div>
            </div>
            <div className="w-[149.32px] left-[32.94px] top-[10px] absolute text-center text-white text-sm font-medium tracking-wide">
              Add New
            </div>
          </div>
        </div>
  )
}

export default LeftMenu
