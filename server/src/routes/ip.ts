import { Router, Request, Response } from "express";
import fetch from "node-fetch";

const router = Router();

interface IpWhoIsResponse {
  ip: string;
  success: boolean;
  message?: string;
  city: string;
  region: string;
  country: string;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: { id: string; utc: string };
  connection: { isp: string };
}

// GET /api/ip?query=8.8.8.8   (query can be an IP, a domain, or omitted for "my IP")
router.get("/", async (req: Request, res: Response) => {
  const query = typeof req.query.query === "string" ? req.query.query.trim() : "";

  try {
    const upstream = `https://ipwho.is/${encodeURIComponent(query)}`;
    const response = await fetch(upstream);
    const data = (await response.json()) as IpWhoIsResponse;

    if (!data.success) {
      return res.status(404).json({ message: data.message || "Could not locate that address." });
    }

    res.json({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      postal: data.postal,
      lat: data.latitude,
      lng: data.longitude,
      timezone: data.timezone?.utc ?? "",
      isp: data.connection?.isp ?? "Unknown",
    });
  } catch (err) {
    console.error("IP lookup failed:", err);
    res.status(502).json({ message: "Upstream lookup service is unavailable. Try again shortly." });
  }
});

export default router;
