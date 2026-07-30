import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import LegalFooter from "../components/LegalFooter";
import { seoConfig } from "../seo-config";

export const metadata: Metadata = {
  title: "אודות",
  description:
    "הכירו את ALGOWAYS: מרכז הפעילויות שלנו בתחומי פיתוח מערכות מסחר, תשתיות, כלים פיננסיים, לימודים וקהילות.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    url: "/about",
    title: "אודות ALGOWAYS",
    description:
      "טכנולוגיה, תשתיות, כלים וידע מקצועי לעולם המסחר האלגוריתמי.",
  },
};

const aboutSchema = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${seoConfig.siteUrl}/about#page`,
    url: `${seoConfig.siteUrl}/about`,
    name: "אודות ALGOWAYS",
    description: seoConfig.shortDescription,
    inLanguage: seoConfig.language,
    about: {
      "@id": `${seoConfig.siteUrl}/#organization`,
    },
    isPartOf: {
      "@id": `${seoConfig.siteUrl}/#website`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "דף הבית",
        item: seoConfig.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "אודות",
        item: `${seoConfig.siteUrl}/about`,
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="legalPage">
      <JsonLd data={aboutSchema} />
      <header className="legalHeader">
        <Link className="logoPlate" href="/" aria-label="ALGOWAYS — דף הבית">
          <img src="/logos/algoways-wordmark-2026-trim.png" alt="ALGOWAYS" />
        </Link>
        <Link className="legalBack" href="/">
          <span aria-hidden="true">→</span>
          חזרה לדף הראשי
        </Link>
      </header>

      <section className="legalHero">
        <div className="sectionShell">
          <p>ALGOWAYS / ABOUT</p>
          <h1>
            טכנולוגיה שפוגשת
            <br />
            <span>מסחר אמיתי.</span>
          </h1>
          <div className="legalMeta">באר שבע, ישראל</div>
        </div>
      </section>

      <div className="legalContent sectionShell">
        <aside className="legalAside">
          <strong>מהי ALGOWAYS?</strong>
          ALGOWAYS היא נקודת הכניסה לאתרים ולשירותים שלנו בתחומי פיתוח מערכות
          מסחר, תשתיות, כלים פיננסיים, לימודים וקהילות מקצועיות.
        </aside>

        <article className="legalSections">
          <section>
            <h2>מרכז אחד לפעילויות ממוקדות</h2>
            <p>
              ALGOWAYS מחברת בין תוכנה, תשתיות, מידע וידע מקצועי לעולם המסחר.
              כל פעילות מתמקדת בתחום מוגדר ופועלת דרך אתר ייעודי, בעוד האתר
              הזה עוזר להבין את התמונה המלאה ולבחור את הכתובת המתאימה.
            </p>
          </section>

          <section>
            <h2>תחומי הפעילות</h2>
            <ul>
              <li>פיתוח רובוטים ומערכות מסחר אוטומטיות.</li>
              <li>שרתי VPS ותשתיות המותאמות לפלטפורמות מסחר.</li>
              <li>ניתוח דוחות מסחר, ביצועים וסיכון.</li>
              <li>קורסים, מדריכים והרצאות בתחום האלגו־טרייד.</li>
              <li>קהילות, שיתופי פעולה ושירותים משלימים.</li>
            </ul>
          </section>

          <section>
            <h2>איך אנחנו עובדים</h2>
            <p>
              העבודה שלנו נשענת על התמחות ממוקדת, חיבור בין טכנולוגיה לצורך
              מעשי וחשיבה לטווח ארוך. המטרה היא להציג לכל שירות הגדרה ברורה,
              אתר ייעודי ודרך פשוטה להגיע למידע או לאיש המקצוע המתאים.
            </p>
          </section>

          <section>
            <h2>שקיפות ואחריות</h2>
            <p>
              האתר הוא מרכז מידע וקישורים ואינו מספק ייעוץ השקעות. מידע
              פיננסי או מסחרי באתר אינו מהווה המלצה לפעולה ואינו מחליף ייעוץ
              המותאם למשתמש באופן אישי.
            </p>
            <p>
              הפעילות הנוכחית אינה קשורה לצוות, לחברה או לאתר ALGOWAYS
              המקוריים משנת 2016.
            </p>
          </section>

          <section>
            <h2>יצירת קשר</h2>
            <p>
              לשאלה, הצעה לשיתוף פעולה או בירור בנוגע לאחד השירותים אפשר
              לפנות דרך <Link href="/contact">עמוד יצירת הקשר</Link>.
            </p>
          </section>
        </article>
      </div>

      <LegalFooter />
    </main>
  );
}
