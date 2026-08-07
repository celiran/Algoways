const whatsappMessage = "שלום, הגעתי דרך ALGOWAYS";

export const whatsappUrl = `https://web.whatsapp.com/send?phone=972528249299&text=${encodeURIComponent(whatsappMessage)}`;

export default function WhatsAppButton() {
  return (
    <a
      className="whatsappFloat"
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="שליחת הודעה ל־ALGOWAYS ב־WhatsApp"
    >
      <span className="whatsappFloatIcon" aria-hidden="true">
        ✆
      </span>
      <span>שאלו אותי כל שאלה!</span>
    </a>
  );
}
