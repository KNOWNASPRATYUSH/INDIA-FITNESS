export default function handler(req, res) {
  const GITHUB_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
  if (!GITHUB_CLIENT_ID) {
    return res.status(500).send("OAUTH_CLIENT_ID environment variable is missing.");
  }
  const redirect_uri = `https://${req.headers.host}/api/callback`;
  const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo,user&redirect_uri=${redirect_uri}`;
  res.redirect(302, url);
}
