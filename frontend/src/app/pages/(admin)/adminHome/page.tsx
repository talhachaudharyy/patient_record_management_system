import React from 'react';
import AnalyticCard from '@/app/components/adminComponents/AnalyticCard';
import UserGraph from '@/app/components/adminComponents/UserGraph';
import OverViewChart from '@/app/components/adminComponents/OverViewChart';

function AdminHome() {
  return (
    <div className="relative min-h-screen ">
      <div className="flex-1 ml-0 p-0 overflow-y-auto">
        <AnalyticCard />
        <div className="px-4 md:px-8 pb-0 bg-transparent">
          <div className="grid grid-cols-1 gap-4 my-5 md:grid-cols-2">
            <UserGraph />
            <OverViewChart />
          </div>
        </div>
        {/* Other content for the admin home page */}
      </div>
    </div>
  );
}

export default AdminHome;
