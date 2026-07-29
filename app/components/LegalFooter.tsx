import RiskFooterNotice from "./RiskFooterNotice";

const legalLinks = [
  { href: "/", label: "דף הבית" },
  { href: "/risk-disclosure", label: "אזהרת סיכון" },
  { href: "/terms", label: "תנאי שימוש" },
  { href: "/copyright", label: "זכויות יוצרים" },
  { href: "/privacy", label: "מדיניות פרטיות" },
  { href: "/accessibility", label: "הצהרת נגישות" },
];

export default function LegalFooter() {
  return (
    <footer className="legalFooter">
      <div className="footerDisclosureRow">
        <span className="footerCopyright">
          © {new Date().getFullYear()} ALGOWAYS
        </span>
        <RiskFooterNotice />
      </div>
      <nav aria-label="מידע משפטי ונגישות">
        {legalLinks.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
