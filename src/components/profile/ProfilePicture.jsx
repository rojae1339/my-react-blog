import pic from "/src/assets/profile.jpg"

export const ProfilePicture = () => {
    return (
        <div className="w-20 h-20 min-w-20 min-h-20 rounded-full overflow-hidden">
            <img className="w-full h-full object-cover" src={pic} alt="Profile" />
        </div>
    );
};
