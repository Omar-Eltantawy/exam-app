import { Diploma } from "@/lib/types/diplomas";
import Image from "next/image";
import { Card } from "@/components/ui/card";

type DiplomaCardProps = {
  diploma: Diploma;
};

export default function DiplomaCard({ diploma }: DiplomaCardProps) {
  return (
    <Card key={diploma?._id} className="relative rounded-none cursor-pointer ">
      <div className="h-[310px] w-[350px]">
        <Image
          src={diploma?.icon}
          alt={diploma?.name}
          width={350}
          height={310}
          className="object-cover w-full h-full "
        />
      </div>
      <div className="absolute bottom-1 left-1 right-1   bg-[#155DFC80] bg-opacity-80 text-white  py-3 ps-5 font-semibold w-[92.5%]">
        {diploma?.name}
      </div>
    </Card>
  );
}
