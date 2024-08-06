import dayjs from "dayjs";
import { useFileContext } from "../Context/FileContext";
import DropdownMenu from "./UI/Dropdown";
import Searchbar from "./UI/Searchbar";
import { useState } from "react";
import { Button } from "antd";

function FilterOptions() {
  const { allFiles, setFilteredFiles, filteredFiles } = useFileContext();
  const [showReset, setShowReset] = useState(false);

  const filterBySearch = (value) => {
    const filtered = allFiles?.filter((file) =>
      file.name.toLowerCase().includes(value.toLowerCase())
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    setFilteredFiles(filtered);
    setShowReset(true);
  };

  const sortByValue = (value) => {
    let sorted;
    if (value === "alphabet") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      sorted = [...allFiles].sort();
    } else if (value === "date") {
      sorted = [...allFiles].sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    }
    setFilteredFiles(sorted);
  };
  const resetSearch = () => {
    setShowReset(false);
    filterBySearch("");
  };
  return (
    <div className="wrapper">
      <div className="w-full filter-options-container flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="search-input flex gap-1">
          <Searchbar
            placeholder="Search Files"
            onSearch={(value) => filterBySearch(value)}
            status={
              filteredFiles?.length && filteredFiles?.length > 0
                ? ""
                : "warning"
            }
          />
          {showReset && (
            <Button onClick={resetSearch} className="search-result">
              Reset results
            </Button>
          )}
        </div>
        <div className="filter-by">
          <DropdownMenu
            items={[
              { label: "Date", key: "date" },
              { label: "Alphabet", key: "alphabet" },
            ]}
            onClick={(e) => sortByValue(e.key)}
            title="Sort By"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterOptions;
