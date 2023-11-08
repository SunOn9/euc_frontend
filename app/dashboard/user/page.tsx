import UserTable from "./_component/table/table-user-list";

export default function User() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <UserTable />
    </section>
  );
}
