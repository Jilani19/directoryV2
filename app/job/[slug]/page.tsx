import React from "react";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  return (
    <ComingSoon title={`Job Details: ${params.slug}`} />
  );
}
