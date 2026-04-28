import "./index.css";
import { useUsers } from "../../context/UserContext";
import SearchBar from "../SearchBar";
import SortDropdown from "../SortDropdown";
import Loader from "../Loader";
import Error from "../Error";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import React from "react";

const Home = () => {
    const { filteredUsers, loading, error } = useUsers();
    const { theme, toggleTheme } = useTheme();

    const [page, setPage] = React.useState(1);
    const limit = 5;

    const start = (page - 1) * limit;
    const currentUsers = filteredUsers.slice(start, start + limit);
    const totalPages = Math.ceil(filteredUsers.length / limit);

    if (loading) return <Loader />;
    if (error) return <Error message={error} />;

    return (
        <div className="layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2 className="logo">Company</h2>
                <ul>
                    <li className="active">Dashboard</li>
                    <li>Users</li>
                    <li>Teams</li>
                    <li>Roles</li>
                    <li>Settings</li>
                </ul>
                <button className="theme-btn" onClick={toggleTheme}>
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>
            </aside>

            {/* Main */}
            <main className="main">
                <div className="card">
                    <h1>User Directory</h1>

                    {/* Controls */}
                    <div className="top-bar">
                        <SearchBar />
                        <SortDropdown />
                        <button className="add-btn">Add New User</button>
                    </div>

                    {/* Table */}
                    <div className="table-box">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>City</th>
                                    <th>Phone</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="no-users">
                                            No users found
                                        </td>
                                    </tr>
                                ) : (
                                    currentUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td className="name-cell">
                                                <div className="avatar"></div>
                                                {user.name}
                                            </td>
                                            <td>{user.email}</td>
                                            <td>{user.address.city}</td>
                                            <td>{user.phone}</td>
                                            <td>
                                                <Link to={`/user/${user.id}`}>
                                                    <button className="view-btn">View Profile</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="table-footer">
                        <span>
                            Showing {start + 1} to{" "}
                            {Math.min(start + limit, filteredUsers.length)} of{" "}
                            {filteredUsers.length} entries
                        </span>

                        <div className="pagination">
                            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={page === i + 1 ? "active-page" : ""}
                                    onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;