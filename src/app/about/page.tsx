import Nav from '@/components/nav';
import Footer from '@/components/footer';

export default function About() {
  return (
    <>
      <Nav />
      <main className="pt-20 px-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-brand-gold">מה זה BitoCoin?</h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section className="bg-brand-card rounded-xl p-6 border border-white/5">
            <h2 className="text-xl font-bold mb-3">🎯 על הפרויקט</h2>
            <p>
              BitoCoin (ביטוקוין) הוא דשבורד קריפטו בעברית שמציג נתוני שוק בזמן אמת,
              שיעורי מימון (Funding Rates), הזדמנויות ארביטראז&apos; והמלצות חכמות — הכל במקום אחד.
            </p>
          </section>

          <section className="bg-brand-card rounded-xl p-6 border border-white/5">
            <h2 className="text-xl font-bold mb-3">💡 מה זה Funding Rate Arbitrage?</h2>
            <p className="mb-3">
              בשוק הקריפטו, חוזים עתידיים (Futures) משלמים או גובים &quot;שיעור מימון&quot; כל 8 שעות.
              כשהשיעור חיובי, סוחרים בפוזיציית לונג משלמים לסוחרים בפוזיציית שורט.
            </p>
            <p className="mb-3">
              <strong className="text-brand-gold">האסטרטגיה:</strong> כשה-Funding Rate חיובי וגבוה,
              אפשר לפתוח פוזיציית שורט בפיוצ&apos;רס ובמקביל לקנות את המטבע בספוט.
              ככה אתה מרוויח את ה-Funding Rate בלי סיכון כיווני.
            </p>
            <div className="bg-brand-bg rounded-lg p-4 text-sm">
              <p className="font-bold text-brand-green mb-2">דוגמה:</p>
              <p>Funding Rate = 0.01% כל 8 שעות</p>
              <p>= 0.03% ביום × 365 = <span className="text-brand-green font-bold">10.95% שנתי</span></p>
              <p>על השקעה של $10,000 = <span className="text-brand-green font-bold">$1,095 רווח שנתי</span></p>
            </div>
          </section>

          <section className="bg-brand-card rounded-xl p-6 border border-white/5">
            <h2 className="text-xl font-bold mb-3">⚙️ איך זה עובד</h2>
            <ul className="space-y-2 text-sm">
              <li>📡 נתונים בזמן אמת מ-Bybit API</li>
              <li>📊 ניתוח אוטומטי של שיעורי מימון</li>
              <li>🤖 המלצות חכמות מבוססות נתונים</li>
              <li>🧮 מחשבון ארביטראז&apos; אינטראקטיבי</li>
              <li>🔄 עדכון אוטומטי כל דקה</li>
            </ul>
          </section>

          <section className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-3 text-red-400">⚠️ הבהרה חשובה</h2>
            <p className="text-sm">
              המידע באתר זה מוצג למטרות מידע ולימוד בלבד ואינו מהווה ייעוץ פיננסי, המלצה לקנייה או מכירה,
              או הצעה להשקעה. מסחר בקריפטו כרוך בסיכון גבוה, כולל אובדן מלא של ההשקעה.
              פעל תמיד על פי שיקול דעתך ובהתייעצות עם יועץ פיננסי מוסמך.
            </p>
          </section>

          <section className="text-center text-sm text-gray-500 pb-8">
            <p>נבנה עם ❤️ ו-Next.js</p>
            <p className="text-brand-gold mt-1">BitoCoin © {new Date().getFullYear()}</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
