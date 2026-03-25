export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500 space-y-2">
        <p>⚠️ אין זה ייעוץ פיננסי. כל המידע מוצג למטרות מידע בלבד.</p>
        <p>נתונים מ-Bybit API. מחירים עשויים להשתנות.</p>
        <p className="text-brand-gold">BitoCoin © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
