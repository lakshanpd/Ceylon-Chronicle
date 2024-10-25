import EmailForm from "../components/about-us/EmailForm";
import Thanks from "../components/home/Thanks";

function AboutUs() {
  return (
    <div className="mt-40 flex flex-col items-center">
      <div className="w-[75vw] flex justify-center">
        <Thanks isButton={false} />
      </div>
      <div className="mt-20 w-[40vw]">
        <EmailForm />
      </div>
    </div>
  );
}

export default AboutUs;
