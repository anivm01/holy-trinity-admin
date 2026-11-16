import { useState } from "react";
import SingleFeast from "../SingleFeast/SingleFeast";

function FeastMonthAccordion({ defaultOpen, month }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = `feast-month-${month.key}`;

  return (
    <section className="saved-feasts__month">
      <h3 className="saved-feasts__month-heading">
        <button
          className="saved-feasts__month-button"
          type="button"
          onClick={() => setIsOpen((currentValue) => !currentValue)}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span>{month.label}</span>
          <span className="saved-feasts__month-count">
            {month.feasts.length}{" "}
            {month.feasts.length === 1 ? "feast" : "feasts"}
          </span>
          <span className="saved-feasts__chevron" aria-hidden="true" />
        </button>
      </h3>

      {isOpen && (
        <div className="saved-feasts__month-content" id={panelId}>
          {month.feasts.map((feast) => (
            <SingleFeast key={feast.id} item={feast} />
          ))}
        </div>
      )}
    </section>
  );
}

export default FeastMonthAccordion;
