import React from "react";
import "./BgVersionConfirmation.scss"

function BgVersionConfirmation({bgVersion, setBgVersion}) {
    const onBgVersionChange = e => {
        setBgVersion(e.target.value)
      }
  return (
    <div className="bg-confirmation">
      <h2 className="bg-confirmation__text" >
      Do you want to display the Bulgarian translation of this item on the
      public site?
        </h2>
      <div className="bg-confirmation__option">
        <input
          type="radio"
          id="yes"
          name="bg-version"
          value="yes"
          checked={bgVersion === "yes"}
          onChange={onBgVersionChange}
        />
        <label className="bg-confirmation__text" htmlFor="yes">Yes</label>
      </div>
      <div className="bg-confirmation__option">
        <input
          type="radio"
          id="no"
          name="bg-version"
          value="no"
          checked={bgVersion === "no"}
          onChange={onBgVersionChange}
        />
        <label className="bg-confirmation__text" htmlFor="no">No</label>
      </div>
    </div>
  );
}

export default BgVersionConfirmation;
