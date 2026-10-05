import { redirect } from "next/navigation";

export default function AdminRedirect() {
  redirect("/teams/admin");
}
