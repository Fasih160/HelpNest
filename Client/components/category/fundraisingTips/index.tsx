import React from "react";

const FundraisingTips = () => {
  return (
    <div className="py-20 px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-wide text-center mb-12">
        Tips for your fundraiser on HelpNest
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#FCF8F6] p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4 text-gray-600">
            <span>“</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Add details to build trust
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Your fundraiser story connects you with potential donors. Provide
            the details about the medical challenge (where comfortable) and what
            you or your loved one need. Detailing your need resonates more with
            donors, and we recommend you include estimated costs or details of
            what you’re raising money for.
          </p>
        </div>

        <div className="bg-[#FCF8F6] p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4 text-gray-600">
            <span>👥</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Lean on friends and family first
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Before you share your fundraiser broadly with your social media
            networks, consider first asking a few of your closest friends or
            family members to help you get started by making a donation and
            adding words of encouragement. You can even add them as a team
            member to help you manage the fundraiser.
          </p>
        </div>

        <div className="bg-[#FCF8F6] p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4 text-gray-600">
            <span>🗓️</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Consistency is key
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Most people are more likely to donate to a fundraiser that has
            regular updates. Share your progress, thank your supporters, and
            keep everyone informed throughout your fundraising journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundraisingTips;
