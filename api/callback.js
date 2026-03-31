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
    
    // Decap CMS requires a postMessage response
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Authenticating...</title>
      <style>body { font-family: sans-serif; text-align: center; padding-top: 50px; }</style>
    </head>
    <body>
      <h3>Login Successful!</h3>
      <p>Redirecting back to the Admin Panel...</p>
      <script>
        (function() {
          const token = '${token}';
          const userObj = {
            token: token,
            backend_type: 'github',
            provider: 'github'
          };
          
          // 1. Storage Injection (Most reliable for same-domain on Vercel)
          try {
            console.log("Setting storage tokens...");
            localStorage.setItem("decap-cms-user", JSON.stringify(userObj));
            localStorage.setItem("netlify-cms-user", JSON.stringify(userObj));
          } catch (e) {
            console.error("Storage failed:", e);
          }

          if (window.opener) {
            const targetOrigin = window.location.origin;

            try {
              // Standard Decap handshakes
              window.opener.postMessage({
                source: 'netlify-cms-auth',
                payload: userObj
              }, targetOrigin);
              
              window.opener.postMessage('authorization:github:success:' + JSON.stringify(userObj), targetOrigin);
            } catch (e) {
              console.error("PostMessage failed:", e);
            }

            // Close with a slight delay to allow message processing
            setTimeout(function() {
              window.close();
            }, 1000);
          } else {
            document.body.innerHTML += '<p style="color:red;">Error: Opener window lost. Session saved to memory, please refresh the admin page.</p>';
          }
        })();
      </script>
    </body>
    </html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
