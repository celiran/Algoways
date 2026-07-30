import RiskFooterNotice from "./RiskFooterNotice";

export default function LegalFooter() {
  return (
    <footer className="legalFooter">
      <div className="footerDisclosureRow">
        <span className="footerCopyright">
          © {new Date().getFullYear()} ALGOWAYS
        </span>
        <RiskFooterNotice />
      </div>
    </footer>
  );
}
