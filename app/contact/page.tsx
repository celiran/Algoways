import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "../components/ContactForm";
import RiskFooterNotice from "../components/RiskFooterNotice";
import { whatsappUrl } from "../components/WhatsAppButton";

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

const supportEmail = "support@algoways.co.il";

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

            <div className="contactInfoCards" aria-label="פרטי יצירת קשר">
              <article className="contactInfoCard">
                <div className="contactInfoCardHeading">
                  <span className="contactInfoIcon" aria-hidden="true">
                    ✉
                  </span>
                  <h2>אימייל</h2>
                </div>
                <p>ניתן לפנות אלינו גם ישירות במייל</p>
                <a href={`mailto:${supportEmail}`} dir="ltr">
                  {supportEmail}
                </a>
              </article>

              <article className="contactInfoCard">
                <div className="contactInfoCardHeading">
                  <span className="contactInfoIcon" aria-hidden="true">
                    ◷
                  </span>
                  <h2>זמני מענה</h2>
                </div>
                <p>אנחנו משתדלים לחזור לכל פנייה בתוך 24–48 שעות בימי עבודה.</p>
              </article>

              <article className="contactInfoCard contactInfoCardWhatsApp">
                <div className="contactInfoCardHeading">
                  <span className="contactInfoIcon" aria-hidden="true">
                    ✆
                  </span>
                  <h2>WhatsApp</h2>
                </div>
                <p>מעדיפים הודעה קצרה? אפשר לפנות אלינו ישירות ב־WhatsApp.</p>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  שליחת הודעה ל־ALGOWAYS
                  <span aria-hidden="true"> ↗</span>
                </a>
              </article>
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
