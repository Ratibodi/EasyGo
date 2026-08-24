import { redirect } from "next/navigation";

export default function Page({ searchParams }) {
  const params = new URLSearchParams(searchParams || {});
  const queryString = params.toString();
  redirect(`/login${queryString ? `?${queryString}` : ""}`);
}
