// import { Card } from "@/components/ui/card";
// import { Exam } from "@/lib/types/exams";
// import { Timer } from "lucide-react";
// import React from "react";

// type ExamCardProps = {
//   exam: Exam;
// };
// export default function ExamCard({ exam }: ExamCardProps) {
//   return (
//     <Card
//       className="w-full h-20 flex flex-col p-4 gap-2 border-none bg-blue-50"
//       key={exam?._id}
//     >
//       {/* exam info */}
//       <div className="flex-1 flex justify-between items-center">
//         <div>
//           <h3 className="text-xl font-bold text-blue-600">{exam?.title}</h3>
//           <p className="text-gray-500 text-sm">
//             Questions: {exam?.numberOfQuestions}
//           </p>
//         </div>
//         <div className="text-gray-800 flex gap-2">
//           <Timer size={20} className="text-gray-500" />
//           <span className="font-semibold">Duration:</span>
//           {exam?.duration} min
//         </div>
//       </div>
//     </Card>
//   );
// }

import { Card } from "@/components/ui/card";
import { Exam } from "@/lib/types/exams";
import { Timer } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

type ExamCardProps = {
  exam: Exam;
};

export default function ExamCard({ exam }: ExamCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/exams/${exam._id}`);
  };

  return (
    <Card
      className="w-full h-20 flex flex-col p-4 gap-2 border-none bg-blue-50 cursor-pointer hover:shadow-md transition"
      key={exam?._id}
      onClick={handleClick}
    >
      {/* exam info */}
      <div className="flex-1 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-blue-600">{exam?.title}</h3>
          <p className="text-gray-500 text-sm">
            Questions: {exam?.numberOfQuestions}
          </p>
        </div>
        <div className="text-gray-800 flex gap-2 items-center">
          <Timer size={20} className="text-gray-500" />
          <span className="font-semibold">Duration:</span>
          {exam?.duration} min
        </div>
      </div>
    </Card>
  );
}
