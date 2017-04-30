function showHint(str) {
    if (str.length == 0) { 
        document.querySelector("#hint").innerHTML = "";
        return;
    } else {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.querySelector("#hint").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("GET", `gethint.php?q=${str}`, true);
        xmlhttp.send();
    }
}

/*
<p>First name: <input type="text" onkeyup="showHint(this.value)"></p>
<p>Suggestions: <span id="hint"></span></p>
*/
