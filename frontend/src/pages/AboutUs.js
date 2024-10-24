import Thanks from "../components/home/Thanks";

function AboutUs() {
  return (
    <div className="mt-40 flex justify-center">
      <div className="w-[75vw] flex justify-center">
        <Thanks isButton={false} />
      </div>
    </div>
  );
}

export default AboutUs;
