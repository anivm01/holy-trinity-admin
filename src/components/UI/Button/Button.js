import React from 'react';
import './Button.scss';

function Button({ text, onClick, className, href, type = "button", buttonComponent = "button", ...props }) {
    if (buttonComponent === "button") {
        return (
            <button
                className={`button ${className || ""}`}
                type={type}
                onClick={onClick || (() => { })} // No-op function as default
                {...props}
            >
                {text}
            </button>
        );
    } else {
        // Ensure 'href' is only applied to <a> tags and provide a default '#' if not provided
        const linkProps = href ? { href } : { href: "#", tabIndex: -1 }; // tabIndex -1 to avoid tab navigation to links that don't navigate
        return (
            <a
                className={`button ${className || ""}`}
                onClick={onClick || (() => { })} // No-op function as default
                role="button"
                {...linkProps}
                {...props}
            >
                {text}
            </a>
        );
    }
}
export default Button;