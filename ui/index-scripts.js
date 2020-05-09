// Environemt variables
const Host = "https://api.venko.training";
let userId;
let routines = [];

async function getRoutines(userId) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open("GET", `${Host}/${userId}/routines`, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function() {
      if (request.readyState == request.DONE) {
        var obj = JSON.parse(request.response);
        resolve(obj)
      }
    };
    request.send();
  });
}

async function signIn() {
  const userId = document.getElementById('userId').value;
  const routines = await getRoutines(userId);
  if(routines == null || routines == undefined || routines.statusCode == 404 || routines.statusCode == 500)
  {
    document.getElementById("invalid-userid").style.display = "block";
  }
  else {
    window.localStorage.setItem('userId', userId);
    window.location.replace("routines.html");
  }
}

window.onload = async () => {
  userId = window.localStorage.getItem('userId');
  if(userId) {
    window.location.replace("routines.html");
  }

  document.getElementById("userId")
    .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        signIn();
      }
  });
};

