const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'al-shahid-organics-admin-token';

export function requireAdminAuth(req, res, next) {
  const headerValue = req.headers.authorization || req.headers['x-admin-token'];
  const token = typeof headerValue === 'string'
    ? headerValue.replace(/^Bearer\s+/i, '')
    : Array.isArray(headerValue)
      ? headerValue[0]?.replace(/^Bearer\s+/i, '') || ''
      : '';

  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized. Admin access required.' });
  }

  return next();
}
