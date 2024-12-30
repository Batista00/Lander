export function BackgroundGradient() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Gradient Orbs */}
      <div className="animate-pulse-slow absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-[#00E5B0] to-transparent rounded-full opacity-20 blur-3xl" />
      <div className="animate-pulse-slow absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-[#FF1F8C] to-transparent rounded-full opacity-20 blur-3xl" />
      <div className="animate-pulse-slow absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-t from-[#00D1FF] to-transparent rounded-full opacity-20 blur-3xl" />
      
      {/* Moving dots */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, rgba(0, 229, 176, 0.1) 1px, transparent 1px)` }}>
        <div className="absolute inset-0 animate-drift" style={{ backgroundSize: '50px 50px' }} />
      </div>
    </div>
  );
}
