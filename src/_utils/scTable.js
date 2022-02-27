const translations = require("../_data/translations.json");
const totalsperLevel = require("../_data/totals_per_level.json");
const countSCOnce = require("./countSCOnce.js");

function scTable(allIssues, language, targetLevel, targetWcagVersion) {
  if (!allIssues || !language || !targetLevel) {
    return ``
  }
  
  const totals = totalsperLevel[targetWcagVersion][targetLevel];

  let perceivable = allIssues.filter(issue => issue.data.sc && issue.data.sc.startsWith("1.")).reduce(countSCOnce, []);
  let operable = allIssues.filter(issue => issue.data.sc && issue.data.sc.startsWith("2.")).reduce(countSCOnce, []);
  let understandable = allIssues.filter(issue => issue.data.sc && issue.data.sc.startsWith("3.")).reduce(countSCOnce, []);
  let robust = allIssues.filter(issue => issue.data.sc && issue.data.sc.startsWith("4.")).reduce(countSCOnce, []);

  let totalConforming = 
    (totals.perceivable - perceivable.length) + 
    (totals.operable - operable.length) +
    (totals.understandable - understandable.length) + 
    (totals.robust - robust.length);

  let totalNotConforming = 
    (perceivable.length) + 
    (operable.length) +
    (understandable.length) + 
    (robust.length);
  return `
    <table class="sc-table">
    <thead>
      <tr>
        <th>${translations["principle"][language]}</th>
        <th>${translations["passed"][language]}</th>
        <th>${translations["failed"][language]}</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <td>${translations["perceivable"][language]}</td>
      <td>${totals.perceivable - perceivable.length} ${translations["of"][language]} ${totals.perceivable}</td>
      <td>${perceivable.length} ${translations["of"][language]} ${totals.perceivable}</td>
    </tr>
    <tr>
        <td>${translations["operable"][language]}</td>
        <td>${totals.operable - operable.length} ${translations["of"][language]} ${totals.operable} </td>
        <td>${operable.length} ${translations["of"][language]} ${totals.operable} </td>
    </tr>
    <tr>
        <td>${translations["understandable"][language]}</td>
        <td>${totals.understandable - understandable.length} ${translations["of"][language]} ${totals.understandable} </td>
        <td>${understandable.length} ${translations["of"][language]} ${totals.understandable} </td>
    </tr>
    <tr>
        <td>${translations["robust"][language]}</td>
        <td>${totals.robust - robust.length} ${translations["of"][language]} ${totals.robust} </td>
        <td>${robust.length} ${translations["of"][language]} ${totals.robust} </td>
    </tr>
    <tr class="sc-table-totals">
        <td>${translations["total"][language]}</td>
        <td>${totalConforming} ${translations["of"][language]} ${totals.all}</td>
        <td>${totalNotConforming} ${translations["of"][language]} ${totals.all}</td>
    </tr>
    </tbody>
    </table>
  `;
}

module.exports = scTable;
