'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  count: {
    label: 'Respostas',
    color: 'hsl(var(--chart-1))',
  },
}; //satisfies ChartConfig

export function RepliesBarChart({ data, trendPercentage }) {
  // Number of replies sent over time.
  // TODO: Capture replies so you can have data to build a chart.
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Quantas respostas foram enviadas através da plataforma ao longo do
          tempo?
        </CardTitle>
        <CardDescription>Julho - Dezembro 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 25,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {trendPercentage !== 0 && (
          <div className="flex gap-2 font-medium leading-none">
            {trendPercentage > 0 ? 'Trending up' : 'Trending down'} by{' '}
            {Math.abs(trendPercentage).toFixed(1)}% this month
            {trendPercentage > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          As respostas ainda não estão a ser capturadas.
        </div>
      </CardFooter>
    </Card>
  );
}
