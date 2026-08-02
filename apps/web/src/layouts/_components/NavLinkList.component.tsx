import { Link } from "react-router-dom";

interface NavLinkListProps {
  navLinks: Array<{ path: string; label: string }>;
  isActive: (path: string) => boolean;
  isMobile: boolean;
  onClose: () => void;
}

export const NavLinkList = ({
  navLinks,
  isActive,
  isMobile,
  onClose,
}: NavLinkListProps) => {
  const baseClasses = "font-display uppercase transition-colors duration-200";

  if (isMobile) {
    return (
      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={onClose}
            className={`block px-3 py-2 text-lg ${baseClasses} ${
              isActive(link.path) ? "text-primary" : "text-surface"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="ml-10 flex items-baseline space-x-8">
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`tracking-wide hover:text-primary ${baseClasses} ${
            isActive(link.path) ? "text-primary" : "text-surface"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};
