import './App.css';
import {useState} from "react";
import { applicantsInfo } from './constants';
import { message } from 'antd';
import Sidebar from './components/Sidebar';
import UserDashboard from './components/UserDashboard';
import UserStatsToolbar from './components/UserStatsToolbar';

function App() {
  const [filteredUsersData, setFilteredUsersData] = useState(() => {
    const copied = [...applicantsInfo.applicants];
    const filtered = copied.filter((item) => item.status === "opportunity browsing");
    return filtered;
  });

  const getSelectedOption = (value: string) => {
    const copied = [...applicantsInfo.applicants];
    const filtered = copied.filter((item) => item.status === value);
    setFilteredUsersData([...filtered]);
  };

  const getSearchedUsersData = (searchedText: string) => {
    const copied = [...filteredUsersData];
    const filteredData = copied.filter((item) => item.name.toLowerCase().includes(searchedText) || item.education.toLowerCase().includes(searchedText) || item.experience === parseInt(searchedText) || item.tags.some(item => item.toLowerCase() === searchedText));
    if(filteredData.length === 0){
      message.error("No results found.");
      return;
    }
    setFilteredUsersData([...filteredData]);
  }

  return (
    <main className='home'>
      <Sidebar />

      <div className='user-overview'>
        <UserStatsToolbar getSelectedOption = {getSelectedOption} />

        <UserDashboard getSearchedUsersData = {getSearchedUsersData} filteredUsersData = {filteredUsersData} />
      </div>
    </main>
  );
}

export default App;
