const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(
  "907552871530-ra1if9hnglttlb02jnjvht6df71e9kj2.apps.googleusercontent.com",
  "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",
  /**
   * To get access_token and refresh_token in server side,
   * the data for redirect_uri should be postmessage.
   * postmessage is magic value for redirect_uri to get credentials without actual redirect uri.
   */
  'postmessage'
);

exports.getProfileInfo = async (code) => {
  const r = await client.getToken(code);
  const idToken = r.tokens.id_token;

  const ticket = await client.verifyIdToken({
    idToken,
    audience: "907552871530-ra1if9hnglttlb02jnjvht6df71e9kj2.apps.googleusercontent.com",
  });

  const payload = ticket.getPayload();

  return payload;
};