


window["tasker"]= {};

(function (root, fun) {
  root["tasker"]["users"] = fun();
})(window, function () {
  var userList = {};
  var currentUser = null;
  var Auth = function () {
    this.signin = function (name, pwd) {
      this.name = name;
      if (name in userList) {
        return "given name : " + name + " alredy exist";
      } else {
        userList[name] = pwd;
        currentUser = name;
        return "sucessfully registered " + name;
      }
    };
    this.login = function (name, pwd) {
      this.name = name;
      if (name in userList) {
        if (userList[name] === pwd) {
          currentUser = name;
          return "logged in as " + name;
        } else {
          return "password is wrong ";
        }
      } else {
        return "user name : " + name + " is not registered";
      }
    };
    this.logout = function (){
      u = currentUser
        currentUser = null;
        return u + " logged out"
    }
    this.getUserName = function () {
      return currentUser;
    };

    return {
      signin: this.signin,
      login: this.login,
      logout:this.logout,
      getUserName: this.getUserName,
    };
  };
  return {
    Auth: Auth,
  };
});







window.tasker.users.Auth().signin("lok", "123");



