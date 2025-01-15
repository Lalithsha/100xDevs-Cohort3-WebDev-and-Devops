export default function AppLayout({ children }) {
    return (
      <div className="bg-gradient-to-b from-yellow-500 to-orange-500 min-h-screen font-dm-sans">
        {children}
      </div>
    );
  }