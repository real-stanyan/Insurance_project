/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      backgroundImage: {
        home_bg: "url('/images/home_bg.jpeg')",
        day_time_bg: "url('/images/day_time.webp')",
        night_time_bg: "url('/images/night_time.webp')",
      },
    },
  },
  plugins: [],
};
