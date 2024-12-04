import { redirect } from 'next/navigation';
// route: / -> /client

export default function Page(): never {
  redirect('/client');
}