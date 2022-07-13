

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

window.tasker.notify.wpSend()

