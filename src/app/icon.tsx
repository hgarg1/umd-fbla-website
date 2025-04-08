import Image from 'next/image'

export default function Icon() {
  return (
    <Image
      src="/FBLA_Collegiate_Logo.webp"
      alt="FBLA Logo"
      width={32}
      height={32}
      className="rounded-full"
    />
  )
} 