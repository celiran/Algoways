# הגדרת טופס יצירת הקשר ב־Cloudflare

## איפה מנהלים את ההגדרות?

אין מסך ניהול בתוך האתר, בכוונה. כתובת היעד ומפתחות האבטחה הם הגדרות שרת,
ולכן מנהלים אותם ב־Cloudflare Dashboard ולא בדף ציבורי באתר.

הטופס שולח `POST` אל `/api/contact`. הטיפול בפנייה נמצא בקובץ
`worker/index.ts`, והחיבור לשירות המייל מוגדר בשם `EMAIL` בקובץ
`vite.config.ts`.

## ארבע ההגדרות של הטופס

| שם ההגדרה | מה מכניסים |
| --- | --- |
| `CONTACT_DESTINATION_EMAIL` | כתובת המייל שאליה יגיעו הפניות |
| `CONTACT_FROM_EMAIL` | כתובת שולח בדומיין שאומת ב־Cloudflare |
| `TURNSTILE_SITE_KEY` | המפתח הציבורי של Turnstile |
| `TURNSTILE_SECRET_KEY` | המפתח הסודי של Turnstile |

השם של חיבור שירות המייל חייב להיות בדיוק:

`EMAIL`

## שלב 1 — בחירת כתובת היעד

הכתובת שאליה הטופס שולח נקבעת רק באמצעות:

`CONTACT_DESTINATION_EMAIL`

לדוגמה:

```dotenv
CONTACT_DESTINATION_EMAIL="your-inbox@gmail.com"
```

אפשר לשנות אותה בהמשך בלי לשנות את קוד האתר.

## שלב 2 — הפעלת Cloudflare Email Service

1. היכנסו ל־Cloudflare Dashboard.
2. עברו אל `Compute` ואז `Email Service` ואז `Email Sending`.
3. לחצו `Onboard Domain` ובחרו את `algoways.co.il`.
4. המתינו עד שהדומיין ומפתחות SPF/DKIM מסומנים כפעילים.
5. בחרו כתובת שולח, לדוגמה:

```dotenv
CONTACT_FROM_EMAIL="contact@algoways.co.il"
```

כתובת השולח חייבת להיות תחת דומיין שהופעל ב־Email Service. אין להשתמש
בכתובת Gmail ככתובת השולח. כתובת Gmail יכולה לשמש ככתובת היעד.

## שלב 3 — חיבור Email ל־Worker

ב־Cloudflare Dashboard:

1. עברו אל `Workers & Pages`.
2. פתחו את ה־Worker של ALGOWAYS.
3. עברו אל `Settings` ואז `Bindings`.
4. הוסיפו חיבור מסוג `Send Email`.
5. הגדירו את שם החיבור כ־`EMAIL`.
6. אם Cloudflare מאפשר להגביל נמענים, הגבילו את החיבור לכתובת שהוגדרה
   ב־`CONTACT_DESTINATION_EMAIL`.

הפרויקט כבר מייצר בבנייה חיבור `send_email` בשם `EMAIL`, לכן אין צורך לשנות
את קוד הטופס.

## שלב 4 — הגדרת משתנים וסודות ב־Cloudflare

בתוך ה־Worker עברו אל:

`Settings` → `Variables and Secrets`

הוסיפו:

- `CONTACT_DESTINATION_EMAIL` כמשתנה רגיל.
- `CONTACT_FROM_EMAIL` כמשתנה רגיל.
- `TURNSTILE_SITE_KEY` כמשתנה רגיל.
- `TURNSTILE_SECRET_KEY` כ־Secret מוצפן.

לאחר השמירה יש לבצע Deployment חדש כדי שהערכים ייכנסו לפעולה.

## שלב 5 — יצירת Cloudflare Turnstile

1. ב־Cloudflare Dashboard עברו אל `Turnstile`.
2. לחצו `Add widget`.
3. תנו לו שם, לדוגמה `ALGOWAYS contact form`.
4. הוסיפו את הדומיין `algoways.co.il`.
5. בחרו מצב `Managed`.
6. העתיקו את ה־Site Key אל `TURNSTILE_SITE_KEY`.
7. שמרו את ה־Secret Key כ־`TURNSTILE_SECRET_KEY`.

שני המפתחות חייבים להיות מוגדרים יחד. אם רק אחד מהם קיים, הטופס חוסם שליחה
כדי למנוע הגדרת אבטחה חלקית.

## הגדרה מקומית

קיים קובץ דוגמה בשם `.env.example`.

1. העתיקו אותו לקובץ חדש בשם `.env`.
2. החליפו את ערכי הדוגמה בערכים שלכם.
3. הפעילו מחדש את השרת המקומי.

קובץ `.env` מוחרג מ־Git ואסור להעלות אותו. החיבור המקומי של `EMAIL` מדמה
שליחה ושומר את תוכן ההודעה בלוגים; הוא אינו שולח מייל אמיתי כברירת מחדל.
לבדיקה עם שליחה אמיתית יש להשתמש ב־Remote Binding של Cloudflare ורק מול
כתובת בדיקה.

## מה כבר מוגן במערכת?

- אימות שדות בדפדפן וב־Worker.
- הגבלת אורך הבקשה וכל שדה.
- שדה מלכודת שקט לבוטים.
- אימות Turnstile בצד השרת.
- תוכן המשתמש נשלח כטקסט בלבד.
- כתובת הפונה מוגדרת כ־Reply-To.
- כאשר ההגדרות חסרות או חלקיות, השליחה נשארת חסומה.

מומלץ להוסיף ב־Cloudflare גם Rate Limiting לנתיב `/api/contact`.
