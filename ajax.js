function loadDoc() {
  const r = new XMLHttpRequest();
  r.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  r.open("GET", "ajax_info.txt", true);
  r.send();
}
