'use client';

import { useEffect, useState, useMemo } from 'react';
import { Heart, Sparkles, Clock } from 'lucide-react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRevealed, setIsRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [typed, setTyped] = useState("");

  // COUNTDOWN
  useEffect(() => {
    const targetDate = new Date("2026-01-13T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setIsRevealed(true);
        setShowConfetti(true);

        // TYPEWRITER EFFECT
        let i = 0;
        const text = "Happy Birthday Shubhi!";
        const typeInterval = setInterval(() => {
          setTyped(text.slice(0, i));
          i++;
          if (i > text.length) clearInterval(typeInterval);
        }, 80);

        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // RESPONSIVE ANIMATION COUNTS
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const heartCount = isMobile ? 8 : 15;
  const balloonCount = isMobile ? 3 : 7;
  const sparkleCount = isMobile ? 10 : 20;

  const hearts = useMemo(() =>
    [...Array(heartCount)].map((_, i) => (
      <div
        key={`heart-${i}`}
        className="absolute heart-animation text-rose-400 opacity-70"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${30 + Math.random() * 50}%`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      >
        <Heart className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" />
      </div>
    )),
  [isMobile]);

  const balloons = useMemo(() =>
    [...Array(balloonCount)].map((_, i) => (
      <div
        key={`balloon-${i}`}
        className="absolute balloon-animation text-3xl sm:text-4xl"
        style={{
          left: `${Math.random() * 100}%`,
          animationDuration: `${6 + Math.random() * 3}s`,
        }}
      >
        🎈
      </div>
    )),
  [isMobile]);

  const sparkles = useMemo(() =>
    [...Array(sparkleCount)].map((_, i) => (
      <div
        key={`spark-${i}`}
        className="absolute sparkle-animation text-yellow-400"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      >
        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
      </div>
    )),
  [isMobile]);

  const fireworks = useMemo(() =>
    [...Array(5)].map((_, i) => (
      <div
        key={`fw-${i}`}
        className="absolute firework-animation bg-yellow-300 rounded-full"
        style={{
          left: `${10 + Math.random() * 80}%`,
          top: `${20 + Math.random() * 40}%`,
          animationDelay: `${i * 1.1}s`,
        }}
      ></div>
    )),
  []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">

      {/* CONFETTI */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[60]">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 1.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="text-pink-400" size={isMobile ? 12 : 20} />
            </div>
          ))}
        </div>
      )}

      {isRevealed && (
        <>
          {hearts}
          {balloons}
          {sparkles}
          {fireworks}
        </>
      )}

      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-10 sm:py-16 min-h-screen flex items-center justify-center">
        <div className="max-w-3xl w-full">

          {!isRevealed ? (
            // COUNTDOWN
            <div className="text-center space-y-10 sm:space-y-12">

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Heart className="text-rose-500 w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                  <Sparkles className="text-yellow-500 w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                  <Heart className="text-rose-500 w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500">
                  Something Special
                </h1>

                <p className="text-xl sm:text-2xl font-medium text-gray-700">
                  is coming for
                </p>

                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-rose-600">
                  Shubhi Shukla
                </h2>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <p className="text-base sm:text-lg font-medium">Countdown to January 13th</p>
              </div>

              {/* COUNTDOWN BOXES */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-8 max-w-3xl mx-auto">
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Minutes' },
                  { value: timeLeft.seconds, label: 'Seconds' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 md:p-8 shadow-xl border border-pink-100"
                  >
                    <div className="text-2xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-rose-600 to-orange-500">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-[10px] sm:text-sm md:text-base font-medium text-gray-600 mt-1 sm:mt-2">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // REVEAL SECTION
            <div className="text-center space-y-6 sm:space-y-8">

              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Heart className="text-rose-500 w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
                <Sparkles className="text-yellow-500 w-6 h-6 sm:w-8 sm:h-8 animate-spin" />
                <Heart className="text-rose-500 w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 animate-glow">
                {typed}
              </h1>

              {/* MESSAGE CARD */}
              <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl border border-pink-100 text-left sm:text-[17px] text-[15px] leading-relaxed">

                <p className="font-medium text-gray-700 text-xl sm:text-2xl mb-3">
                  Dear Shubhi,
                </p>

                <p className="text-gray-600 mb-3">
                  I still can’t believe how someone can enter your life quietly… and then suddenly
                  become the most comforting part of it. When we first spoke back in November 2024,
                  I had no idea that destiny was bringing me a sister — not by blood, but by heart. 💖
                </p>

                <p className="text-gray-600 mb-3">
                  You didn’t just come into my life…
                  <span className="font-semibold text-rose-600"> you filled an empty space I never noticed before. </span>
                  Our bond wasn’t planned, it wasn’t forced — it just happened naturally.
                </p>

                <p className="text-gray-600 mb-3">
                  You’ve stood by me when I was confused, lifted me when I was low, protected me
                  when things went wrong, and believed in me when even I doubted myself.
                  <span className="font-semibold text-pink-600"> That’s what real sisters do. </span> ❤️
                </p>

                <p className="text-gray-600 mb-3">
                  Your presence brings calmness, clarity, and a type of joy that feels rare.
                </p>

                <p className="text-gray-600 mb-3">
                  <span className="font-bold text-rose-600">You are not just important — you are family.</span>
                  <br />
                  <span className="font-bold text-orange-500">You are not just special — you are irreplaceable.</span>
                </p>

                <p className="text-gray-600 mb-4">
                  Your kindness, strength, and maturity make you one of a kind.
                </p>

                <p className="text-xl sm:text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-500 my-4">
                  Happy Birthday, Shubhi! ✨  
                </p>

                <p className="text-gray-700 font-semibold text-right">
                  With love,<br />
                  Your brother from another mother 💝
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        @keyframes balloonUp {
          0% { transform: translateY(100vh); }
          100% { transform: translateY(-10vh); }
        }
        .balloon-animation {
          animation: balloonUp linear infinite;
        }

        @keyframes heartFloat {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-120px) scale(1.5); opacity: 0; }
        }
        .heart-animation {
          animation: heartFloat 4s ease-in-out infinite;
        }

        @keyframes sparkle {
          0% { transform: scale(0.5); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .sparkle-animation {
          animation: sparkle 3s ease-in-out infinite;
        }

        @keyframes firework {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        .firework-animation {
          width: 10px;
          height: 10px;
          animation: firework 1.5s ease-out forwards;
        }

        @keyframes glow {
          0%,100% { opacity: 1; }
          50% { opacity: .4; }
        }
        .animate-glow {
          animation: glow 2s infinite;
        }

        @keyframes fall {
          to { transform: translateY(100vh) rotate(360deg); }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
}
