export default function Footer({ onNavigate }) {
  const go = (event, name) => {
    event.preventDefault();
    onNavigate(name);
  };
  return (
    <footer className="site-footer">
      <div className="container py-4 d-flex flex-column flex-md-row justify-content-between gap-2">
        <p className="mb-0">Switchyard is a fictitious company created for a class project.</p>
        <ul className="list-inline mb-0">
          {["home", "shop", "account", "cart"].map((name) => (
            <li className="list-inline-item" key={name}>
              <a href={`#${name}`} onClick={(e) => go(e, name)} className="text-capitalize">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
