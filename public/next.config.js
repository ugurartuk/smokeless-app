// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bu redirect (yönlendirme) kısmı Farcaster için zorunludur.
  async redirects() {
    return [
      {
        // Yönlendirme Kaynağı (Source)
        source: "/.well-known/farcaster.json",
        
        // Yönlendirme Hedefi (Destination) - Sizin API linkiniz
        destination: "https://api.farcaster.xyz/miniapps/hosted-manifest/0199fc2b-6a1c-aa7f-82ae-cd97672f2ef7", 
        
        // 307 (Geçici Yönlendirme) ayarı
        permanent: false, 
      },
    ];
  },
};

module.exports = nextConfig;
