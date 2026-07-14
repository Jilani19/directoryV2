import { redirect } from 'next/navigation';

export default async function CategoryCompanyRedirect(props: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await props.params;
  redirect(`/directory/${companySlug}/overview`);
}
