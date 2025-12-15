import Image from "next/image";
import FolderCode from "../../../../public/assets/icons/lucide/folder-code.svg";
import Brain from "../../../../public/assets/icons/lucide/brain.svg";
import Book from "../../../../public/assets/icons/lucide/book-open-check.svg";
import Ellipsis from "../../../../public/assets/icons/lucide/rectangle-ellipsis.png";

import Ball1 from "../../../../public/assets//icons/Racquetball_ball.svg";

export default function AuthLeftSide() {
  const list = [
    {
      icon: Brain,
      heading: "Tailored Diplomas",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
    {
      icon: Book,
      heading: "Focused Exams",
      description:
        "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
    },
    {
      icon: Ellipsis,
      heading: "Smart Multi-Step Forms",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
  ];

  return (
    <div className="relative w-[50%] h-full items-center justify-center bg-[rgba(239,246,255,0.75)]  text-blue-600 px-6 py-10 overflow-hidden">
      {/* 🌫 Blur Background Layer */}
      <div className="absolute inset-0 backdrop-blur-3xl z-0" />

      {/* 🎾 Background Ball - smaller */}
      <Image
        src={Ball1}
        alt="ball"
        className="absolute top-0 right-0 w-96 h-96 opacity-40 -z-10"
      />
      <Image
        src={Ball1}
        alt="ball"
        className="absolute bottom-0 left-0 w-96 h-96 opacity-40 -z-10"
      />

      <div className="flex flex-col  w-[458px] relative z-10 mx-auto">
        {/* Logo */}
        <div className="flex items-center mt-5">
          <Image src={FolderCode} alt="Logo" className="w-8 h-8 mr-2" />
          <h1 className="text-xl font-semibold">Exam App</h1>
        </div>

        {/* Heading */}
        <p className="text-gray-800 text-2xl font-bold mt-20 mb-12 font-inter ">
          Empower your learning journey with our smart exam platform.
        </p>

        {/* List */}
        <ul className="flex flex-col gap-6">
          {list.map((item, index) => (
            <li key={index} className="flex gap-3 items-start">
              <Image
                src={item.icon}
                alt={item.heading}
                className="w-9 h-9 border border-blue-600 p-2  mt-1"
              />
              <div className="ms-2">
                <h2 className="font-semibold text-xl mb-5 translate-y-1">
                  {item.heading}
                </h2>
                <p className="text-gray-700 text-md  w-full">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
