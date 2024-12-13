import React from "react";
import { Navbar } from "./_components/navbar";

const MarketingLayout = ({
  children
}: {
  children: React.ReactNode
})  => {
  return ( 
    // Tutorial put dark:bg-[#1f1f1f] but I think that's too light for my liking
    <div className="h-full">
      <Navbar/>
      <main className="h-full pt-40">
        {children}
      </main>
    </div>
   );
}
 
export default MarketingLayout;