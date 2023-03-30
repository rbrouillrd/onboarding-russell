import React from "react";

interface TabListProps {
  viewCompleted: boolean;
  displayCompleted: (status: boolean) => void;
}

const TabList: React.FC<TabListProps> = ({ viewCompleted, displayCompleted }) => {
  return (
    <div className="nav nav-tabs">
      <span
        onClick={() => displayCompleted(true)}
        className={viewCompleted ? "nav-link active" : "nav-link"}
      >
        Complete
      </span>
      <span
        onClick={() => displayCompleted(false)}
        className={viewCompleted ? "nav-link" : "nav-link active"}
      >
        Incomplete
      </span>
    </div>
  );
};

export default TabList;
