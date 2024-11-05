import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const CardBeritaSkeleton: React.FC = () => {
  return (
    <div className="col-12 col-lg-3 col-md-6">
      <div className="card item-port shadow-sm border-0 p-2">
        <Skeleton height={250} />
        <div className="px-3 pt-2 text-primary fw-medium">
          <Skeleton width={150} />
        </div>
        <div className="card-body">
          <div className="card-title h5 mb-1">
            <Skeleton width={100} />
          </div>
          <Skeleton count={3} />
        </div>
      </div>
    </div>
  );
};
