import { redirect } from "next/navigation";

export default function TeamAdminRedirect() {
  redirect("/teams/admin");
}