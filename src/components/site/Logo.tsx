import Link from 'next/link';
import Image from 'next/image';
import logo from '@public/images/app_icon.png';

export function Logo({
  light = false,
  footer = false,
}: {
  light?: boolean;
  footer?: boolean;
}) {
  return (
    <Link href="/">
      <div
        className={`relative flex ${footer ? 'h-25 bg-neutral-50 rounded-xl' : 'h-15'}  w-50 `}
      >
        <Image
          src={logo}
          fill
          className="object-cover "
          alt="No.1 Lawns"
          priority
        />
      </div>
    </Link>
  );
}
