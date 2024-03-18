import React from "react";
import './PageHeader.scss'


function PageHeader({ title, children }) {
  return (
    <header className="page-header">
      <h1 className="page-header__title">{title}</h1>
      <div className="page-header__navigation">{children}</div>
    </header>
  );
}

export default PageHeader;
