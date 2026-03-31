module.exports = function handler(req, res) {
  const GITHUB_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
  if (!GITHUB_CLIENT_ID) {
    return res.status(500).send("OAUTH_CLIENT_ID environment variable is missing.");
  }
  // GitHub handles redirect_uri from the OAuth App settings
  const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo,user`;
  res.redirect(302, url);
}
