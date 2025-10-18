// Vercel Serverless Function for Farcaster Frame
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { untrustedData } = req.body;
    const buttonIndex = untrustedData?.buttonIndex || 1;
    const fid = untrustedData?.fid || 'unknown';

    let responseHtml = '';

    // Button 1: Evet, içtim
    if (buttonIndex === 1) {
      responseHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="https://smokeless-app.vercel.app/sad.png" />
  <meta property="fc:frame:button:1" content="Yarın Daha İyi Olacak!" />
  <meta property="fc:frame:button:2" content="Uygulamayı Aç" />
  <meta property="fc:frame:button:2:action" content="link" />
  <meta property="fc:frame:button:2:target" content="https://smokeless-app.vercel.app/" />
  <meta property="fc:frame:post_url" content="https://smokeless-app.vercel.app/api/frame" />
  <meta property="og:image" content="https://smokeless-app.vercel.app/sad.png" />
  <title>Üzülme!</title>
</head>
<body>
  <h1>😔 Üzülme, yarın yeni bir başlangıç!</h1>
</body>
</html>`;
    } 
    // Button 2: Hayır, içmedim
    else if (buttonIndex === 2) {
      responseHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="https://smokeless-app.vercel.app/happy.png" />
  <meta property="fc:frame:button:1" content="10 TL Biriktirdim" />
  <meta property="fc:frame:button:2" content="20 TL Biriktirdim" />
  <meta property="fc:frame:button:3" content="50 TL Biriktirdim" />
  <meta property="fc:frame:button:4" content="Uygulamayı Aç" />
  <meta property="fc:frame:button:4:action" content="link" />
  <meta property="fc:frame:button:4:target" content="https://smokeless-app.vercel.app/" />
  <meta property="fc:frame:post_url" content="https://smokeless-app.vercel.app/api/frame?action=save" />
  <meta property="og:image" content="https://smokeless-app.vercel.app/happy.png" />
  <title>Harika!</title>
</head>
<body>
  <h1>🎉 Harika! Ne kadar biriktirdin?</h1>
</body>
</html>`;
    }
    // Para tasarrufu seçenekleri
    else if (req.query.action === 'save') {
      const amounts = [10, 20, 50];
      const savedAmount = amounts[buttonIndex - 1] || 0;
      
      responseHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="https://smokeless-app.vercel.app/success.png" />
  <meta property="fc:frame:button:1" content="Başa Dön" />
  <meta property="fc:frame:button:2" content="Detaylı İstatistikler" />
  <meta property="fc:frame:button:2:action" content="link" />
  <meta property="fc:frame:button:2:target" content="https://smokeless-app.vercel.app/" />
  <meta property="fc:frame:post_url" content="https://smokeless-app.vercel.app/api/frame" />
  <meta property="og:image" content="https://smokeless-app.vercel.app/success.png" />
  <title>Kaydedildi!</title>
</head>
<body>
  <h1>✅ ${savedAmount} TL kaydedildi! Süpersin! 🚭</h1>
</body>
</html>`;
    }
    // Varsayılan
    else {
      responseHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="https://smokeless-app.vercel.app/image.png" />
  <meta property="fc:frame:button:1" content="Evet, içtim" />
  <meta property="fc:frame:button:2" content="Hayır, içmedim" />
  <meta property="fc:frame:post_url" content="https://smokeless-app.vercel.app/api/frame" />
  <meta property="og:image" content="https://smokeless-app.vercel.app/image.png" />
  <title>SmokeLess</title>
</head>
<body>
  <h1>Bugün sigara içtin mi?</h1>
</body>
</html>`;
    }

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(responseHtml);

  } catch (error) {
    console.error('Frame error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
