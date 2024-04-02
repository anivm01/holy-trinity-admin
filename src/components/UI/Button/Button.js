import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ text, onClick, variant, href, type, buttonComponent, ...props }) => {
    const baseClassName = `button button--${variant}`;

    if (buttonComponent === "button") {
        return (
            <button
                className={baseClassName}
                type={type}
                onClick={onClick}
                {...props}
            >
                {text}
            </button>
        );
    } else {
        // Ensure 'href' is only applied to <a> tags and provide a default '#' if not provided
        const linkProps = { href, tabIndex: href ? undefined : -1 }; // tabIndex -1 to avoid tab navigation to links that don't navigate
        return (
            <a
                className={baseClassName}
                onClick={onClick}
                role="button"
                {...linkProps}
                {...props}
            >
                {text}
            </a>
        );
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'secondary']),
    href: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    buttonComponent: PropTypes.oneOf(['button', 'a']),
};

Button.defaultProps = {
    onClick: () => { }, // Provide a no-op function as the default for onClick
    variant: 'primary', // Default to 'primary' variant
    href: '#', // Default href to '#' to ensure <a> is navigable but doesn't lead anywhere unless specified
    type: 'button', // Default type for <button>
    buttonComponent: 'button', // Default to rendering a <button>
};

export default Button;
