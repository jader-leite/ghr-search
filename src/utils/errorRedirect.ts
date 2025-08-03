import { redirect } from 'next/navigation';

export function redirectToErrorPage(status: number, message?: string) {
  switch (status) {
    case 404:
      redirect('/not-found');
    case 429:
      redirect('/429');
    case 500:
      redirect('/500');
    default:
      const params = new URLSearchParams();
      if (message) {
        params.set('message', message);
      }
      params.set('status', status.toString());
      redirect(`/error?${params.toString()}`);
  }
}

export function isRedirectableError(status: number): boolean {
  return [404, 429, 500].includes(status);
} 