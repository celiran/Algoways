import type { Metadata } from "next";
import Link from "next/link";
import LegalFooter from "../components/LegalFooter";

export const metadata: Metadata = {
  title: "זכויות יוצרים",
  description: "מדיניות זכויות היוצרים והשימוש בתכני אתר ALGOWAYS.",
  alternates: { canonical: "/copyright" },
  openGraph: { url: "/copyright", title: "זכויות יוצרים | ALGOWAYS" },
};

export default function CopyrightPage() {
  return (
    <main className="legalPage">
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
          <p>ALGOWAYS / COPYRIGHT</p>
          <h1>
            זכויות
            <br />
            <span>יוצרים.</span>
          </h1>
          <div className="legalMeta">עודכן לאחרונה: יולי 2026</div>
        </div>
      </section>

      <div className="legalContent sectionShell">
        <aside className="legalAside">
          <strong>יצירה, תוכן ומותגים</strong>
          העמוד מפרט כיצד מותר להשתמש בתכנים ובסימנים המופיעים באתר ובאילו
          מקרים נדרש אישור מראש.
        </aside>

        <article className="legalSections">
          <section>
            <h2>1. בעלות בתוכן</h2>
            <p>
              אלא אם צוין אחרת, הטקסטים, העיצוב, המבנה, הקוד, הגרפיקה והחומרים
              המקוריים באתר מוגנים לפי דיני זכויות יוצרים וקניין רוחני. כל
              הזכויות שלא הוענקו במפורש שמורות לבעליהן.
            </p>
          </section>

          <section>
            <h2>2. לוגואים וסימני מסחר</h2>
            <p>
              ALGOWAYS, שמות המיזמים, הלוגואים והסימנים המסחריים המוצגים באתר
              שייכים לבעליהם. הצגתם נועדה לזהות את האתר או השירות שאליו מפנה
              הקישור, ואינה מעניקה רישיון לעשות בהם שימוש.
            </p>
          </section>

          <section>
            <h2>3. שימוש אישי מותר</h2>
            <p>
              ניתן לצפות בתכני האתר ולשתף קישור לעמוד ציבורי לשימוש אישי
              וסביר. אין להסיר סימוני זכויות, לשנות את התוכן או ליצור מצג מטעה
              בדבר מקורו.
            </p>
          </section>

          <section>
            <h2>4. שימוש הדורש אישור</h2>
            <ul>
              <li>העתקה, פרסום מחדש או הפצה של תוכן מלא.</li>
              <li>שימוש מסחרי, מכירה, רישוי משנה או שילוב במוצר אחר.</li>
              <li>שינוי, תרגום או יצירת יצירה נגזרת לצורך הפצה.</li>
              <li>שימוש בשם או בלוגו בפרסום, חסות או מצג של שיתוף פעולה.</li>
            </ul>
          </section>

          <section>
            <h2>5. תוכן וקישורים של צדדים נוספים</h2>
            <p>
              זכויות בתוכן של אתר חיצוני נשארות בידי בעליו. יש לבדוק ולקיים את
              תנאי השימוש של אותו אתר לפני העתקה או שימוש בחומרים המוצגים בו.
            </p>
          </section>

          <section>
            <h2>6. פנייה בנושא זכויות</h2>
            <p>
              אם לדעתכם חומר באתר מפר זכות השייכת לכם, או אם ברצונכם לקבל אישור
              שימוש, אפשר לפנות דרך{" "}
              <a
                href="https://api.whatsapp.com/send/?phone=972528249299&text=%D7%94%D7%99%D7%99%2C%20%D7%99%D7%A9%20%D7%9C%D7%99%20%D7%A9%D7%90%D7%9C%D7%94%20%D7%91%D7%A0%D7%95%D7%92%D7%A2%20%D7%9C%D7%96%D7%9B%D7%95%D7%99%D7%95%D7%AA%20%D7%99%D7%95%D7%A6%D7%A8%D7%99%D7%9D%20%D7%91%D7%90%D7%AA%D7%A8%20ALGOWAYS"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              , בצירוף פרטי הזכות, הקישור הרלוונטי ופרטי התקשרות.
            </p>
          </section>
        </article>
      </div>

      <LegalFooter />
    </main>
  );
}
