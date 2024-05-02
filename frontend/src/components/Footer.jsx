import React from "react";

export default function Footer() {
  return (
    <div className="w-[100vw] h-[30vh]">
      <div className="h-[80%] grid grid-cols-4 gap-4 px-[15vw] py-10 bg-[#e7e8e8] text-gray-600">
        <div>
          <h1 className="text-xl font-bold my-3">DRIVEWISE</h1>
          <p className="text-lg font-light">
            South Australia Insurance Innovators: Transforming car insurance
            with AI technology for an enhanced customer experience.
          </p>
        </div>
        <div>
          <h1 className="text-xl font-bold my-3">SERVICES</h1>
          <a className="text-lg font-light">Reservation</a>
        </div>
        <div>
          <h1 className="text-xl font-bold my-3">USEFUL LINKS</h1>
          <a className="text-lg font-light">Help</a>
        </div>
        <div>
          <h1 className="text-xl font-bold my-3">CONTACT</h1>
          <p className="text-lg font-light">
            Adelaide, SA 5000, Australia <br />
            info@gmail.com <br />+ 61 234 567 88
          </p>
        </div>
      </div>
      <div className="h-[20%] flex justify-center items-center">
        <p>© 2024 Copyright: DriveWise</p>
      </div>
    </div>
  );
}
