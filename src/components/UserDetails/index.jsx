import "./index.css";
import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../../context/UserContext";

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { users } = useUsers();

    const user = users.find((u) => u.id === Number(id));

    if (!user) return <p>User not found</p>;

    return (
        <div className="details-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
                Go Back
            </button>

            <h2>{user.name}</h2>
            <p className="detail-item">Email: {user.email}</p>
            <p className="detail-item">Phone: {user.phone}</p>
            <p className="detail-item">Company: {user.company.name}</p>
            <p className="detail-item">Website: {user.website}</p>
        </div>
    );
};

export default UserDetails;