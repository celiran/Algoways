import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "../components/ContactForm";
import RiskFooterNotice from "../components/RiskFooterNotice";

export const metadata: Metadata = {
  title: "יצירת קשר",
  description:
    "השאירו פרטים והודעה קצרה לצוות ALGOWAYS ונחזור אליכם בהקדם.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    title: "יצירת קשר עם ALGOWAYS",
    description:
      "השאירו פרטים והודעה קצרה בנושא שירות, שאלה או שיתוף פעולה.",
  },
};

const whatsappUrl =
  "https://api.whatsapp.com/send/?phone=972528249299&text=%D7%94%D7%99%D7%99%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%90%D7%AA%D7%A8%20ALGOWAYS";

export default function ContactPage() {
  return (
    <main className="contactPage">
      <header className="contactPageHeader">
        <Link className="logoPlate" href="/" aria-label="ALGOWAYS — דף הבית">
          <img src="/logos/algoways-wordmark-2026-trim.png" alt="ALGOWAYS" />
        </Link>
        <Link className="legalBack" href="/">
          <span aria-hidden="true">→</span>
          חזרה לדף הראשי
        </Link>
      </header>

      <section className="contactPageMain">
        <div className="contactPageGrid" aria-hidden="true" />
        <div className="contactPageShell">
          <div className="contactPageIntro">
            <p className="contactPageKicker">ALGOWAYS / CONTACT</p>
            <h1>
              בואו
              <br />
              <span>נדבר.</span>
            </h1>
            <p className="contactPageLead">
              ספרו לנו בקצרה במה נוכל לעזור. בלי נושא, בלי טפסים ארוכים — רק
              הפרטים החשובים והודעה.
            </p>

            <div className="contactDirect">
              <span>מעדיפים הודעה ישירה?</span>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                WhatsApp · 052-824-9299
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="contactFormPanel">
            <div className="contactFormTopline">
              <span>01</span>
              <p>השאירו פרטים ונחזור אליכם</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="contactPageFooter">
        <div className="footerDisclosureRow">
          <span className="footerCopyright">
            © {new Date().getFullYear()} ALGOWAYS
          </span>
          <RiskFooterNotice />
        </div>
      </footer>
    </main>
  );
}
