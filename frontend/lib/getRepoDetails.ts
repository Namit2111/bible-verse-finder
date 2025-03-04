"use server";

import getRepoLinesOfCode from "git-repo-lines-of-code";
import { RepoData } from "./interface";

export const handleResponse = async (response: PromiseSettledResult<Response>) => {
  if (response.status === "fulfilled") {
    return response.value;
  } else {
    console.log("Failed to fetch Data", response.reason);
    return null;
  }
}

export const isAnyRepoDetailDefault = async (data: RepoData) => {
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
      fetch(`${repoUrl}/contributors`)
    ]);

    const [commitsResponse, contributorsResponse] = await Promise.all(results.map(handleResponse));

    // here the call to the package is made passing the files not to  be counted into it so as to get an accurate LOC
    const linesOfCode = await getRepoLinesOfCode("Namit2111", "bible-verse-finder", ["../backend/utils/bible.json", "package-lock.json"]);

    const contributors = await contributorsResponse?.json();

    const headerLink = commitsResponse?.headers.get("link") || "";
    const lastPageMatch = headerLink?.match(/<[^>]*[&?]page=(\d+)>; rel="last"/);
    const totalCommits = lastPageMatch ? +lastPageMatch[1] : 1;

   return {
      totalCommits,
      totalContributors: Array.isArray(contributors) ? contributors.length : 1,
      totalLinesOfCode: Number.isInteger(linesOfCode) ? +linesOfCode : 1,
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