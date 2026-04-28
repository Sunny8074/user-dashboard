import "./index.css";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
    return (
        <Link to={`/user/${user.id}`} className="card-link">
            <div className="card">
                <h3 className="name">{user.name}</h3>
                <p className="email">{user.email}</p>
                <p className="city">{user.address.city}</p>
            </div>
        </Link>
    );
};

export default UserCard;