import Search from "antd/es/input/Search";

function Searchbar({
  placeholder,
  onSearch,
  onChange,
  status,
}: {
  placeholder: string;
  onSearch: (e) => void;
  onChange?: (e) => void;
  status: "warning" | "error" | undefined | "";
}) {
  return (
    <div>
      <Search
        onChange={(e) => onChange && onChange(e)}
        placeholder={placeholder}
        onSearch={(e) => onSearch(e)}
        status={status}
        allowClear={true}
      />
    </div>
  );
}

export default Searchbar;
