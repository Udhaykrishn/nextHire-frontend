export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 p-6">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
        <p className="text-muted-foreground">
          Chat and messaging will go here.
        </p>
      </div>
    </div>
  );
}
