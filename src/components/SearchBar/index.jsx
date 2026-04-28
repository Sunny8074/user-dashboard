import { useUsers } from "../../context/UserContext";

const SearchBar = () => {
    const { users, setFilteredUsers } = useUsers();

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();

        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(value)
        );

        setFilteredUsers(filtered);
    };

    return (
        <input
            type="text"
            placeholder="Search users..."
            onChange={handleSearch}
            style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
        />
    );
};

export default SearchBar;