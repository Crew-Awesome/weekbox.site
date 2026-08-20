export function Background({ children }) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-[#050708] via-[var(--wb-bg)] to-[var(--wb-surface-container)]">
      {children}
    </div>
  );
}
