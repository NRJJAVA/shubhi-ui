'use client';

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const targetDate = new Date('2026-01-13T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsRevealed(true);
        setShowConfetti(true);
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <Sparkles
                className="text-pink-400"
                size={16 + Math.random() * 16}
              />
            </div>
          ))}
        </div>
      )}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(251,207,232,0.3),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(254,240,138,0.2),transparent_50%)]"></div>

      <div className="relative z-10 container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl w-full">
          {!isRevealed ? (
            <div className="text-center space-y-12 animate-in fade-in duration-1000">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Heart className="text-rose-500 w-8 h-8 animate-pulse" />
                  <Sparkles className="text-yellow-500 w-6 h-6 animate-pulse" />
                  <Heart className="text-rose-500 w-8 h-8 animate-pulse" />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 animate-in slide-in-from-top duration-1000">
                  Something Special
                </h1>
                <p className="text-2xl md:text-3xl font-medium text-gray-700 animate-in slide-in-from-bottom duration-1000 delay-200">
                  is coming for
                </p>
                <h2 className="text-4xl md:text-6xl font-bold text-rose-600 animate-in slide-in-from-bottom duration-1000 delay-300">
                  Shubhi Shukla
                </h2>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-600 animate-in fade-in duration-1000 delay-500">
                <Clock className="w-5 h-5" />
                <p className="text-lg font-medium">Countdown to January 13th</p>
              </div>

              <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto animate-in slide-in-from-bottom duration-1000 delay-700">
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Minutes' },
                  { value: timeLeft.seconds, label: 'Seconds' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-pink-100 transform hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-rose-600 to-orange-500">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm md:text-base font-medium text-gray-600 mt-2">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 animate-pulse">
                <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-8 animate-in fade-in zoom-in duration-1000">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Heart className="text-rose-500 w-10 h-10 animate-bounce" />
                  <Sparkles className="text-yellow-500 w-8 h-8 animate-spin" />
                  <Heart className="text-rose-500 w-10 h-10 animate-bounce" />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 mb-4">
                  Happy Birthday
                </h1>
                <h2 className="text-4xl md:text-6xl font-bold text-rose-600 mb-8">
                  Shubhi! 🎂
                </h2>
              </div>

              <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-100">
                <div className="space-y-6 text-left">
                  <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-medium">
                    Dear Shubhi,
                  </p>

                  <p className="text-lg md:text-xl leading-relaxed text-gray-600">
                    Who would have thought that a simple doubt-clearing session in November 2024
                    would turn into one of the most meaningful connections of my life?
                  </p>

                  <p className="text-lg md:text-xl leading-relaxed text-gray-600">
                    You walked into my life as a stranger asking questions, and now you're
                    woven into everything I do. From a casual acquaintance to becoming my pillar
                    of support, you've proven that the best relationships often start in the most
                    unexpected ways.
                  </p>

                  <p className="text-lg md:text-xl leading-relaxed text-gray-600">
                    Your constant support, your belief in me, and your presence in both my
                    victories and struggles have meant more than words can express. You've been
                    there through it all, and for that, I'm eternally grateful.
                  </p>

                  <p className="text-lg md:text-xl leading-relaxed text-gray-600">
                    On this special day, I want you to know that you're not just a friend,
                    you're family. Thank you for being my constant, my support system, and my
                    inspiration.
                  </p>

                  <p className="text-xl md:text-2xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-500 font-bold text-center pt-4">
                    Here's to celebrating you today and always!
                    May this year bring you endless joy, success, and all the happiness
                    you deserve. ✨
                  </p>

                  <p className="text-lg md:text-xl leading-relaxed text-gray-700 font-semibold text-right pt-4">
                    With love and gratitude,<br />
                    Your brother from another mother 💝
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-6">
                <Heart className="text-rose-500 w-6 h-6 animate-pulse" fill="currentColor" />
                <Heart className="text-pink-500 w-8 h-8 animate-pulse" fill="currentColor" />
                <Heart className="text-orange-500 w-6 h-6 animate-pulse" fill="currentColor" />
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
}
