import React from 'react'
import Button from '../Button/Button'
import "./DeletePopup.scss"

export const DeletePopup = ({ deleteItem, setVisible }) => {
    return (
        <div className="delete-popup">
            <h2 className="delete-popup__question">
                Are you sure you want to delete this item?
            </h2>
            <div className="delete-popup__buttons">
                <Button
                    type="button"
                    onClick={() => { deleteItem() }}
                    text="Delete"
                    variant="primary"
                />
                <Button
                    type="button"
                    onClick={() => { setVisible(false) }}
                    text="Cancel"
                    variant="secondary"
                />
            </div>
        </div>
    )
}
