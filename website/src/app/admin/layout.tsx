export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* a-64: Add a sidebar or navbar here */}
      <nav></nav>

      {children}
    </section>
  );
}
