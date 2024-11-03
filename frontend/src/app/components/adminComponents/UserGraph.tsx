"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { UsersIcon, MousePointerClickIcon, ShoppingCartIcon, PackageIcon } from "lucide-react";
import { fetchUserCounts, fetchAppointmentCount } from "@/app/utils/api";
import { motion } from "framer-motion";

interface ChartData {
  name: string;
  value: number;
}

interface UserCounts {
  totalUsers: number;
  totalPatients: number;
  totalDoctors: number;
}

export default function UserGraph() {
  const [userCounts, setUserCounts] = useState<UserCounts | null>(null);
  const [appointmentCount, setAppointmentCount] = useState<number>(0);
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCounts = async () => {
      try {
        const userData = await fetchUserCounts();
        const appointmentData = await fetchAppointmentCount();
        setUserCounts(userData);
        setAppointmentCount(appointmentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getCounts();
  }, []);

  useEffect(() => {
    if (!loading && userCounts) {
      const chartData: ChartData[] = [
        { name: " Users", value: userCounts?.totalUsers || 0 },
        { name: " Patients", value: userCounts?.totalPatients || 0 },
        { name: " Doctors", value: userCounts?.totalDoctors || 0 },
        { name: " Appointments", value: appointmentCount || 0 },
      ];
      setData(chartData);
    }
  }, [userCounts, appointmentCount, loading]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
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
      <Card className="w-full max-w-lg mx-auto pb-5">
        <motion.div variants={itemVariants}>
          <CardContent className="mt-5">
            <motion.div
              className="h-auto w-full bg-slate-950 rounded-lg p-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ChartContainer config={{ value: { label: "Value", color: "white" } }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <Bar dataKey="value" fill="white" radius={[4, 4, 0, 0]} barSize={10} />
                    <XAxis dataKey="name" stroke="white" axisLine={false} tickLine={false} tick={{fontSize: '12px'}} />
                    <YAxis stroke="white" axisLine={false} tickLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </motion.div>
          </CardContent>
        </motion.div>

        <motion.div variants={itemVariants} className="px-4">
          <div className="flex flex-col md:ml-6 items-center sm:items-start">
            <span className="text-lg font-bold text-black">Active Users</span>
            <motion.span
              className="text-xs text-green-500 font-semibold"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              (+23)
              <span className="text-gray-400 ml-1">than last week</span>
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 px-4 md:ml-10 items-center justify-center"
          variants={containerVariants}
        >
          {[
            { label: "Users", value: userCounts?.totalUsers?.toLocaleString() || "0", icon: UsersIcon },
            { label: "Patients", value: userCounts?.totalPatients?.toLocaleString() || "0", icon: MousePointerClickIcon },
            { label: "Doctors", value: userCounts?.totalDoctors?.toLocaleString() || "0", icon: ShoppingCartIcon },
            { label: "Appointments", value: appointmentCount.toLocaleString() || "0", icon: PackageIcon },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center sm:items-start"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="rounded-full bg-teal-100 p-2 mb-2"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <item.icon className="h-5 w-5 text-teal-600" />
              </motion.div>
              <span className="text-xs text-gray-400 md:text-sm">{item.label}</span>
              <motion.span
                className="text-sm font-semibold text-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {item.value}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </Card>
    </motion.div>
  );
}