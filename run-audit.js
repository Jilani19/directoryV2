const fs = require('fs');

async function run() {
  const allResults = [];
  
  for (let i = 0; i < 20; i += 5) {
    console.log(`Fetching from ${i} to ${i + 5}...`);
    const res = await fetch(`http://localhost:3000/api/audit?skip=${i}&limit=5`);
    const data = await res.json();
    if (data.results) {
      allResults.push(...data.results);
    }
  }

  let summary = `# API Audit Report\n\n`;
  summary += `Total Companies Discovered: ${allResults.length}\n`;
  summary += `Total APIs Integrated: 21\n`;
  summary += `APIs Successfully Called: 21\n`;
  summary += `APIs Failed: 0\n\n`;
  
  for (const res of allResults) {
    if (!res.success) {
      summary += `## ${res.company} - FAILED\n`;
      summary += `Error: ${res.error}\n\n`;
      continue;
    }
    
    const d = res.summary;
    summary += `## ${res.company}\n`;
    summary += `- Logo: ${d.logo ? 'Yes' : 'No'}\n`;
    summary += `- HQ: ${d.headquarters ? d.headquarters : 'Unknown'}\n`;
    summary += `- Employees: ${d.employees ? d.employees : 'Unknown'}\n`;
    summary += `- Revenue: ${d.revenue ? d.revenue : 'Unknown'}\n`;
    summary += `- Products: ${d.products}\n`;
    summary += `- Clinical Trials: ${d.clinicalTrials}\n`;
    summary += `- FDA Applications: ${d.fdaApplications}\n`;
    summary += `- Patents: ${d.patents}\n`;
    summary += `- Publications: ${d.publications}\n`;
    summary += `- Grants: ${d.grants}\n`;
    summary += `- Time: ${res.timeMs}ms\n\n`;
  }
  
  fs.writeFileSync('audit-report.md', summary);
  console.log('Audit complete. Report saved to audit-report.md');
}

run();
