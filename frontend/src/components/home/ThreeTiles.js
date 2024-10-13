function ThreeTiles() {
  return (
    <div className="flex sw-1250:flex-row flex-col sw-1250:justify-between gap-10">
      <div className="flex flex-col items-center">
        <img
          src="/images/home/travel blog.jpg"
          alt="Logo"
          className="sw-1400:w-[340px] sw-1400:h-[250px] sw-1250:w-[300px] sw-1250:h-[220px] sw-480:w-[340px] sw-480:h-[250px] sw-360::w-[280px] sw-360:h-[200px] opacity-90 rounded-md transition-all duration-300 ease-in-out hover:cursor-pointer hover:opacity-80"
        />
        <p className="text-center pt-5 font-open-sans-condensed font-bold opacity-75 sw-1400:text-[24px] text-[20px] duration-500 ease-in-out">
          Travel Blog
        </p>
      </div>
      <div className="flex flex-col items-center">
        <img
          src="/images/home/join with us.jpg"
          alt="Logo"
          className="sw-1400:w-[340px] sw-1400:h-[250px] sw-1250:w-[300px] sw-1250:h-[220px] sw-480:w-[340px] sw-480:h-[250px] sw-360::w-[280px] sw-360:h-[200px] opacity-90 rounded-md transition-all duration-500 ease-in-out hover:cursor-pointer hover:opacity-80"
        />
        <p className="text-center pt-5 font-open-sans-condensed font-bold opacity-75 sw-1400:text-[24px] text-[20px] duration-500 ease-in-out">
          Join with Us
        </p>
      </div>

      <div className="flex flex-col items-center">
        <img
          src="/images/home/about.jpg"
          alt="Logo"
          className="sw-1400:w-[340px] sw-1400:h-[250px] sw-1250:w-[300px] sw-1250:h-[220px] sw-480:w-[340px] sw-480:h-[250px] sw-360::w-[280px] sw-360:h-[200px] opacity-90 rounded-md transition-all duration-500 ease-in-out hover:cursor-pointer hover:opacity-80"
        />
        <p className="text-center pt-5 font-open-sans-condensed font-bold opacity-75 sw-1400:text-[24px] text-[20px] duration-500 ease-in-out">
          About Us
        </p>
      </div>
    </div>
  );
}
export default ThreeTiles;
