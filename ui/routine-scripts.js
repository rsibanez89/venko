// Environemt variables
const Host = "https://api.venko.training";
let routineId;
let routine = [];

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

async function getOrFetchRoutine(routineId) {
  let routine = JSON.parse(window.localStorage.getItem('routine_' + routineId));
  if(!routine) {
    routine = await getRoutine(routineId);
    if(routine == null || routine == undefined || routine.statusCode == 404 || routine.statusCode == 500)
    {
      await logout();
    }
    else {
      window.localStorage.setItem('routine_' + routineId, JSON.stringify(routine));
    }
  }
  return routine;
}

async function logout() {
  window.localStorage.clear();
  window.location.replace("index.html");
}

window.onload = async () => {
  routineId = window.localStorage.getItem('routineId');
  if(!routineId) {
    window.location.replace("index.html");
  }
  routine = await getOrFetchRoutine(routineId);
  showRoutine(routine);
};

function showRoutine(routine) {
  document.querySelector("#routine").innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="false">
      <ol class="carousel-indicators">
        ${routine.map((exercise, index) => 
          `<li data-target="#carouselExampleIndicators" data-slide-to="${index}" ${index == 0 ? 'class="active"' : ''}></li>`
          ).join("")}
      </ol>
      <div class="carousel-inner">
        ${routine.map((exercise, index) => 
          `<div class="carousel-item ${index == 0 ? 'active' : ''}">
              <img src="https://venko.training/${exercise.fields.video}" class="d-block w-100">
              ${exercise.fields.youtubeUrl === undefined || exercise.fields.youtubeUrl === ''
                  ? '' 
                  : '<button type="button" class="btn btn-primary video-btn" data-toggle="modal" data-src="https://www.youtube.com/embed/' + exercise.fields.youtubeUrl + '" data-target="#myModal">Video</button>'}
           </div>`
        ).join("")}
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
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