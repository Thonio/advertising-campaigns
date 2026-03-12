import { Link, useLocation } from "react-router"

export default function Navbar() {
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/campaigns', label: 'Campaigns' },
    { to: '/campaigns/new', label: 'New Campaign' },
  ];

  return (
    <nav className="bg-white rounded-xl px-6 py-4 flex gap-6">
      {links.map(link => (
        <Link
          key={link.to}
          to={link.to}
          className={`hover:text-blue-400 transition-colors ${pathname === link.to ? 'text-blue-400 font-semibold' : ''
            }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
