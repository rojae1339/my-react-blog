import pic from "/src/assets/profile.jpg"
import {Link} from "react-router-dom";

export const ProfilePicture = () => {
    return (
        <Link to={"/"}
              className={"w-20 h-20 min-w-20 min-h-20 rounded-full overflow-hidden"}
              onClick={() => window.scrollTo({top: 0, behavior: "instant"})}
        >
            <img className="w-full h-full object-cover" src={pic} alt="Profile"/>
        </Link>
    );
};
