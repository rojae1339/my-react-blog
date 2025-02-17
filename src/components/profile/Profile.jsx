import profilePic from "/src/assets/profile.jpg"
import {ProfilePicture} from "./ProfilePicture.jsx";
import proBack from "/src/assets/profile-background.jpg"
import ProfileTitle from "./ProfileTitle.jsx";
import ProfileNavs from "./ProfileNavs.jsx";
import ProfileLink from "./ProfileLink.jsx";

const Profile = () => {



    return (
        <div className={"flex flex-col w-[364px] min-w-[364px] min-h-screen max-h-fit items-start pt-[80px] pb-8 pl-14 gap-3 bg-[#fcf5ed] bg-cover"}>
            <ProfilePicture />
            <ProfileTitle />
            <ProfileNavs />
            <ProfileLink />
        </div>
    )
}

export default Profile