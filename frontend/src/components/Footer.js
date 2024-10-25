import { AiOutlineHome } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";

function Footer() {
  return (
    <footer className="w-full">
      <div className="bg-slate-500 w-full opacity-90 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 text-[17px] pb-5">
        <div className="hidden lg:flex flex-col pt-10 w-4/5 text-white text-opacity-90">
          <h1 className="pl-10 ">CEYLON CHRONICLE</h1>
          <p className="text-justify mt-4 pl-10 text-[17px]">
            Share your travel memories and connect with fellow explorers! Post
            your adventures, view others' experiences, and engage with a vibrant
            community. Join us in celebrating the joy of travel!
          </p>
        </div>
        <div className="flex flex-col pt-10 w-4/5 text-white text-opacity-90">
          <h1 className="pl-10 sw-480:text-[17px] text-[16px]">
            HELPFUL LINKS
          </h1>
          <div className="mt-4 pl-10 lg:text-[17px] sw-480:text-[16px] text-[15px] flex flex-col">
            <a
              href="https://en.wikipedia.org/wiki/Galle"
              className="hover:text-blue-300 lg:mb-4 mb-2"
            >
              wikipedia / Galle
            </a>
            <a
              href="https://en.wikipedia.org/wiki/Kataragama"
              className="hover:text-blue-300 lg:mb-4 mb-2"
            >
              wikipedia / Katharagama
            </a>
            <a
              href="https://en.wikipedia.org/wiki/Sigiriya"
              className="hover:text-blue-300 lg:mb-4 mb-2"
            >
              wikipedia / Sigiriya
            </a>
            <a
              href="https://en.wikipedia.org/wiki/Colombo"
              className="hover:text-blue-300 lg:mb-4 mb-2"
            >
              wikipedia / Colombo
            </a>
          </div>
        </div>
        <div className="hidden md:flex flex-col pt-10 w-4/5 text-white text-opacity-90">
          <h1 className="pl-10 sw-480:text-[17px]">CONTACT</h1>
          <div className="mt-4 pl-10 flex flex-col lg:gap-5 gap-3 lg:text-[17px] sw-480:text-[16px] text-[15px]">
            <div className="flex gap-3">
              <AiOutlineHome size={22} />
              <p>Colombo 07, Sri Lanka</p>
            </div>
            <div className="flex gap-3">
              <CiMail size={22} />
              <p>info@gmail.com</p>
            </div>
            <div className="flex gap-3">
              <FiPhone size={22} />
              <p>+01 234 567 88</p>
            </div>
            <div className="flex gap-3">
              <FiPhoneCall size={22} />
              <p>+01 234 567 89</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-10 w-4/5 text-white text-opacity-90">
          <h1 className="pl-10 sw-480:text-[17px] text-[16px]">FOLLOW US</h1>
          <div className="mt-4 pl-10 grid md:grid-cols-2 grid-cols-3 w-40 md:gap-5 gap-8">
            <a href="#" className="w-9 hover:cursor-pointer">
              <img src="/images/facebook.png" alt="Facebook" />
            </a>
            <a href="#" className="w-9 hover:cursor-pointer">
              <img src="/images/twitter.png" alt="Twitter" />
            </a>
            <a href="#" className="w-9 hover:cursor-pointer">
              <img src="/images/google.png" alt="Google" />
            </a>
            <a href="#" className="w-9 hover:cursor-pointer">
              <img src="/images/instagram.png" alt="Instagram" />
            </a>
            <a href="#" className="w-9 hover:cursor-pointer">
              <img src="/images/linkedin.png" alt="LinkedIn" />
            </a>
            <a href="#" className="w-9 hover:cursor-pointer">
              <img src="/images/github.png" alt="GitHub" />
            </a>
          </div>
        </div>
      </div>
      <div className="w-full bg-slate-600 opacity-85 text-white text-opacity-80 flex justify-center items-center">
        <p className="p-5">© 2024 Copyright: HealthBot+</p>
      </div>
    </footer>
  );
}

export default Footer;
