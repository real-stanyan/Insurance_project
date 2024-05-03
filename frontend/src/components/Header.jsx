export default function Header() {
  return (
    <div className="flex items-center justify-between bg-[#0d6efd] w-[100vw] h-[10vh] px-10">
      <div className="flex items-center justify-between w-[30%] text-xl">
        <img
          src="https://i.postimg.cc/ncrPrGmn/logo.png"
          alt="header logo"
          className="w-[40%]"
        />
        <p className="text-[white] opacity-50 hover:opacity-100 active:opacity-100 cursor-pointer">
          Home
        </p>
        <p className="text-[white] opacity-50 hover:opacity-100 active:opacity-100 cursor-pointer">
          Reservation
        </p>
        <p className="text-[white] opacity-50 hover:opacity-100 active:opacity-100 cursor-pointer">
          About
        </p>
      </div>
    </div>
  );
}
