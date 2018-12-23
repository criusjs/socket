let UG = require('./UserGroup');
let Group = UG.Group;
let User = UG.User;
// let User = require('./User');
for (let index = 0; index < 100; index++) {
  let u = new User();
  console.log(u.id, u.gid, Group._.length);
}

let u = new User();
u.groupadd(100)
// u.groupadd(3)
// u.groupadd(4)
// u.groupadd(5)

let g = Group._[2]
g.useradd(2)
g.useradd(3)
g = Group._[3]
g.useradd(3)
g.useradd(5)
console.log(u, u.group, g)