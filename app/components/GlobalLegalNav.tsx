import Link from "next/link";
import CookieSettingsButton from "./CookieSettingsButton";

const legalLinks = [
  { href: "/", label: "דף הבית" },
  { href: "/about", label: "אודות" },
  { href: "/risk-disclosure", label: "אזהרת סיכון" },
  { href: "/terms", label: "תנאי שימוש" },
  { href: "/copyright", label: "זכויות יוצרים" },
  { href: "/privacy", label: "מדיניות פרטיות" },
  { href: "/accessibility", label: "הצהרת נגישות" },
];

export default function GlobalLegalNav() {
  return (
    <footer className="globalLegalBar">
      <nav aria-label="מידע משפטי, פרטיות ונגישות">
        {legalLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
        <CookieSettingsButton />
      </nav>
    </footer>
  );
}
