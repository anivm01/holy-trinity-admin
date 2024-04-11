import React from 'react';
import PropTypes from 'prop-types';
import './ModifyButton.scss';
import EditIcon from '../../../assets/svg/EditIcon/EditIcon';
import DeleteIcon from '../../../assets/svg/DeleteIcon/DeleteIcon';

const ModifyButton = ({ onClick, hasIcon, hasText, type, variant }) => {
    // Define button content based on type
    const buttonText = type === "edit" ? "Edit" : "Delete"
    return (
        <button
            className={`modify-button modify-button--${variant}`}
            onClick={onClick}
            type="button"
        >
            {hasText && <span className="modify-button__text">{buttonText}</span>}

            {hasIcon && type === "edit" && (
                <span className="modify-button__icon-box">
                    <EditIcon className="modify-button__icon" />
                </span>
            )}
            {hasIcon && type === "delete" && (
                <span className="modify-button__icon-box">
                    <DeleteIcon className="modify-button__icon" />
                </span>
            )}

        </button>
    );
};

ModifyButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    hasIcon: PropTypes.bool,
    hasText: PropTypes.bool,
    type: PropTypes.oneOf(['edit', 'delete']).isRequired,
    variant: PropTypes.oneOf(['default', 'dark']),
};

ModifyButton.defaultProps = {
    hasIcon: true,
    hasText: true,
    variant: 'default',
};

export default ModifyButton;
