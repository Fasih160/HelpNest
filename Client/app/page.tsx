import About from "@/components/home/about";
import Discover from "@/components/home/discover";
import Hero from "@/components/home/hero";
import Video from "@/components/home/video";
import React from "react";
import Faqs from "@/components/category/faqs";
import WhySetup from "@/components/category/whySetup";
import FundraisingTips from "@/components/category/fundraisingTips";

const page = () => {
  return (
    <div className="bg-white">
      <Hero />
      <Discover />
      <About
        className="bg-[#F0FCE9] text-[#252525]"
        title="Fundraising with HelpNest is simple, effective, and reliable."
        description="Obtain the resources you need to ensure your fundraiser's success with HelpNest. Whether you're raising funds for yourself, friends, family, or charity, there are no fees to get started. HelpNest is the leading platform for crowdfunding – from memorial tributes and funerals to medical emergencies and charitable causes. Whenever you need assistance, you can find it here."
      />
      <Video />
      <About
        className="bg-[#012D19] text-white"
        title="We've got everything you need."
        description="HelpNest is a trusted leader in online fundraising. With straightforward pricing and a dedicated team of Trust & Safety experts supporting you, you can raise money or make a donation with complete confidence."
      />
      <WhySetup />
      <FundraisingTips />
      <Faqs />
    </div>
  );
};

export default page;
