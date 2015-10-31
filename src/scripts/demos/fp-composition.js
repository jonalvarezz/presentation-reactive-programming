
/**
 * Functional Programming Composition
 * Using basic operators to create reusable code blocks: Composition.
 * This example has been taked from the Angular Lab (@angularjs_labs) Workshop:
 * Introduction to Reactive Extensions (RxJS). There is a copy:
 * https://docs.google.com/document/d/1hgCI6jd2Is8D-r6G96NtyofT4ekGbvRVJ03J22U65uk/edit#heading=h.nc7lcgxb5gp
 *
 * TASK
 * Log the members's name, capitalized, with more than 100 commits
 */

var team = [
  { name: "Igor Minar", commits: 159 },
  { name: "Jeff Cross", commits: 84 },
  { name: "Brian Ford", commits: 113 },
  { name: "Brendan Eich", commits: 173 },
  { name: "Addy Osmani", commits: 203 },
  { name: "André Staltz", commits: 80 }
];

/*
team.forEach(function (member) {
  if (member.commits > 100) {console.log(member.name.toUpperCase()); }
})
*/

var over100Commits = function (user) {
  return user.commits > 100;
};

var getMemberName = function (member) {
  return member.name;
};

var capitalize = function (text) {
  return text.toUpperCase();
};

var log = function (obj) {
  console.log(obj);
};

team
  .filter(over100Commits)
  .map(getMemberName)
  .map(capitalize)
  .forEach(log);

