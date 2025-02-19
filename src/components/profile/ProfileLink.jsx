import {IconLink} from "/src/const/profileConsts.js"

const ProfileLink = () => {


    return (
        <div className={"flex flex-row pt-52 sm:pt-[250px] md:pt-[295px] lg:pt-[320px] pr-0 sm:pr-1 md:pr-4 lg:pr-8 w-full text-xl items-center justify-center gap-5"}>
            {IconLink.map((item, index) => {
                return (
                    <a key={`link_${index}`} href={item.link} target={"_blank"}>
                        <item.icon />
                    </a>
                )
            })}
        </div>
    )
}

export default ProfileLink