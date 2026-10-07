const FEATURES = [
  {
    title: "Local Expertise",
    description:
      "Curated stays across Tunisia from Hammamet beaches to Saharan oases.",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2B5EA7"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    bg: "bg-blue/10",
  },
  {
    title: "Best Prices",
    description:
      "Transparent pricing in TND with no hidden fees or surprise charges.",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C4503D"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    bg: "bg-red/10",
  },
  {
    title: "Verified Hosts",
    description:
      "Every property is verified and reviewed by real guests before listing.",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2B5EA7"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    bg: "bg-blue/10",
  },
];

export default function WhyBookIt() {
  return (
    <section className="px-16 pt-10 pb-20">
      <h2 className="m-0 mb-10 font-heading text-4xl font-semibold text-blue text-center">
        Why BookIt?
      </h2>
      <div className="grid grid-cols-3 gap-8">
        {FEATURES.map((f) => (
          <div key={f.title} className="text-center p-8">
            <div
              className={`w-14 h-14 mx-auto mb-5 ${f.bg} rounded-[14px] flex items-center justify-center`}
            >
              {f.icon}
            </div>
<h3 className="m-0 mb-2 text-lg font-semibold font-heading">{f.title}</h3>
            <p className="m-0 text-sm text-text-muted leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}