export default function Hero() {
  return (
    <div className="relative mx-16 mt-8 rounded-[20px] overflow-hidden h-[520px] bg-gradient-to-br from-navy via-blue via-40% to-red">
      <div className="absolute inset-0 flex flex-col justify-center px-20 gap-6">
        <span className="font-body text-sm font-semibold tracking-[2px] uppercase text-yellow">
          Discover Tunisia
        </span>
        <h1 className="m-0 font-heading text-[56px] font-bold text-white leading-[1.1] max-w-[600px]">
          Find your perfect stay in Tunisia
        </h1>
        <p className="m-0 text-lg text-white/85 max-w-[480px] leading-relaxed">
          From beachfront villas to Saharan retreats — book unique places to
          stay across the country.
        </p>
      </div>
    </div>
  );
}