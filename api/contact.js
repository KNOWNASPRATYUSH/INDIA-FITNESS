module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const access_key = process.env.WEB3FORMS_ACCESS_KEY;
  if (!access_key) {
    return res.status(500).json({ success: false, message: 'WEB3FORMS_ACCESS_KEY is not defined in Vercel Environment Variables.' });
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...req.body,
        access_key: access_key
      })
    });

    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({ success: false, message: 'External API error: ' + text.substring(0, 50) });
    }
    
    return res.status(response.status).json(result);
  } catch (error) {
    console.error('Contact Form Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

