import "./LinkWithIcon.scss"
import LinkIcon from "../../../assets/svg/LinkIcon/LinkIcon";
const LinkWithIcon = ({ text, href, className }) => {
    return (
        <a href={href} className={`link-with-icon ${className || ""}`} target="_blank" rel="noreferrer">
            <span className="link-with-icon__icon">
                <LinkIcon />
            </span>
            {text}
        </a>
    );
};

export default LinkWithIcon;