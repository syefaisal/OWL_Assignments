import { BellIcon } from "./icons";

export function Header() {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo">
          <span className="header__name">OWL</span>
        </span>
        <span className="header__tagline">Fund Intelligence</span>
      </div>
      <div className="header__actions">
        <button className="header__bell" aria-label="Notifications">
          <BellIcon />
        </button>
        <span className="header__avatar">JD</span>
      </div>
    </header>
  );
}
