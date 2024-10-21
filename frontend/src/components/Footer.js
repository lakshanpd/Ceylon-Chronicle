import { AiOutlineHome } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";

function Footer() {
  return (
    <div className="w-full bottom-0 mt-32">
      <div className="bg-slate-500 w-full opacity-90 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 text-[17px] pb-5">
        <div className="hidden lg:flex flex-col pt-10 w-4/5 text-white text-opacity-90">
          <h1 className="pl-10 ">COMPANY NAME</h1>
          <p className=" text-justify mt-4 pl-10 text-[17px]">
            HealthBot plus envisions revolutionizing healthcare with AI,
            providing accessible, early disease detection and personalized
            treatment insights to improve patient outcomes and promote proactive
            health management globally.
          </p>
        </div>
        <div className="flex flex-col pt-10 w-4/5 text-white text-opacity-90">
          <h1 className="pl-10 sw-480:text-[17px] text-[16px]">
            HELPFUL LINKS
          </h1>
          <div className="mt-4 pl-10 lg:text-[17px] sw-480:text-[16px] text-[15px] flex flex-col">
            <a
              href="https://www.mayoclinic.org/diseases-conditions/melanoma/symptoms-causes/syc-20374884"
              className="hover:text-blue-300 lg:mb-4 mb-2"
            >
              About melanoma
            </a>
            <a
              href="https://my.clevelandclinic.org/health/diseases/21573-skin-diseases"
              className="hover:text-blue-300 lg:mb-4 mb-2"
            >
              Skin diseases
            </a>
            <a
              href="https://www.medicalnewstoday.com/articles/249141#types"
              className="hover:text-blue-300 lg:mb-4 mb-2"
            >
              Benign vs Malignant
            </a>
            <a
              href="https://www.dhs.wisconsin.gov/skin-infection/prevention-disinfection.htm"
              className="hover:text-blue-300 lg:mb-4 mb-2"
            >
              Skin disease prevention
            </a>
          </div>
        </div>
        <div className="hidden md:flex flex-col pt-10 w-4/5 text-white text-opacity-90">
          <h1 className="pl-10 sw-480:text-[17px] ">CONTACT</h1>
          <div className="mt-4 pl-10 flex flex-col lg:gap-5 gap-3 lg:text-[17px] sw-480:text-[16px] text-[15px]">
            <div className="flex gap-3">
              <div className="flex justify-center items-center">
                <AiOutlineHome size={22} />
              </div>
              <p>Colombo 07, Sri Lanka</p>
            </div>
            <div className="flex gap-3">
              <div className="flex justify-center items-center">
                <CiMail size={22} />
              </div>
              <p>info@gmail.com</p>
            </div>
            <div className="flex gap-3">
              <div className="flex justify-center items-center">
                <FiPhone size={22} />
              </div>
              <p>+01 234 567 88</p>
            </div>
            <div className="flex gap-3">
              <div className="flex justify-center items-center">
                <FiPhoneCall size={22} />
              </div>
              <p>+01 234 567 89</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-10 w-4/5 text-white text-opacity-90">
          <h1 className="pl-10 sw-480:text-[17px] text-[16px]">FOLLOW US</h1>
          <div className="mt-4 pl-10 grid md:grid-cols-2 grid-cols-3 w-40 md:gap-5 gap-8">
            <a href="" className="w-9 hover:cursor-pointer">
              <img src="/images/facebook.png" />
            </a>
            <a href="" className="w-9  hover:cursor-pointer">
              <img src="/images/twitter.png" />
            </a>
            <a href="" className="w-9  hover:cursor-pointer">
              <img src="/images/google.png" />
            </a>
            <a href="" className="w-9  hover:cursor-pointer">
              <img src="/images/instagram.png" />
            </a>
            <a href="" className="w-9  hover:cursor-pointer">
              <img src="/images/linkedin.png" />
            </a>
            <a href="" className="w-9  hover:cursor-pointer">
              <img src="/images/github.png" />
            </a>
          </div>
        </div>
      </div>
      <div className="w-full bg-slate-600 opacity-85 text-white text-opacity-80 flex justify-center items-center">
        <p className="p-5">© 2024 Copyright: HealthBot+</p>
      </div>
    </div>
  );
}

export default Footer;
