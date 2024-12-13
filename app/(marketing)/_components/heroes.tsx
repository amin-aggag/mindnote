import Image from "next/image";
import { Footer, } from "./footer";

export const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      {/* Heroes */}
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] md:h-[400px] md:w-[400px]">
          <Image 
            src="/Hero_image_light.svg"
            fill
            className="object-contain"
            alt="Connections"
          />
          <Image 
            src="/Hero_image_dark.svg"
            fill
            className="object-contain hidden dark:block"
            alt="Connections"
          />
        </div>
      </div>
    </div>
  );
};