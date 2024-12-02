import React from "react";
import Card from "@/components/card";
import { Fundraiser } from "@/types";

const Grid = ({
  title,
  fundraisers,
}: {
  title: string;
  fundraisers: Fundraiser[];
}) => {
  return (
    <div className="px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-10 md:py-20">
      <h2 className="text-xl font-semibold">{title}</h2>
      {fundraisers.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <p className="text-center mt-5 text-gray-500">No fundraisers found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {fundraisers.map((fundraiser) => (
            <Card
              key={fundraiser.id}
              image={fundraiser.image}
              title={fundraiser.title}
              donations={fundraiser.donations.length}
              totalAmount={fundraiser.totalAmount}
              amountRaised={fundraiser.amountRaised}
              href={`/categories/${fundraiser.category}/${fundraiser.id}`}
              status={fundraiser.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Grid;
