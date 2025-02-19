import profilePic from "/src/assets/profile.jpg"
import {ProfilePicture} from "./ProfilePicture.jsx";
import proBack from "/src/assets/profile-background.jpg"
import ProfileTitle from "./ProfileTitle.jsx";
import ProfileNavs from "./ProfileNavs.jsx";
import ProfileLink from "./ProfileLink.jsx";

const Profile = () => {
    return (
        <div
            className={`
                flex flex-col min-h-screen max-h-fit items-start gap-3 bg-[#fcf5ed] bg-cover
                pt-[60px] pb-6 px-6 w-[240px] min-w-[240px]   /* 기본 크기 (모바일) */
                sm:w-[260px] sm:min-w-[260px] sm:pt-[70px] sm:px-6 /* 작은 태블릿 */
                md:w-[300px] md:min-w-[300px] md:pt-[80px] md:px-6 /* 태블릿 */
                lg:w-[350px] lg:min-w-[350px] lg:pt-[90px] lg:px-10 /* 데스크탑 */
            `}
        >
            <ProfilePicture />
            <ProfileTitle />
            <ProfileNavs />
            <ProfileLink />
        </div>
    );
};

export default Profile;
