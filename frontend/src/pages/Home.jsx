import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "500px",
  height: "300px",
};

const center = {
  lat: -34.88324506216066,
  lng: 138.59051614470803,
};

export default function Home() {
  return (
    <>
      {/* 1 */}
      <div className="w-[100vw] h-[90vh] flex flex-col justify-center items-center bg-home_bg bg-cover p-10 text-[black]">
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
        <div>
          <LoadScript
            googleMapsApiKey="AIzaSyBzhFxMyry53A027xF9edMUyTuBgNoO378" // 替换成你的API Key
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              {/* 子组件，如标记（Markers）和信息窗（Info Windows） */}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </>
  );
}
