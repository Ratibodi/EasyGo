export default function UserLayout({ children }) {
  return (
    <div className="w-full max-w-[480px] mx-auto bg-white min-h-screen relative shadow-[0_0_20px_rgba(0,0,0,0.05)] overflow-x-hidden flex flex-col">
      {children}
    </div>
  );
}
