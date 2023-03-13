import React from 'react'
import deleteIcon from "../../assets/delete.svg";
import "./DeleteButton.scss"

function DeleteButton({setDeleteVisible}) {
    
  return (
    <button
        className="delete-button"
        onClick={() => {
          setDeleteVisible(true);
        }}
        type="button"
      >
        <img
          className="delete-button__icon"
          src={deleteIcon}
          alt="delete"
        />
      </button>
  )
}

export default DeleteButton