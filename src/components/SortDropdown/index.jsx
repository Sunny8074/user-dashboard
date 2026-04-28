import "./index.css";
import { useUsers } from "../../context/UserContext";

const SortDropdown = () => {
    const { filteredUsers, setFilteredUsers } = useUsers();

    const handleSort = (type) => {
        let sorted = [...filteredUsers];

        if (type === "asc") {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            sorted.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredUsers(sorted);
    };

    return (
        <div className="sort-container">
            <button className="sort-btn" onClick={() => handleSort("asc")}>
                A-Z
            </button>
            <button className="sort-btn" onClick={() => handleSort("desc")}>
                Z-A
            </button>
        </div>
    );
};

export default SortDropdown;