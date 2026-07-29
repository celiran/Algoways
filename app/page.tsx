import RiskFooterNotice from "./components/RiskFooterNotice";

const ventures = [
  {
    number: "01",
    name: "AutoSysFX",
    category: "פיתוח ואוטומציה",
    description:
      "פיתוח מערכות מסחר אוטומטיות, רובוטים וכלים מותאמים לסוחרים ולגופים מקצועיים.",
    logo: "/logos/autosysfx.png",
    href: "https://www.autosysfx.com/blog/",
    className: "autosysfx",
  },
  {
    number: "02",
    name: "Algotra",
    category: "אלגוריתמים והון",
    description:
      "פלטפורמה המחברת בין בעלי אלגוריתמים, מערכות מסחר ומשקיעים שמחפשים טכנולוגיה עובדת.",
    logo: "/logos/algotra.png",
    href: "https://www.algotra.com/algotra/",
    className: "algotra",
  },
  {
    number: "03",
    name: "AlgoServers",
    category: "תשתיות למסחר",
    description:
      "שרתי VPS ייעודיים למסחר אוטומטי, בהתאמה לפלטפורמות מסחר ועם תמיכה מקצועית.",
    logo: "/logos/algoservers.png",
    href: "https://www.algoservers.com/site/",
    className: "algoservers",
  },
  {
    number: "04",
    name: "ScanFin",
    category: "כלים פיננסיים",
    description:
      "כלים ושירותים שעוזרים לסוחרים לעבוד עם מידע פיננסי בצורה יעילה וממוקדת.",
    logo: "/logos/scanfin.png",
    href: "https://www.scanfin.com/",
    className: "scanfin",
  },
  {
    number: "05",
    name: "CapitalMind",
    category: "ידע, קורסים וקהילה",
    description:
      "מרכז ידע למסחר אלגוריתמי עם קורסים, מדריכים ותכנים מקצועיים לסוחרים ולמפתחים.",
    logo: "/logos/capitalmind.png",
    href: "https://capitalmind.co.il/",
    className: "capitalmind",
  },
  {
    number: "06",
    name: "AlgoCourses",
    category: "אקדמיה לאלגו",
    description:
      "קורסים מקצועיים בעברית לבניית מערכות מסחר אוטומטיות עם AI, ‏MT4/MT5 ופייתון.",
    logo: "/logos/algocourses.png",
    href: "https://algocourses.com/",
    className: "algocourses",
  },
  {
    number: "07",
    name: "ALGOrp",
    category: "ניתוח דוחות מסחר",
    description:
      "כלי מקצועי לניתוח דוחות מסחר מ־MT4, ‏MT5 ו־TradingView, עם מדדי ביצועים, סיכון ותובנות AI.",
    logo: "",
    href: "https://algorp.com/",
    className: "algorp",
  },
  {
    number: "08",
    name: "AlgoTradeCrypto",
    category: "פיתוח רובוטי קריפטו",
    description:
      "פיתוח מערכות ורובוטי מסחר בהתאמה אישית לבורסות קריפטו, לסוחרים פרטיים ולגופים מקצועיים.",
    logo: "/logos/algotradecrypto.png",
    href: "https://algotradecrypto.com/",
    className: "algotradecrypto",
  },
];

