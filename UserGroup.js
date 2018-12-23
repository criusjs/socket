class User {
  constructor(name) {
    User._.push(this);
    this.pos = User._.length - 1;
    this.id = User.uuid++;

    this.gid = new Group(this.id).id;
    this.groups = []; // fujiazu

    //- desc
    this.name = name || 'defaul name';
  }

  // add a user
  groupadd(gid, stopInner) {
    let pos = this.groupfind(gid);
    if (pos === -1 && this.gid !== gid) {
      this.groups.push(gid);
      // --
      if (stopInner !== true) {
        let group = Group.find(gid);
        group.useradd(this.id, true);
      }
    }
  }

  groupdel(gid) {
    let pos = this.groupfind(gid);
    if (pos > -1) {
      this.groups.splice(pos, 1);
      // --
      let group = Group.find(gid);
      group.userdel(this.id);
    }
  }

  groupfind(gid) {
    return this.groups.indexOf(gid);
  }

  get group() {
    return Group.find(this.gid);
  }

  static find(id) {
    for (let i = 0, len = this._.length; i < len; i++) {
      let user = this._[i];
      if (user.id === id) {
        return user;
      }
    }
    return null;
  }
}

User.uuid = 0;
User._ = [];

class Group {
  constructor(uid) {
    Group._.push(this);
    this.pos = Group._.length - 1;
    this.id = Group.uuid++; // room id

    this.uid = uid;
    this.users = []; //other users
  }

  // add a user
  useradd(uid, stopInner) {
    let pos = this.userfind(uid);
    if (pos === -1 && this.uid !== uid) {
      this.users.push(uid);
      // --
      if (stopInner !== true) {
        let user = User.find(uid);
        user.groupadd(this.id, true);
      }
    }
  }

  userdel(uid) {
    let pos = this.userfind(uid);
    if (pos > -1) {
      this.users.splice(pos, 1);
      // --
      let user = User.find(uid);
      user.groupdel(this.id);
    }
  }

  userfind(uid) {
    return this.users.indexOf(uid);
  }

  get user() {
    return User.find(this.uid);
  }

  static find(id) {
    for (let i = 0, len = this._.length; i < len; i++) {
      let group = this._[i];
      if (group.id === id) {
        return group;
      }
    }
    return null;
  }
}

Group.uuid = 0;
Group._ = [];
module.exports = {
  Group,
  User
};