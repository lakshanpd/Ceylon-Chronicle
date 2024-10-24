function Thanks({ isButton }) {
  return (
    <div className="grid sw-1250:grid-cols-2 grid-cols-1 sw-1250:gap-28 gap-12">
      <div className="flex items-center sw-480:justify-center">
        <img
          src="/images/home/thanks image.jpg"
          alt="thanks image"
          className="sw-1400:w-[450px] sw-1400:h-[450px] sw-1250:w-[400px] sw-1250:h-[400px] shadow-2xl opacity-90 sm:max-w-[500px] sm:max-h-[500px] sw-1400:max-w-[400px] sw-1400:max-h-[400px] rounded-md"
        />
      </div>
      <div>
        <p className="font-open-sans-condensed font-bold sw-1400:text-[30px] sw-1250:text-[26px] sw-480:text-[28px] opacity-70 sw-1250:text-start text-center sw-360:text-[22px]">
          Thanks for looking Us!
        </p>
        <div className="h-8"></div>
        <p className="font-open-sans font-semibold opacity-60 sm:text-[16px] sw-1250:text-[14px] sw-360:text-[12px] ">
          I'm David Leiter, the guy behind this website. I'm an American who's
          been traveling the world full time for 8 years now.
          <br />
          <br /> I started this travel blog in 2019 to document my own
          international trips, share my photos, and help others learn how to
          travel the world and find some really good spots off the beaten path.
          <br />
          <br />
          I'm currently based in Bali, Indonesia, where I met my wife Intan,
          who’s a Bali local. Now she joins me on these wild and crazy
          adventures too.
          <br />
          <br /> Together, we've done some bucket list hikes, climbed
          active volcanoes, seen exotic wildlife, and visited some spectacular
          castles, temples, and monuments around the world. <br />
          <br />
          I've worked with and been featured by BBC Travel, NBC News, Time, and
          other companies.
          <br />
          <br /> I haven’t been everywhere, but it’s on my list. I hope this
          world travel blog can help and inspire you in your own journeys as
          well!
        </p>
        {isButton ? (
          <button className="border-solid border-2 p-1 border-slate-400 font-open-sans mt-10 hover:bg-slate-800 hover:text-white transition duration-300 text-[14px]">
            Read More...
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Thanks;
