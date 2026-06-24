import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

type Region = { name: string; countries: string[] };

const REGIONS: Region[] = [
  { name: "Americas", countries: ["US", "CA", "BR", "MX", "AR"] },
  { name: "Europe", countries: ["GB", "DE", "FR", "NL", "SE", "IT", "ES", "PL"] },
  { name: "Middle East & Central Asia", countries: ["AZ", "TR", "SA", "AE", "IL", "KZ"] },
  { name: "South Asia", countries: ["IN", "PK", "BD", "LK"] },
  { name: "East Asia & Pacific", countries: ["JP", "KR", "CN", "AU", "SG", "TH"] },
  { name: "Africa", countries: ["ZA", "NG", "EG", "KE", "GH"] },
];

const SERVERS: Record<string, string> = {
  Americas: "us-east-1",
  Europe: "eu-west-1",
  "Middle East & Central Asia": "me-central-1",
  "South Asia": "ap-south-1",
  "East Asia & Pacific": "ap-northeast-1",
  Africa: "af-south-1",
};

function getRegion(country: string): string {
  return (
    REGIONS.find((r) => r.countries.includes(country))?.name ?? "Global"
  );
}

export async function GET(request: NextRequest) {
  const geo = (
    request as unknown as {
      geo?: {
        city?: string;
        country?: string;
        latitude?: string;
        longitude?: string;
      };
    }
  ).geo;

  const country = geo?.country ?? "AZ";
  const city = geo?.city ?? "Baku";
  const region = getRegion(country);
  const nearestServer = SERVERS[region] ?? "global-1";

  return NextResponse.json({ city, country, region, nearestServer });
}
