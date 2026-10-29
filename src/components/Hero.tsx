export default function Hero() {
  return (
    <div className="relative mx-4 md:mx-8 lg:mx-16 mt-4 md:mt-8 rounded-[20px] overflow-hidden h-[320px] md:h-[420px] lg:h-[520px] bg-gradient-to-br from-navy via-blue via-40% to-red">
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-20 gap-4 md:gap-6">
        <span className="font-body text-xs md:text-sm font-semibold tracking-[2px] uppercase text-yellow">
          Discover Tunisia
        </span>
        <h1 className="m-0 font-heading text-3xl md:text-[44px] lg:text-[56px] font-bold text-white leading-[1.1] max-w-[600px]">
          Find your perfect stay in Tunisia
        </h1>
        <p className="m-0 text-sm md:text-lg text-white/85 max-w-[480px] leading-relaxed">
          From beachfront villas to Saharan retreats — book unique places to
          stay across the country.
        </p>
      </div>
    </div>
  );
}