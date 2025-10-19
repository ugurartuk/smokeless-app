// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bu redirect (yönlendirme) kısmı Farcaster için zorunludur.
  async redirects() {
    return [
      {
        // Farcaster'ın manifesti arayacağı adres (Kaynak)
        source: "/.well-known/farcaster.json",
        
        // Farcaster'ın barındırdığı manifest adresine yönlendir (Hedef)
        destination: "https://api.farcaster.xyz/miniapps/hosted-manifest/0199fc2b-6a1c-aa7f-82ae-cd97672f2ef7", 
        
        // Bu ayar, 307 (Geçici Yönlendirme) kodunu kullanmamızı sağlar.
        permanent: false, 
      },
    ];
  },
};

module.exports = nextConfig;
