import gsap from "gsap";
import { heroVideo, smallHeroVideo } from "../utils";
import { useEffect, useState } from "react";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );
  const [ctaStyle, setCtaStyle] = useState({
    opacity: 0,
    transform: "translateY(30px)",
    transition: "opacity 1s ease, transform 1s ease",
  });

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);

    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  }, []);

  useEffect(() => {
    gsap.to("#hero", { opacity: 1, delay: 2 });

    setTimeout(() => {
      setCtaStyle({
        opacity: 1,
        transform: "translateY(0)",
        transition: "opacity 1s ease, transform 1s ease",
      });
    }, 2000);
  }, []);

  return (
    <section className="relative w-full bg-black nav-height">
      <div className="flex-col w-full h-5/6 flex-center">
        <p id="hero" className="hero-title">
          iPhone 15 Pro
        </p>
        <div className="w-9/12 md:w-10/12">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div id="cta" className="flex flex-col items-center" style={ctaStyle}>
        <a
          href="#highlights"
          className="w-16 p-2 text-center no-underline transition-colors duration-300 border-2 border-transparent text-slate-300 bg-blue rounded-3xl hover:bg-black hover:border-slate-300"
        >
          Buy
        </a>
        <p className="pt-3 text-xl font-normal text-slate-300">
          From $199/month or $999
        </p>
      </div>
    </section>
  );
};

export default Hero;
