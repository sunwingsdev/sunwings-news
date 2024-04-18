import { Helmet } from "react-helmet-async";

const SetupTutorial = () => {
  return (
    <div>
      <Helmet>
        <title>Sunwings | Setup tutorial</title>
      </Helmet>
      <h1 className="text-black text-2xl mb-6">Setup tutorial</h1>
      <div>
        <iframe
          src="https://www.youtube.com/embed/S7lBI05wzec?si=MdwzXViV9lI0VJ3k"
          className="w-[95%] h-72 md:w-[98%] md:h-96 lg:w-[95%] lg:h-[35rem] xl:w-[90%] xl:h-[35rem] 2xl:w-[85%] 2xl:h-[35rem]"
        ></iframe>
      </div>
    </div>
  );
};

export default SetupTutorial;
