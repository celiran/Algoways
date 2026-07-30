import type { Metadata } from "next";
import Link from "next/link";
import LegalFooter from "../components/LegalFooter";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description: "הצהרת הנגישות וההתאמות שבוצעו באתר ALGOWAYS.",
  alternates: { canonical: "/accessibility" },
  openGraph: { url: "/accessibility", title: "הצהרת נגישות | ALGOWAYS" },
};

export default function AccessibilityPage() {
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

      <section className="legalHero accessibilityHero">
        <div className="sectionShell">
          <p>ALGOWAYS / ACCESSIBILITY</p>
          <h1>
            הצהרת
            <br />
            <span>נגישות.</span>
          </h1>
          <div className="legalMeta">עודכן לאחרונה: יולי 2026</div>
        </div>
      </section>

      <div className="legalContent sectionShell">
        <aside className="legalAside">
          <strong>אתר נוח לכולם</strong>
          אנו משקיעים מאמצים כדי לאפשר לאנשים עם מוגבלות ולמשתמשים בטכנולוגיות
          מסייעות לגלוש באתר באופן ברור, עצמאי ונוח.
        </aside>

        <article className="legalSections">
          <section>
            <h2>1. תקן וגישת הנגישות</h2>
            <p>
              האתר תוכנן ונבנה במטרה להתאים להנחיות התקן הישראלי ת״י 5568
              לנגישות תכנים באינטרנט ברמה AA, המבוסס על הנחיות WCAG 2.0, ככל
              שהן רלוונטיות למבנה ולתוכן באתר.
            </p>
            <p>
              אנו ממשיכים לבדוק ולשפר את הנגישות כחלק מתחזוקת האתר. ניתן לעיין
              ב{" "}
              <a
                href="https://www.gov.il/BlobFolder/legalinfo/israeli_accessibility_standards_pdf/he/sitedocs_si-5568-1-september-2023.pdf"
                target="_blank"
                rel="noreferrer"
              >
                תקן הנגישות הישראלי
              </a>
              .
            </p>
          </section>

          <section>
            <h2>2. התאמות שבוצעו באתר</h2>
            <ul>
              <li>מבנה סמנטי של כותרות, אזורי ניווט ותוכן.</li>
              <li>אפשרות ניווט והפעלה באמצעות מקלדת.</li>
              <li>סימון מיקוד ברור לרכיבים אינטראקטיביים.</li>
              <li>טקסט חלופי לתמונות ולוגואים משמעותיים.</li>
              <li>התאמה למסכים צרים ולהגדלת טקסט ללא גלילה אופקית.</li>
              <li>כיבוד העדפת מערכת לצמצום תנועה ואנימציות.</li>
              <li>שמות ברורים לקישורים, כפתורים ואזורים.</li>
            </ul>
          </section>

          <section>
            <h2>3. תפריט הנגישות</h2>
            <p>
              כפתור “נגישות” הקבוע בצד המסך פותח כלים להגדלת טקסט, ניגודיות
              גבוהה, גווני אפור, הדגשת קישורים ועצירת אנימציות. אפשר לאפס את
              ההגדרות בכל עת. הבחירה נשמרת בדפדפן המקומי של המשתמש.
            </p>
          </section>

          <section>
            <h2>4. שימוש במקלדת ובקורא מסך</h2>
            <p>
              ניתן לעבור בין קישורים וכפתורים באמצעות Tab, לחזור באמצעות
              Shift+Tab ולהפעיל רכיב באמצעות Enter או מקש הרווח. לחיצה על
              Escape סוגרת את תפריט הנגישות כשהוא פתוח.
            </p>
          </section>

          <section>
            <h2>5. תוכן חיצוני</h2>
            <p>
              האתר מפנה לשירותים ולאתרים חיצוניים שאינם בשליטתנו. ייתכן שרמת
              הנגישות בהם שונה. אם נתקלתם בקושי בקישור או בשירות מסוים, נשמח
              לנסות לסייע או להציע דרך חלופית לקבלת המידע.
            </p>
          </section>

          <section>
            <h2>6. פניות בנושא נגישות</h2>
            <p>
              אם מצאתם בעיית נגישות, ספרו לנו מה לא עבד, באיזה עמוד, באיזה
              מכשיר או דפדפן ובאיזו טכנולוגיה מסייעת השתמשתם.
            </p>
            <p>
              איש קשר לנגישות: צוות ALGOWAYS
              <br />
              טלפון ו־WhatsApp:{" "}
              <a
                href="https://api.whatsapp.com/send/?phone=972528249299&text=%D7%94%D7%99%D7%99%2C%20%D7%A0%D7%AA%D7%A7%D7%9C%D7%AA%D7%99%20%D7%91%D7%91%D7%A2%D7%99%D7%99%D7%AA%20%D7%A0%D7%92%D7%99%D7%A9%D7%95%D7%AA%20%D7%91%D7%90%D7%AA%D7%A8%20ALGOWAYS"
                target="_blank"
                rel="noreferrer"
              >
                052-824-9299
              </a>
            </p>
          </section>
        </article>
      </div>

      <LegalFooter />
    </main>
  );
}
