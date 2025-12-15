import { Card, CardContent } from "./card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";
import { Pie, PieChart } from "recharts";

export function ChartPieDonut({
  correct,
  total,
}: {
  correct: number;
  total: number;
}) {
  // 🟢 Fix bad backend values
  const safeCorrect = Number.isFinite(correct) ? correct : 0;
  const safeTotal = Number.isFinite(total) && total > 0 ? total : 0;

  // 🟢 Everything not correct = wrong
  const wrong = Math.max(safeTotal - safeCorrect, 0);

  const chartData = [
    { label: "Correct", value: safeCorrect, fill: "rgb(16 185 129)" }, // emerald-500
    { label: "Wrong", value: wrong, fill: "rgb(239 68 68)" }, // red-500
  ];

  const chartConfig: ChartConfig = {
    correct: { label: "Correct", color: "rgb(16 185 129)" },
    wrong: { label: "Wrong", color: "rgb(239 68 68)" },
  };

  return (
    <Card className="flex flex-col w-64  mr-10 ">
      <CardContent className="flex-1 pt-7">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[260px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={70}
              outerRadius={100}
              strokeWidth={4}
            />
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="flex flex-col items-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3  bg-emerald-500" />
            Correct: {safeCorrect}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3  bg-red-500" />
            Wrong: {wrong}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
