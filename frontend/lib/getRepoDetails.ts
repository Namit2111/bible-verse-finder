export const getRepoDetails = async () => {
  const repoUrl = "https://api.github.com/repos/Namit2111/bible-verse-finder";

  try {
    // Fetch all necessary data concurrently
    const [commitsResponse, contributorsResponse, codeFreqResponse] = await Promise.all([
      fetch(`${repoUrl}/commits?per_page=1&page=1`),
      fetch(`${repoUrl}/contributors`),
      fetch(`${repoUrl}/stats/code_frequency`),
    ]);

    // Extract and parse JSON responses
    const commits = await commitsResponse.json();
    const contributors = await contributorsResponse.json();
    const linesOfCode = await codeFreqResponse.json();

    const headerLink = commitsResponse.headers.get("link");
    const lastPageMatch = headerLink?.match(/<[^>]*[&?]page=(\d+)>; rel="last"/);
    const totalCommits = lastPageMatch ? +lastPageMatch[1] : commits.length;

    const totalLinesOfCode = linesOfCode?.reduce((acc: number, curr: number[]) => acc + (curr[1] - Math.abs(curr[2])), 0);
		
    return {
      totalCommits,
      totalContributors: contributors?.length,
			totalLinesOfCode
    };
  } catch (error) {
		console.error("Error fetching repo details:", error);
		
    // Return a fallback result in case of error
		return {
      totalCommits: 0,
      totalContributors: 0,
      totalLinesOfCode: 0,
    };
  }
};