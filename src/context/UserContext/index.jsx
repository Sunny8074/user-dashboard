import { createContext, useContext, useEffect, useState } from "react";
import { fetchUsers } from "../../services";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
                setFilteredUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    return (
        <UserContext.Provider
            value={{
                users,
                filteredUsers,
                setFilteredUsers,
                loading,
                error,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => useContext(UserContext);