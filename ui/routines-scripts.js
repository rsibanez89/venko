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

async function getRoutine(routineId) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open("GET", `${Host}/routines/${routineId}`, true);
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

async function getOrFetchRoutines(userId) {
  let routines = JSON.parse(window.localStorage.getItem('routines'));
  if(!routines) {
    routines = await getRoutines(userId);
    if(routines == null || routines == undefined || routines.statusCode == 404 || routines.statusCode == 500)
    {
      await logout();
    }
    else {
      window.localStorage.setItem('routines', JSON.stringify(routines));
    }
  }
  return routines;
}


async function logout() {
  window.localStorage.clear();
  window.location.replace("index.html");
}

async function oepnRoutine(id) {
  window.localStorage.setItem('routineId', id);
  window.location.href = "routine.html";
}

window.onload = async () => {
  userId = window.localStorage.getItem('userId');
  if(!userId) {
    window.location.replace("index.html");
  }
  routines = await getOrFetchRoutines(userId);
  showRoutines(routines);
};

function showRoutines(routines) {
  document.querySelector("#routines").innerHTML = `
    ${routines.map((routine) =>
      `<div class="card">
        <img class="card-img-top" src="https://venko.training/${routine.photo}">
        <div class="card-body">
          <h5 class="card-title">${routine.name}</h5>
          <button type="button" class="btn btn-primary" onclick="oepnRoutine(${routine.id})">Go</button>
          <button type="button" class="btn btn-primary video-btn" data-toggle="modal" data-src="https://www.youtube.com/embed/${routine.youtubeUrl}" data-target="#myModal">Video</button>
        </div>
      </div>
      `
    ).join("")}
  `;
  prepareModal();
}


// -------------------- Modal
function prepareModal() {

  // Gets the video src from the data-src on each button
  var $videoSrc;  
  $('.video-btn').click(function() {
      $videoSrc = $(this).data( "src" );
  });
  
  // when the modal is opened autoplay it  
  $('#myModal').on('shown.bs.modal', function (e) {
      
  // set the video src to autoplay and not to show related video.
  $("#video").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
  })
    
  // stop playing the youtube video when I close the modal
  $('#myModal').on('hide.bs.modal', function (e) {
      $("#video").attr('src',$videoSrc); 
  })
}