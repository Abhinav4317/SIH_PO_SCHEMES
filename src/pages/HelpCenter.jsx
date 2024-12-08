import Header from "../components/Header";

const HelpCenter = () => {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center p-4 mt-32">
        <p className="text-xl font-bold font-serif mb-4">
          Watch the video below to learn how to navigate our website:
        </p>
        <div className="relative lg:w-4/5 aspect-w-16 aspect-h-9 flex items-center justify-center">
          <iframe
            width="1000"
            height="486"
            src="https://www.youtube.com/embed/zsp4jMthhVg"
            title="SIH 1760"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <div className="w-full flex gap-4 mt-10 justify-center">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">
              The following website has been developed by team BigO:
            </h1>
            <ul className="list-disc pl-5">
              <li>Pratham Upadhyay</li>
              <li>Tushar Singh</li>
              <li>Aditi Mishra</li>
              <li>Harsh Shivhare</li>
              <li>Abhinav Gangwar</li>
            </ul>
            <h2>
              under the mentorship of{" "}
              <span className="font-bold">Dr.Rekha Kaushik</span> and
              co-mentored by <span className="font-bold">Pratham Saraf</span>.
            </h2>
          </div>
          <div className="flex flex-col gap-2 border-l border-gray-500 pl-6">
            <h1>
              Connect with us through mail:
              <span className="font-bold">
                <a href="mailto:bigosih1760@gmail.com">bigosih1760@gmail.com</a>
              </span>
            </h1>
            <h1>
              Or through contact:
              <span className="font-bold">XXXX XXXX 41</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
