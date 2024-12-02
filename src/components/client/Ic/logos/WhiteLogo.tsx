import Image from 'next/image';
import Link from 'next/link';
import WhiteLogo from '/public/images/logos/WhiteLogo.png';

function LogoComponent() {
  return (
    <Link href="/client/" passHref>
      <Image src={WhiteLogo} alt="logo" width={150} height={150} style={{ cursor: 'pointer' }} />
    </Link>
  );
}

export default LogoComponent;
