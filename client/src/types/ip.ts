export interface IpData {
  ip: string;
  city: string;
  region: string;
  country: string;
  postal: string;
  lat: number;
  lng: number;
  timezone: string;
  isp: string;
}

export type LookupStatus = "idle" | "loading" | "success" | "error";
