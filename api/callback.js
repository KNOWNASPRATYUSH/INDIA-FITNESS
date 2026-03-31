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
          function sendAuth() {
            var message = 'authorization:github:success:{"token":"${token}","provider":"github"}';
            var origin = "*";
            try {
              if (window.opener && window.opener.location && window.opener.location.origin) {
                origin = window.opener.location.origin;
              }
            } catch(e) {
               // Location is cross-origin or restricted, safe fallback to '*'
            }
            if (window.opener) {
              window.opener.postMessage(message, origin);
            }
          }

          // Send immediately
          try {
            sendAuth();
          } catch(err) {
            console.error("Failed first send:", err);
          }

          // Also setup the ping-pong listener for Decap CMS
          function receiveMessage(e) {
            if (typeof e.data === "string" && e.data.indexOf("authorizing:github") !== -1) {
              try { sendAuth(); } catch(err) {}
            }
          }
          window.addEventListener("message", receiveMessage, false);
          
          // Poll to ensure delivery if the parent is slow to attach its listener
          var attempts = 0;
          var interval = setInterval(function() {
             try { sendAuth(); } catch(e) {}
             attempts++;
             if (attempts >= 10) {
               clearInterval(interval);
               window.close();
             }
          }, 300);

          // Auto-close safety fallback
          setTimeout(function() {
            window.close();
          }, 4000);
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
