import {useState} from "react";
import { Input } from "antd";
import { filters } from "../constants";

type SearchAndFilterPanelProps = {
  getSearchedUsersData: (searchedText: string) => void;
}

const SearchAndFilterPanel = ({getSearchedUsersData}: SearchAndFilterPanelProps) => {
  const [inputData, setInputData] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getSearchedUsersData(inputData.toLowerCase());
    setInputData("");
  };

  return (
    <section className="search-filter-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="input-flex">
          <img src="/assets/icons/search.svg" alt="Search" />

          <Input
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            type="text"
            placeholder="Search by name, edu, exp or #tag"
            width={20}
            height={20}
          />

          <img
            src="/assets/icons/circle-warning.svg"
            alt="circle warning"
            width={20}
            height={20}
          />
        </div>
      </form>
      <div>
        <div className="filter-heading">
          <p>Filters</p>

          <p>0 Selected</p>
        </div>

        {filters.map((item) => (
          <div key={item.label} className={`filter-flex ${item.label === "Advanced Filter" && "no-border"}`}>
            <div>
              <img
                src={item.fileSrc}
                alt={item.fileAlt}
                width={16}
                height={16}
              />

              <p>{item.label}</p>
            </div>

            {item.label !== "Advanced Filter" && <img
              src={item.caretDownSrc}
              alt={item.caretDownAlt}
              width={18}
              height={18}
            />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchAndFilterPanel;