const resourceGroups = [
  {
    number: "01",
    title: "פיתוח ושירותים",
    description: "פתרונות טכנולוגיים ותשתיות למסחר",
    links: [
      {
        label: "פיתוח רובוט מסחר בפורקס",
        href: "https://www.autosysfx.com/blog/?page_id=349",
      },
      {
        label: "פיתוח אלגו לבורסה האמריקאית והישראלית",
        href: "https://www.autosysfx.com/blog/?page_id=1162",
      },
      {
        label: "שרת VPS פרטי בניהול שלנו",
        href: "https://www.autosysfx.com/blog/?page_id=371",
      },
    ],
  },
  {
    number: "02",
    title: "לימודים ותוכן",
    description: "קורסים, מדריכים והרצאות מקצועיות",
    links: [
      {
        label: "קורס פיתוח רובוטים ב־MetaTrader / MQL",
        href: "https://www.autosysfx.com/blog/?page_id=1689",
      },
      {
        label: "מדריך: כל עולם האלגו",
        href: "https://www.autosysfx.com/blog/?page_id=5267",
      },
      {
        label: "פלייליסט הרצאות על מסחר אלגוריתמי",
        href: "https://www.youtube.com/watch?v=g8n_3tzMeGQ&list=PLIXKkYgHyaBLfdUqCtPw4UgCT30BF6YSs",
      },
      {
        label: "איך הסוחר הפרטי יכול ליהנות מאלגו־טרייד",
        href: "https://www.autosysfx.com/blog/?p=5566",
      },
    ],
  },
  {
    number: "03",
    title: "קהילות",
    description: "קבוצות, שיחות ועדכונים מהשטח",
    links: [
      {
        label: "קהילות וקבוצות WhatsApp, Telegram ו־Facebook",
        href: "https://www.autosysfx.com/blog/?page_id=5086",
      },
      {
        label: "שיחה ישירה איתנו ב־WhatsApp",
        href: "https://api.whatsapp.com/send/?phone=972528249299&text=%D7%94%D7%99%D7%99%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20ALGOWAYS",
      },
    ],
  },
  {
    number: "04",
    title: "הטבות ושיתופי פעולה",
    description: "קישורים שימושיים והצעות לקהילה שלנו",
    links: [
      {
        label: "פתיחת חשבון TradeStation",
        href: "https://israelbroker.com/site/?page_id=25466",
      },
      {
        label: "פתיחת שרת בענן Kamatera",
        href: "https://il.kamatera.com/express/compute/?bta=35624&nci=5345&tcampaign=35624_392896",
      },
      {
        label: "מסחר נוסטרו, ניהול תיקים והיבטים משפטיים",
        href: "https://capitalmind.co.il/%D7%97%D7%95%D7%A7-%D7%95%D7%A1%D7%93%D7%A8-%D7%9E%D7%A1%D7%97%D7%A8-%D7%A0%D7%95%D7%A1%D7%98%D7%A8%D7%95-%D7%95%D7%A0%D7%99%D7%94%D7%95%D7%9C-%D7%AA%D7%99%D7%A7%D7%99%D7%9D-%D7%9E%D7%A1%D7%97%D7%A8/",
      },
      {
        label: "מיסוי ורואה חשבון לשוק ההון",
        href: "https://capitalmind.co.il/tax/",
      },
    ],
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <header className="siteHeader">
        <a className="logoPlate" href="#top" aria-label="ALGOWAYS — ראש העמוד">
          <img src="/logos/algoways-wordmark-2026-trim.png" alt="ALGOWAYS" />
        </a>
        <div className="headerStatus" aria-label="פרטי הפעילות">
          <span className="statusDot" />
          <span>ISRAEL / EST. 2011</span>
        </div>
        <nav aria-label="ניווט ראשי">
          <a href="#portfolio">האתרים שלנו</a>
          <a href="#resources">שירותים נוספים</a>
          <a href="#group">אודות</a>
          <a className="headerContact" href="/contact">
            צור קשר
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="gridBackground" aria-hidden="true" />
        <div className="heroMeta">
          <span>ALGOWAYS</span>
          <span>TECHNOLOGY / MARKETS / INFRASTRUCTURE</span>
        </div>

        <div className="heroContent">
          <p className="heroEyebrow">טכנולוגיה מאחורי שווקים חכמים</p>
          <h1>
            מחברים בין
            <br />
            <span>טכנולוגיה, מסחר ואנשים.</span>
          </h1>
          <div className="heroCopy">
            <p>
              ALGOWAYS מרכזת את האתרים, הכלים והשירותים שלנו בנקודת המפגש שבין
              תוכנה, תשתיות, מידע וידע מקצועי לעולם המסחר.
            </p>
            <a href="#portfolio">
              לכל הפעילויות
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="dataGraph" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, index) => (
            <i key={index} />
          ))}
        </div>

        <div className="heroStats">
          <div>
            <strong>08</strong>
            <span>אתרים מרכזיים</span>
          </div>
          <div>
            <strong>15+</strong>
            <span>שנות ניסיון</span>
          </div>
          <div>
            <strong>01</strong>
            <span>בית לכל הפעילויות</span>
          </div>
        </div>
      </section>

      <section className="portfolio sectionShell" id="portfolio">
        <div className="sectionIntro">
          <div>
            <span className="sectionNumber">01</span>
            <span className="sectionKicker">האתרים שלנו</span>
          </div>
          <h2>
            כל פעילות
            <br />
            עם <span>מומחיות משלה.</span>
          </h2>
          <p>
            האתרים המרכזיים שלנו — מפיתוח מערכות מסחר, דרך תשתיות וכלים ועד
            ידע מקצועי.
          </p>
        </div>

        <div className="ventureGrid">
          {ventures.map((venture) => (
            <a
              className="venture"
              href={venture.href}
              target="_blank"
              rel="noreferrer"
              key={venture.name}
              aria-label={`${venture.name} — מעבר לאתר`}
            >
              <div className="ventureTop">
                <div className="ventureMeta">
                  <span>{venture.number}</span>
                  <span>{venture.category}</span>
                </div>
                <div className="ventureArrow">
                  <Arrow />
                </div>
              </div>
              <div className={`ventureLogo ${venture.className}`}>
                {venture.logo ? (
                  <img src={venture.logo} alt={`לוגו ${venture.name}`} />
                ) : (
                  <span className="algorpWordmark" aria-label="ALGOrp.com">
                    <strong>ALGO</strong>
                    <span>rp</span>
                    <small>.com</small>
                  </span>
                )}
              </div>
              <p>{venture.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="resources" id="resources">
        <div className="sectionShell resourcesInner">
          <div className="sectionIntro resourcesIntro">
            <div>
              <span className="sectionNumber">02</span>
              <span className="sectionKicker">אתרים ושירותים נוספים שלנו</span>
            </div>
            <h2>
              עוד דרכים
              <br />
              <span>לעבוד איתנו.</span>
            </h2>
            <p>
              שירותי פיתוח, לימודים, קהילות וקישורים שימושיים — מסודרים לפי
              תחום כדי להגיע מהר למה שמחפשים.
            </p>
          </div>

          <div className="resourceGrid">
            {resourceGroups.map((group) => (
              <details className="resourceGroup" open key={group.title}>
                <summary>
                  <span className="resourceNumber">{group.number}</span>
                  <span className="resourceHeading">
                    <strong>{group.title}</strong>
                    <small>{group.description}</small>
                  </span>
                  <span className="summaryToggle" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="resourceLinks">
                  {group.links.map((link) => (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      key={link.label}
                    >
                      <span>{link.label}</span>
                      <Arrow />
                    </a>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="group" id="group">
        <div className="sectionShell groupInner">
          <div className="groupAside">
            <span className="sectionNumber">03</span>
            <span className="sectionKicker">איך אנחנו עובדים</span>
          </div>

          <div className="groupStatement">
            <p className="terminalText">ALGOWAYS / OPERATING PRINCIPLES</p>
            <h2>
              ניסיון מעשי,
              <br />
              חשיבה טכנולוגית,
              <br />
              <span>ביצוע מדויק.</span>
            </h2>
          </div>

          <div className="principles">
            <div>
              <span>01</span>
              <h3>מומחיות ממוקדת</h3>
              <p>כל פעילות נשענת על ידע מקצועי עמוק ומטרה ברורה.</p>
            </div>
            <div>
              <span>02</span>
              <h3>חיבור בין התחומים</h3>
              <p>תוכנה, תשתית ומידע עובדים יחד כדי לייצר פתרון שלם ורציף.</p>
            </div>
            <div>
              <span>03</span>
              <h3>חשיבה לטווח ארוך</h3>
              <p>אנחנו בונים שירות יציב שנשען על ניסיון ושיפור מתמשך.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contactGrid" aria-hidden="true" />
        <div className="sectionShell contactInner">
          <div>
            <span className="sectionNumber">04</span>
            <span className="sectionKicker">יצירת קשר</span>
          </div>
          <div className="contactContent">
            <p>יש לכם רעיון, שאלה או הזדמנות לשיתוף פעולה?</p>
            <h2>
              בואו נתחיל
              <br />
              <span>בשיחה.</span>
            </h2>
            <a href="/contact">
              <span>שלחו לנו הודעה קצרה</span>
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      <footer className="siteFooter">
        <div className="footerBrand">
          <a className="logoPlate" href="#top">
            <img src="/logos/algoways-wordmark-2026-trim.png" alt="ALGOWAYS" />
          </a>
          <p>Technology behind smarter markets.</p>
        </div>
        <div className="footerNav" aria-label="קישורי אתר">
          <a href="#portfolio">האתרים שלנו</a>
          <a href="#resources">שירותים נוספים</a>
          <a href="/contact">צור קשר</a>
        </div>
        <div className="footerBottom">
          <p className="footerCopyright">
            © {new Date().getFullYear()} ALGOWAYS
          </p>
          <RiskFooterNotice />
        </div>
      </footer>

      <aside className="legacyNotice" aria-labelledby="legacy-notice-title">
        <div className="sectionShell legacyNoticeInner">
          <div className="legacyNoticeLabel">
            <span aria-hidden="true">!</span>
            <small>הבהרה חשובה</small>
          </div>
          <div>
            <h2 id="legacy-notice-title">
              הפעילות הנוכחית אינה קשורה ל־ALGOWAYS המקורית.
            </h2>
            <p>
              האתר והפעילות הנוכחית של ALGOWAYS אינם קשורים לצוות, לחברה, לאתר
              הישן או לכל פעילות מסחרית של ALGOWAYS המקורית משנת 2016. האתר
              הנוכחי משמש לריכוז אתרים, שירותים, תוכן והצעות שיווקיות עדכניות,
              ואינו אחראי לפעילות שבוצעה על ידי ALGOWAYS 2016.
            </p>
          </div>
        </div>
      </aside>
    </main>
  );
}
