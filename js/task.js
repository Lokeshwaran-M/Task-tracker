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

window.tasker.users.Auth().signin("lok", "123");

window.tasker.tasks.addTask("read to exam", "8-7-2020", "8:00");
window.tasker.tasks.showTask()
