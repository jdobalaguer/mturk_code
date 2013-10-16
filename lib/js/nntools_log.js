
<!-- Transfer methods -->
function logStart(taskname,idname) {
  alldata = {
    task: taskname,
    id:   idname
  };
  $.post("../../../cgi-bin/pl/log.pl",alldata);
}
