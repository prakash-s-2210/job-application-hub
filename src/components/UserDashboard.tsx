import ApplicantInfoPanel from "./ApplicantInfoPanel";
import SearchAndFilterPanel from "./SearchAndFilterPanel";

type UserDashboardProps = {
  getSearchedUsersData: (searchedText: string) => void;
  filteredUsersData: { id: number; name: string; location: string; education: string; university: string; study_period: string | number; experience: number; status: string; applicationStatus: string; notes: string; tags: string[]; }[]
}

const UserDashboard = ({getSearchedUsersData, filteredUsersData}: UserDashboardProps) => {
  return (
    <section className="user-dashboard">
        <SearchAndFilterPanel getSearchedUsersData = {getSearchedUsersData} />
        
        <ApplicantInfoPanel filteredUsersData = {filteredUsersData} />
    </section>
  )
}

export default UserDashboard;