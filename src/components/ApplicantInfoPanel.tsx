import { Checkbox } from "antd";
import { useState, useEffect } from "react";

type ApplicationInfoPanelProps = {
  filteredUsersData: {
    id: number;
    name: string;
    location: string;
    education: string;
    university: string;
    study_period: string | number;
    experience: number;
    status: string;
    applicationStatus: string;
    notes: string;
    tags: string[];
  }[];
};

type SelectCheckBox = {
  all: boolean;
  individual: number[];
};

type usersData = {
  id: number;
  name: string;
  location: string;
  education: string;
  university: string;
  study_period: string | number;
  experience: number;
  status: string;
  applicationStatus: string;
  notes: string;
  tags: string[];
}[];

const ApplicantInfoPanel = ({
  filteredUsersData,
}: ApplicationInfoPanelProps) => {
  const [filter, setFilter] = useState("Qualified");
  const [filteredData, setFilteredData] = useState<usersData>([]);
  const [select, setSelect] = useState<SelectCheckBox>({
    all: false,
    individual: [],
  });

  useEffect(() => {
    const userData = filteredUsersData.filter(
      (item) => item.applicationStatus === filter.toLowerCase()
    );
    setFilteredData(userData);
  }, [filteredUsersData, filter]);

  let count: {
    qualified: number;
    task: number;
    disqualified: number;
  } = {
    qualified: 0,
    task: 0,
    disqualified: 0,
  };

  filteredUsersData.forEach((item) => {
    if (item.applicationStatus === "qualified") {
      count = {
        qualified: count.qualified + 1,
        task: count.task,
        disqualified: count.disqualified,
      };
    } else if (item.applicationStatus === "disqualified") {
      count = {
        qualified: count.qualified,
        task: count.task,
        disqualified: count.disqualified + 1,
      };
    } else {
      count = {
        qualified: count.qualified,
        task: count.task + 1,
        disqualified: count.disqualified,
      };
    }
  });

  const handleSelectFilter = (value: string) => {
    setFilter(value);
  };

  return (
    <section className="application-info-panel">
      <div className="filter-checkbox">
        <div className="checkbox-wrapper">
          <Checkbox
            checked={select.all}
            onChange={(e) => {
              let copied = [...select.individual];
              if(e.target.checked){
                copied = filteredData.map((item) => item.id);
              }
              else{
                copied = [];
              }
              setSelect({
                ...select,
                all: e.target.checked,
                individual: copied,
              });
            }}
          />

          <span>{filteredUsersData.length} Candidates</span>
        </div>

        <div className="filter">
          <span
            onClick={() => handleSelectFilter("Qualified")}
            className={`${filter === "Qualified" && "selected-filter"}`}
          >
            Qualified {filter !== "Qualified" && count.qualified}
          </span>

          <span className="separator"></span>

          <span
            onClick={() => handleSelectFilter("Task")}
            className={`${filter === "Task" && "selected-filter"}`}
          >
            Task {filter !== "Task" && count.task}
          </span>

          <span className="separator"></span>

          <span
            onClick={() => handleSelectFilter("Disqualified")}
            className={`${filter === "Disqualified" && "selected-filter"}`}
          >
            Disqualified {filter !== "Disqualified" && count.disqualified}
          </span>
        </div>
      </div>

      <div className="user-info-card-wrapper">
        {filteredData.map((user) => {
          const firstName: string = user.name.split(" ")[0];
          const lastName: string = user.name.split(" ")[1];

          return (
            <div className="user-info-card">
              <Checkbox
                checked={select.individual.includes(user.id)}
                onChange={(e) => {
                  let copied = [...select.individual];
                  if (copied.includes(user.id)) {
                    copied = copied.filter((item) => item !== user.id);
                  } else {
                    copied = [...copied, user.id];
                  }
                  setSelect({
                    ...select,
                    individual: copied,
                  });
                }}
              />

              <p className="name">{firstName.charAt(0) + lastName.charAt(0)}</p>

              <div className="user-info">
                <h3>{user.name}</h3>

                <p className="location">{user.location}</p>

                <p className="education">
                  {user.education} - {user.university} ({user.study_period})
                </p>

                <p className="notes">{user.notes}</p>

                <p className="tags">
                  {user.tags.map((item) => (
                    <p key={item} className="tag">
                      {item}
                    </p>
                  ))}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ApplicantInfoPanel;
