import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/utils/constants";

export default function AdminIndex() {
  redirect(ROUTES.DASHBOARD);
}
