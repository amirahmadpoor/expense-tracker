import { Link, useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6"
      dir="rtl"
    >
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
        <section className="flex flex-col justify-center">
          <h1 className="text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-400">
            404
          </h1>
          <h2 className="mt-4 text-2xl font-semibold">صفحه پیدا نشد</h2>
          <p className="mt-3 text-gray-500 whitespace-pre-line">
            ممکن است آدرس اشتباه باشد یا صفحه حذف شده باشد. اگر نیاز به کمک
            دارید با پشتیبانی تماس بگیرید
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm bg-gradient-to-r from-indigo-600 to-sky-400 text-white"
              onClick={() => navigate('/tracker', { replace: true })}
            >
              بازگشت به صفحه اصلی
            </button>

            <button
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium border border-gray-200 text-indigo-600 bg-white"
              onClick={() => navigate(-1, { replace: true })}
            >
              بازگشت
            </button>
          </div>
        </section>

        <aside className="flex items-center justify-center">
          <div className="w-full max-w-sm p-6 rounded-xl bg-gradient-to-b from-indigo-50 to-white border border-transparent shadow-sm">
            <svg
              width="220"
              height="150"
              viewBox="0 0 220 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <rect
                x="6"
                y="18"
                width="208"
                height="102"
                rx="12"
                fill="white"
                stroke="rgba(99,102,241,0.06)"
              />
              <circle cx="64" cy="64" r="22" fill="rgba(99,102,241,0.12)" />
              <circle cx="156" cy="64" r="22" fill="rgba(14,165,233,0.12)" />
              <rect
                x="92"
                y="46"
                width="36"
                height="18"
                rx="4"
                fill="rgba(0,0,0,0.04)"
              />
            </svg>

            <div className="mt-3 flex items-center justify-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-gray-200 animate-bounce"
                style={{ animationDelay: "0s" }}
              />
              <span
                className="w-2 h-2 rounded-full bg-gray-200 animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-2 h-2 rounded-full bg-gray-200 animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NotFound;
