import LandingImg from "../../../public/LandingImg.png";
import { Button } from "../../components/ui/button";

const Home = () => {
  const cards = [
    {
      title: "Smart Tracking",
      info: "Automatically track and categorize expenses"
    },
    {
      title: "Real time insights",
      info: "Get real time insights about your spending"
    },
    {
      title: "Secure & Private",
      info: "High level security to keep your data safe"
    },
    {
      title: "Access Anywhere",
      info: "Use on any device, anytime, anywhere"
    },
  ]
  return (
    <div className="w-full min-h-screen px-2 py-4">
      <section className="w-full flex flex-col md:flex-row items-center md:items-start gap-5">
        <div className="flex-1 flex flex-col items-start gap-6 p-3">
          <div className=" w-full text-center md:text-left text-gray-800 flex-col gap-3 items-start font-medium text-3xl md:text-5xl">
            <h2>Track Expenses.</h2>
            <h2>Save More.</h2>
            <h2>Achieve Your Goals</h2>
          </div>

          <p className="text-lg font-medium md:text-left text-center text-gray-700">
            TrackSmart helps you take control of your with effotless tracking,
            smart insights and beautiful reports
          </p>
          <div className="w-full flex items-center justify-center gap-4">
            <Button className={"text-white bg-blue-600 flex-1 shadow-sm shadow-gray-300 hover:text-blue-600"} variant={"ghost"}>Get Started for Free</Button>
            <Button className={"text-blue-600 bg-white flex-1 shadow-sm shadow-gray-300 hover:bg-blue-600 hover:text-white"} variant={"ghost"}>View Demo</Button>
          </div>
        </div>
        <img
          src={LandingImg}
          alt=""
          className="w-130 px-3 py-2 "
          width={200}
          height={300}
        />
      </section>

      <section className="w-full mt-7 h-40 grid md:grid-cols-4 grid-cols-1 gap-4 px-5">
        {cards.map(card => (
          <div className="w-full flex flex-col gap-3 rounded-sm shadow-sm shadow-gray-400 items-start px-6 py-4" key={card.title}>
            <h2 className="text-lg font-medium">{card.title}</h2>
            <p className="font-medium">{card.info}</p>

          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
