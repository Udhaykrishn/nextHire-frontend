import { cookies } from "next/headers";
import { Navbar } from "./navbar";

export default async function NavbarWrapper() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");

  return <Navbar user={token} />;
}
