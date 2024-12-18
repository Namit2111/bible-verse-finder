import { line } from "framer-motion/client";
import { RepoData } from "./interface";

export const handleResponse = (response: PromiseSettledResult<Response>) => {
  if (response.status === "fulfilled") {
    return response.value;
  } else {
    console.log("Failed to fetch Data", response.reason);
    return null;
  }
}

export const isAnyRepoDetailDefault = (data: RepoData) => {
  return (
    data.totalCommits === 1 ||
    data.totalContributors === 1 ||
    data.totalLinesOfCode === 1
  );
}

export const getRepoDetails = async (): Promise<RepoData> => {
  const repoUrl = "https://api.github.com/repos/Namit2111/bible-verse-finder";

  try {
    // Fetch all necessary data concurrently
    const results = await Promise.allSettled([
      fetch(`${repoUrl}/commits?per_page=1&page=1`),
      fetch(`${repoUrl}/contributors`),
      fetch(`${repoUrl}/stats/code_frequency`),
    ]);

    const [commitsResponse, contributorsResponse, codeFreqResponse] = await Promise.all(results.map(handleResponse));

    const contributors = await contributorsResponse?.json();
    const linesOfCode = await codeFreqResponse?.json();

    const headerLink = commitsResponse?.headers.get("link") || "";
    const lastPageMatch = headerLink?.match(/<[^>]*[&?]page=(\d+)>; rel="last"/);
    const totalCommits = lastPageMatch ? +lastPageMatch[1] : 1;

    // temporary fix here because the file count we are trying to ignore was done in one commit, so we use the commit hash to remove it from the stats
    const totalLinesOfCode = Array.isArray(linesOfCode) ? linesOfCode.filter((line: Number[]) => line[0] !== 1731196800).reduce((acc: number, curr: number[]) => acc + (curr[1] - Math.abs(curr[2])), 0) : 1;

   return {
      totalCommits,
      totalContributors: Array.isArray(contributors) ? contributors.length : 1,
      totalLinesOfCode
    };

  } catch (error) {
		console.error("Error fetching repo details:", error);
		
    // Return a fallback result in case of error
		return {
      totalCommits: 1,
      totalContributors: 1,
      totalLinesOfCode: 1,
    };
  }
};