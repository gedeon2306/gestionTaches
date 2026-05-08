import { ROUTES } from "@/src/constants/routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(ROUTES.DASHBOARD.ROOT);
}
