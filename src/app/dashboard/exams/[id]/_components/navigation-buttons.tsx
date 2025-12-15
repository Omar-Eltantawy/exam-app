import React from "react";
import TimerProgress from "./timer-progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onPrev: () => void;
  onNext: () => void;
  disablePrev: boolean;
  disableNext: boolean;
  isLast?: boolean;
  isSubmitting?: boolean;
  timerProgress: number;
  formatTime: (s: number) => string;
  timeLeft: number;
};

export default function NavigationButtons({
  onPrev,
  onNext,
  disablePrev,
  isLast = false,
  isSubmitting = false,
  timerProgress,
  formatTime,
  timeLeft,
}: Props) {
  return (
    <div className="flex justify-between items-center mt-6">
      <Button
        variant={"secondary"}
        onClick={onPrev}
        disabled={disablePrev}
        className="flex items-center justify-center w-[45%] h-14  p-2 text-lg"
      >
        <ChevronLeft /> Previous
      </Button>
      <TimerProgress
        timerProgress={timerProgress}
        formatTime={formatTime}
        timeLeft={timeLeft}
      />
      <Button
        onClick={onNext}
        disabled={isSubmitting}
        className="flex items-center justify-center w-[45%] h-14  p-2 text-lg"
      >
        {isSubmitting ? (
          "Submitting..."
        ) : isLast ? (
          "Submit"
        ) : (
          <>
            Next <ChevronRight />
          </>
        )}
      </Button>
    </div>
  );
}
