module.exports = async function handler(req, res) {
  const code = req.query.code;
  const client_id = process.env.OAUTH_CLIENT_ID;
  const client_secret = process.env.OAUTH_CLIENT_SECRET;

  if (!code || !client_id || !client_secret) {
    return res.status(500).send("Missing OAuth code or Vercel Environment Variables");
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'INDIA-FITNESS-Auth'
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code
      })
    });
    
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).send(`GitHub returned a non-JSON response (Status: ${response.status}). This usually means GitHub blocked the Vercel server. Response snippet: ` + text.substring(0, 500));
    }
    
    if (data.error) {
      return res.status(500).send("GitHub Error: " + data.error_description);
    }
    
    const token = data.access_token;
    if (!token) {
       return res.status(500).send(`Authentication failed. GitHub did not return an access token. Data: ` + JSON.stringify(data));
    }
    
    // Decap CMS requires a postMessage response
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Authenticating...</title>
      <style>
        body { font-family: -apple-system, sans-serif; text-align: center; padding: 50px; background: #111; color: white; }
        .success-box { border: 2px solid #00ff88; padding: 20px; border-radius: 12px; display: inline-block; }
      </style>
    </head>
    <body onboarding-state="success">
      <div class="success-box">
        <h3>Login Successful!</h3>
        <p>Closing this window and unlocking the Admin Panel...</p>
      </div>
      <script>
        (function() {
          const token = '${token}';
          const userObj = {
            token: token,
            backend_type: 'github',
            provider: 'github'
          };
          
          if (window.opener) {
            const origin = window.location.origin;
            try {
              window.opener.postMessage({
                source: 'netlify-cms-auth',
                payload: userObj
              }, origin);
              
              window.opener.postMessage('authorization:github:success:' + JSON.stringify(userObj), origin);
            } catch (e) { console.error(e); }

            setTimeout(function() {
              window.close();
            }, 1000);
          } else {
             // If manual refresh is needed
             document.body.innerHTML += '<p style="color:#ffaa00;">No parent window found. Please refresh the Admin tab manually.</p>';
          }
        })();
      </script>
    </body>
    </html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    res.status(500).send("Server Error: " + error.message);
  }
}
