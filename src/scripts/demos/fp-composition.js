// Task: Log the members's name, capitalized, with more than 100 commits

var team = [
  { name: "Igor Minar", commits: 159 },
  { name: "Jeff Cross", commits: 84 },
  { name: "Brian Ford", commits: 113 },
  { name: "Brendan Eich", commits: 173 },
  { name: "Addy Osmani", commits: 203 },
  { name: "André Saltz", commits: 80 }
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

