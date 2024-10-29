export function formatNumber(value: number | string): string {
	const num = typeof value === "string" ? parseInt(value.replace(/,/g, ""), 10) : value;
  if (isNaN(num)) {
    return "0";
	}
	
  if (num >= 1_000_000_000) {
    const billions = Math.floor(num / 1_000_000_000);
    return num === billions * 1_000_000_000 ? `${billions}B` : `${billions}B+`;
  } else if (num >= 1_000_000) {
    const millions = Math.floor(num / 1_000_000);
    return num === millions * 1_000_000 ? `${millions}M` : `${millions}M+`;
  } else if (num >= 1_000) {
    const thousands = Math.floor(num / 1_000);
    return num === thousands * 1_000 ? `${thousands}k` : `${thousands}k+`;
  } else {
    return num.toString();
  }
}
