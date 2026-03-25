/**
 * Stats Endpoint
 * Returns system statistics for mobile app dashboard
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Generate mock stats (in production, fetch from database)
    const stats = {
      total_analyses: 1247,
      fake_detected: 523,
      real_detected: 724,
      accuracy: 0.949,
      models_active: 6,
      avg_processing_time: 2.3,
      total_users: 89,
      analyses_today: 34,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch stats',
      message: error.message,
    });
  }
}
