import { useEffect, useState } from "react";
import axios from "axios";

import { GoogleMap, LoadScript } from "@react-google-maps/api";

import { IoChatboxEllipses } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -34.88324506216066,
  lng: 138.59051614470803,
};

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [weather, setWeather] = useState({});
  const [chatSwitch, setChatSwitch] = useState(false);
  const [messages, setMessages] = useState([
    // { role: "user", content: "sda" },
    // { role: "assistant", content: "sda" },
    // { role: "user", content: "sda" },
    // { role: "assistant", content: "sda" },
    // { role: "user", content: "sda" },
  ]);
  const [userInput, setUserInput] = useState("");

  console.log(messages);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    const nowTime = new Date().getTime();
    console.log(nowTime);
    const res = await fetch(import.meta.env.VITE_OPEN_WEATHER_API);
    const data = await res.json();

    const sunriseTime = data.current.sunrise * 1000;
    const sunsetTime = data.current.sunset * 1000;

    const isDay = nowTime >= sunriseTime && nowTime <= sunsetTime;

    // Convert temperature from Kelvin to Celsius
    const tempC = data.current.temp - 273.15;

    // Temperature Score: Assuming ideal range is 15 to 25°C
    const tempScore = 100 - Math.min(Math.abs(tempC - 20), 20) * 5;

    // UV Index Score: Assuming lower is better
    const uviScore = 100 - data.current.uvi * 12.5; // Scale UV index so that UV index of 8 gives 0 score

    // Visibility Score: Assuming visibility of 10000m or more is ideal
    const visibilityScore = Math.min(data.current.visibility / 100, 100);

    // Humidity Score: Assuming lower humidity is better
    const humidityScore = 100 - data.current.humidity;

    // Calculate average score
    const suitabilityScore =
      (tempScore + uviScore + visibilityScore + humidityScore) / 4;

    setWeather({
      ...data.current,
      uvi_val: (200 - (data.current.uvi / 11) * 200).toString(),
      temp_val: (200 - ((data.current.temp - 273.15) / 60) * 200)
        .toFixed(1)
        .toString(),
      isDay: isDay,
      suitabilityScore: suitabilityScore.toFixed(2),
      timeZone: data.timezone,
    });
  };
  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput };
    setMessages([...messages, userMessage]); // Update local state to include new user message
    setUserInput("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [...messages, userMessage], // Include the updated conversation history
          max_tokens: 150,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
          },
        }
      );

      const botResponse = {
        role: "assistant",
        content: response.data.choices[0].message.content,
      };

      setMessages([...messages, userMessage, botResponse]); // Update the messages with both the new user and bot responses
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log(weather);

  return (
    <>
      {/* chat box */}
      {chatSwitch ? (
        <div className=" flex flex-col w-[500px] h-[500px] fixed bottom-5 right-10 bg-[#212121] z-50 border-4 border-[#494949] rounded-xl transition-all">
          <IoIosCloseCircleOutline
            className="text-[white] text-[40px] absolute top-2 right-2"
            onClick={() => {
              setChatSwitch(false);
            }}
          />
          <h1 className="w-[500px] min-h-[50px] text-center text-[20px] text-white font-bold mt-[10px]">
            Chat with us
          </h1>
          {/* chats area */}
          <div className="px-2 py-4">
            {messages.map((msg, i) =>
              msg.role == "user" ? (
                // user
                <div
                  key={i}
                  className="text-[white] flex items-center justify-self-end justify-end"
                >
                  <p className="p-2 border-2 border-[#494949] rounded-xl">
                    {msg.content}
                  </p>
                  <img
                    src="/images/user.png"
                    alt=""
                    className="w-[50px] h-[50px]"
                  />
                </div>
              ) : (
                // ai
                <div
                  key={i}
                  className="text-[white] flex items-center justify-start"
                >
                  <img
                    src="/images/chat_ai.png"
                    alt=""
                    className="min-w-[50px] min-h-[50px]"
                  />
                  <p className="p-2 border-2 border-[#494949] rounded-xl">
                    {msg.content}
                  </p>
                </div>
              )
            )}
          </div>
          {/* input area */}
          <div className="w-[500px] flex items-center mt-auto">
            <input
              type="text"
              className="w-full h-[50px] p-[10px] text-[20px]"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <IoSendSharp
              className="ml-[-35px] text-[20px]"
              onClick={sendMessage}
            />
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            setChatSwitch(true);
          }}
          className="w-[100px] h-[100px] bg-[#0050e6] rounded-full fixed bottom-5 right-10 z-50 flex justify-center items-center hover:w-[120px] hover:h-[120px] transition-all"
        >
          <IoChatboxEllipses className="text-[white] text-[50px]" />
        </div>
      )}

      {/* 1 */}
      <div className="max-w-[100vw] h-[90vh] flex flex-col justify-center items-center bg-home_bg bg-cover p-10 text-[black] overflow-hidden">
        <h1 className="text-[4vw] font-black">Welcome</h1>
        <p className="w-[70%] text-[1vw] font-medium">
          Harnessing advanced AI technology, we redefine the insurance
          landscape, offering unparalleled service and coverage. Our
          customer-centric approach ensures tailored solutions and exceptional
          support, setting new standards for car insurance in South Australia
          and beyond.
        </p>
      </div>
      {/* 2 */}
      <div className="flex flex-col text-center w-[100vw] min-h-[80vh] p-10 my-10">
        <h1 className="text-3xl font-bold my-[5vw]">
          You deserve better from your insurance company.
        </h1>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <img
              src="/images/home_1.avif"
              alt="home_1"
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold my-6">
              Protect Your Assets with Our Online AI Services
            </h1>
            <p className="text-xl font-light">
              Secure your assets with our AI-driven solutions. Proactive
              protection for peace of mind.
            </p>
          </div>
          <div>
            <img
              src="/images/home_2.avif"
              alt="home_2"
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold my-6">
              More attention during claims
            </h1>
            <p className="text-xl font-light">
              Secure your assets with our AI-driven solutions. Proactive
              protection for peace of mind.
            </p>
          </div>
          <div>
            <img
              src="/images/home_3.avif"
              alt="home_3"
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold my-6">
              More options in car insurances
            </h1>
            <p className="text-xl font-light">
              Regardless of your income level, we can assist you in initiating
              financial planning that remains with you as you grow.
            </p>
          </div>
        </div>
      </div>
      {/* 3 */}
      <div
        style={{
          backgroundImage: weather.isDay
            ? "url('/images/day_time.webp')"
            : "url('/images/night_time.webp')",
          backgroundSize: "cover", // 确保图片覆盖整个区域
          backgroundPosition: "center", // 图片居中显示
          backgroundRepeat: "no-repeat", // 不重复显示图片
        }}
        className="w-[100vw] min-h-[70vh] flex items-center justify-evenly relative"
      >
        <div className="text-white text-center text-4xl flex flex-col">
          <h1 className="font-black overflow-hidden mb-3">Suitability Score</h1>
          <p className="overflow-hidden font-light text-5xl">
            {weather.suitabilityScore}
          </p>
        </div>
        <div className="absolute text-white bottom-3 left-[35vw] w-[30vw] text-center text-3xl font-semibold">
          {weather.timeZone}
        </div>
        {/* temp */}
        <div className="absolute left-10 bottom-5">
          <div className="w-[60px] h-[260px] px-[10px]">
            <div className="w-[30px] h-[250px] bg-gradient-to-t from-blue-500 via-light-blue-500 via-green-400 yellow-400 orange-400 to-red-500 rounded-full border border-white"></div>
            <div
              className={`w-[50px] h-[50px] bg-white rounded-full absolute left-0 z-10`}
              style={{ top: `${parseFloat(weather.temp_val)}px` }}
            >
              <p className="flex justify-center items-center w-full h-full text-sm font-bold text-center">
                Temp:
                <br />
                {(weather.temp - 273.15).toFixed(1)}°C
              </p>
            </div>
          </div>
        </div>
        {/* uvi */}
        <div className="absolute right-10 bottom-5">
          <div className="w-[60px] h-[260px] px-[10px]">
            <div className="w-[30px] h-[250px] bg-gradient-to-t from-green-400 via-yellow-300 orange-400 via-red-500 to-purple-600 rounded-full border border-white"></div>
            <div
              className={`w-[50px] h-[50px] bg-white rounded-full absolute left-0 z-10`}
              style={{ top: `${parseFloat(weather.uvi_val)}px` }}
            >
              <p className="flex justify-center items-center w-full h-full text-sm font-bold text-center">
                uvi.
                <br />
                {weather.uvi}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 4 */}
      <div className="flex justify-around items-center w-[100vw] min-h-[50vh] my-10">
        <div className="w-[50%]">
          <h1 className="text-3xl font-semibold mb-4">Company</h1>
          <p className="text-xl font-light">
            DriveWise is a cutting-edge car insurance company based in South
            Australia. We are dedicated to providing our customers with a
            superior insurance experience through advanced AI technology and
            other high-tech solutions. With our innovative approach, we simplify
            the insurance process, enhance user experience, and ensure that our
            customers receive the best possible coverage. Our mission is to
            offer personalized, intelligent insurance solutions to every
            customer, ensuring peace of mind and satisfaction with every
            insurance transaction.
          </p>
        </div>
        <LoadScript googleMapsApiKey="AIzaSyBzhFxMyry53A027xF9edMUyTuBgNoO378">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            loading="async"
          >
            {/* 子组件如标记等 */}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}
