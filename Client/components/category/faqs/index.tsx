import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faqs = () => {
  return (
    <div className="px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-20 bg-[#FCF8F6]">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#252525] tracking-wide">
        Questions about medical fundraising on HelpNest
      </h2>
      <div className="mt-10">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:text-xl">
              What is HelpNest?
            </AccordionTrigger>
            <AccordionContent className="md:text-lg">
              <p>
                HelpNest is a platform that allows you to raise money for
                medical expenses, including copays, deductibles, and treatment
                costs.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:text-xl">
              How do I start a fundraiser on HelpNest?
            </AccordionTrigger>
            <AccordionContent className="md:text-lg">
              <p>
                To start a fundraiser, click on the "Start a Fundraiser" button
                on the homepage. You will be asked to provide some information
                about yourself and the person you are raising money for.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:text-xl">
              How do I donate to a fundraiser on HelpNest?
            </AccordionTrigger>
            <AccordionContent className="md:text-lg">
              <p>
                To donate to a fundraiser, click on the "Donate" button on the
                fundraiser's page. You will be asked to provide some information
                about yourself and the amount you would like to donate.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:text-xl">
              How do I withdraw funds from a fundraiser on HelpNest?
            </AccordionTrigger>
            <AccordionContent className="md:text-lg">
              <p>
                To withdraw funds from a fundraiser, click on the "Withdraw
                Funds" button on the fundraiser's page. You will be asked to
                provide some information about yourself and the amount you would
                like to withdraw.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Faqs;
