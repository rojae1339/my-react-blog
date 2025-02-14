const ProfileTitle = () => {
    const title = "Techy & Toasty";
    const subTitle = "Conquest of Dev & Baking"

    return (
        <header className={"flex flex-col gap-2"}>
            <div className={"font-bold text-xl text-gray-600"}>
                {title}
            </div>
            <div className={"italic text-gray-400 text-sm font-medium"}>
                {subTitle}
            </div>
        </header>
    )
}

export default ProfileTitle