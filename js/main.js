window["tasker"] = {};

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
    this.logout = function () {
      u = currentUser;
      currentUser = null;
      return u + " logged out";
    };
    this.getUserName = function () {
      return currentUser;
    };

    return {
      signin: this.signin,
      login: this.login,
      logout: this.logout,
      getUserName: this.getUserName,
    };
  };
  return {
    Auth: Auth,
  };
});

(function (root, fun) {
  root["tasker"]["tasks"] = fun();
})(window, function () {
  var taskStorage = {
    tasks: [],
  };
  var addTask = function (task, date, time) {
    if (window.tasker.users.Auth().getUserName() === null) {
      return "not logged in";
    } else {
      if (taskStorage.tasks.length === 0) {
        taskStorage.tasks.push({
          [window.tasker.users.Auth().getUserName()]: [{ task, date, time }],
        });
        return "task added";
      } else {
        var occur = false;
        for (var i = 0; i < taskStorage.tasks.length; i++) {
          var keysa = Object.keys(taskStorage.tasks[i]);
          if (keysa[0] === window.tasker.users.Auth().getUserName()) {
            taskStorage.tasks[i][keysa[0]].push({ task, date, time });
            occur = true;
            return "task added";
          }
        }
        if (occur === false) {
          taskStorage.tasks.push({
            [window.tasker.users.Auth().getUserName()]: [{ task, date, time }],
          });
          return "task added";
        }
      }
    }
  };
  var showTask = function () {
    if (window.tasker.users.Auth().getUserName() === null) {
      return "not logged in";
    } else {
      if (taskStorage.tasks.length === 0) {
        return "no task added";
      } else {
        var occur = false;
        for (var i = 0; i < taskStorage.tasks.length; i++) {
          var keysa = Object.keys(taskStorage.tasks[i]);
          if (keysa[0] === window.tasker.users.Auth().getUserName()) {
            
            occur = true;
            console.log("user : " + window.tasker.users.Auth().getUserName() + " task list" )
            return taskStorage.tasks[i][keysa[0]];
          }
        }
        if (occur === false) {
          return "no task added";
        }
      }
    }
  };
  return {
    addTask: addTask,
    showTask: showTask,
  };
});






(function (root, fun) {
  root["tasker"]["notify"] = fun();
})(window, function () {
  var wpSend = function (){
    window.open("https://api.whatsapp.com/send?phone=919361200265", '_blank');
    var url ="https://wa.me/919361200265?text=${window.tasker.tasks.showTask()} " 
    window.open(url, '_blank');
  }
  
  return {
    wpSend: wpSend,
  };
});





window.tasker.users.Auth().signin("lok", "123");

window.tasker.tasks.addTask("read to exam", "8-7-2020", "8:00");
window.tasker.tasks.showTask()

window.tasker.notify.wpSend()