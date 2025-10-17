import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/utils/constants";

export default function HomePage() {
  redirect(ROUTES.EXCHANGE);
}
