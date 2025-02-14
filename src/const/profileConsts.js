import {IoIosHome, IoMdArchive, IoMdInformationCircle, IoMdPricetags} from "react-icons/io";
import {FaGithubSquare, FaLinkedin, FaSoundcloud} from "react-icons/fa";

export const NavItems = [
    { name: "HOME", icon: IoIosHome, path: "/" },
    { name: "TAGS", icon: IoMdPricetags, path: "/tags" },
    { name: "ARCHIVES", icon: IoMdArchive, path: "/archives" },
    { name: "ABOUT ME", icon: IoMdInformationCircle, path: "/about-me" }
];

export const IconLink = [
    {icon: FaSoundcloud, link: "https://soundcloud.com/apollox1224"},
    {icon: FaGithubSquare, link: "https://github.com/rojae1339"},
    {icon: FaLinkedin, link: "https://www.linkedin.com/in/jaeho-jeong-dev/"}
];