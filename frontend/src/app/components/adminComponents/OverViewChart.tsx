"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { motion } from "framer-motion";

const data = [
  { month: 'Jan', sales: 200, comparison: 450 },
  { month: 'Feb', sales: 220, comparison: 150 },
  { month: 'Mar', sales: 210, comparison: 180 },
  { month: 'Apr', sales: 350, comparison: 250 },
  { month: 'May', sales: 400, comparison: 220 },
  { month: 'Jun', sales: 450, comparison: 230 },
  { month: 'Jul', sales: 400, comparison: 250 },
  { month: 'Aug', sales: 350, comparison: 220 },
  { month: 'Sep', sales: 300, comparison: 180 },
  { month: 'Oct', sales: 350, comparison: 150 },
  { month: 'Nov', sales: 250, comparison: 180 },
  { month: 'Dec', sales: 420, comparison: 160 },
];

export default function SalesOverviewChart() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="w-full pb-10 max-w-lg sm:max-w-2xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-0">
          <motion.div variants={itemVariants}>
            <CardTitle className="text-lg font-semibold">
              Doctors overview
              <motion.span
                className="block text-sm font-normal text-gray-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-green-500 font-semibold">(+5) more</span> in 2021
              </motion.span>        
            </CardTitle>
          </motion.div>
        </CardHeader>

        <CardContent className="pt-4">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <ChartContainer 
              className="mt-10 sm:mt-20" 
              config={{
                sales: { label: "Sales", color: "hsl(0, 0%, 0%)" },
                comparison: { label: "Comparison", color: "hsl(180, 100%, 25%)" },
              }}
            >
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(180, 100%, 25%)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(180, 100%, 25%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis axisLine={false} tickLine={false} dataKey="month" className="text-xs text-muted-foreground" />
                  <YAxis axisLine={false} tickLine={false} className="text-xs text-muted-foreground" />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="comparison" 
                    stroke="hsl(0, 0%, 0%)" 
                    fillOpacity={0} 
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="hsl(180, 100%, 25%)" 
                    fillOpacity={1}
                    fill="url(#colorSales)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}