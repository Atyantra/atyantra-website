import ContourField from "./components/ContourField";
import HeroVideo from "./components/HeroVideo";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Operations from "./components/Operations";
import Control from "./components/Control";
import Closing from "./components/Closing";

export default function App() {
  return (
    <div className="relative">
      <ContourField />
      <HeroVideo />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Operations />
          <Control />
        </main>
        <Closing />
      </div>
    </div>
  );
}
