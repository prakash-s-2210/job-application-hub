import { useState } from "react";
import { applicantsInfo, statuses, userStatsToolbar } from "../constants";
import { Select } from "antd";

type UserStatsToolbarProps = {
  getSelectedOption: (value: string) =>  void;
}

const UserStatsToolbar = ({getSelectedOption}: UserStatsToolbarProps) => {
  const [dropdownValue, setDropdownValue] = useState<string>("Opportunity browsing");

  const statusCounts:any = {};
  applicantsInfo.applicants.forEach((user) => {
    const userStatus = user.status;
    if (statusCounts[userStatus]) {
      statusCounts[userStatus]++;
    } else {
      statusCounts[userStatus] = 1;
    }
  });
  
  const statusCountArray = statuses.map((status) => ({
    status,
    count: statusCounts[status] || 0, 
  }));

  return (
    <section className="user-stats-toolbar">
      <div>
        <h3>{applicantsInfo.internship_name}</h3>

        <p>{applicantsInfo.location}</p>
      </div>

      <div>
        <Select
          value={dropdownValue}
          size="large"
          placeholder="in (sec/min)"
          onChange={(value) => {
            setDropdownValue(value.slice(0, 1).toLocaleUpperCase()+value.slice(1));
            getSelectedOption(value);
          }}
          options={statusCountArray.map((item) => {
            return (
                { value: item.status, label: <>
                    <div>{item.status.slice(0, 1).toLocaleUpperCase()+item.status.slice(1)}</div> 
                    <div>{item.count}</div>
                    </> }  
                );
          })}
        />

        <div>
            {userStatsToolbar.map((item) => (
                <img key={item.alt} className="toolbar" src={item.src} alt={item.alt} />
            ))}

            <img src="/assets/icons/line.svg" alt="line" style={{margin: "auto 0"}} />

            <div className="video">
                <p>Move To Video Interview</p>

                <img src="/assets/icons/expand-more.svg" alt="expand more" />
            </div>
        </div>
      </div>
    </section>
  );
};

export default UserStatsToolbar;
