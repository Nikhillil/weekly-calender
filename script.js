let currDate = document.getElementsByClassName("curr-date");
let tbody = document.querySelector('tbody');
let td = document.getElementsByClassName("tdElm");

let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function getFormatedDate(date) {

    let months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

    let month = months[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();

    let formattedDate = month + ' ' + day + ' ' + year;
    return formattedDate;
}

function generateTimeSlots() {
    var container = document.getElementById("timeSlots");
    
    var startTime = new Date();
    startTime.setHours(8, 0, 0); 

    var endTime = new Date();
    endTime.setHours(11, 30, 0); 

    var interval = 30 * 60 * 1000; 

    while (startTime < endTime) {
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "timeSlot";
        checkbox.value = startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        var label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})));
        container.appendChild(label);
        container.appendChild(document.createElement("br"));
        
        startTime.setTime(startTime.getTime() + interval);
    }
}

let d = Date(Date.now());
let a = d.toString();

let currentDate = new Date(a);

currDate[0].innerHTML = getFormatedDate(currentDate);;

var date = new Date(currentDate);

let currentDayOfWeek = date.getDay();

let daysToSubtract = (currentDayOfWeek + 6) % 7; 
date.setDate(date.getDate() - daysToSubtract);

let previousMondayDate = getFormatedDate(date);

for (let i = 0; i < 5; i++) {
    let updatedDate = new Date(date);
    let day = days[i];

    updatedDate.setDate(updatedDate.getDate() + i);

    let tr = document.createElement('tr');

    if (updatedDate.getDate() < currentDate.getDate()) {
        tr.innerHTML = `
            <th scope="row" class="d-flex flex-column">
                ${day}<span>${updatedDate.getMonth() + 1}/${updatedDate.getDate()}</span>
            </th>
            <td class="tdElm" colspan="3">Past</td>
        `;
    } else {
        let timeSlotsHTML = '';

        let startTime = new Date();
        startTime.setHours(8, 0, 0);

       
        let endTime = new Date();
        endTime.setHours(23, 0, 0);

        
        let interval = 30 * 60 * 1000; 
        
        while (startTime <= endTime) {
            let timeString = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            let timeParts = timeString.split(" ");
            let hourMinute = timeParts[0];
            let ampm = timeParts[1];
            
            timeSlotsHTML += `
            <div class="gap d-flex align-items-center" id="timeSlots">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck1"
            />
            <label
              class="form-check-label font-weight-normal"
              for="defaultCheck1"
            >
              ${hourMinute} ${ampm}
            </label>
          </div>
            `;
            
            startTime.setTime(startTime.getTime() + interval);
        }

        tr.innerHTML = `
            <th scope="row" class="d-flex flex-column">
                ${day}<span>${updatedDate.getMonth() + 1}/${updatedDate.getDate()}</span>
            </th>
            <td colspan="3">
            <div class="form-check d-flex align-items-center">
            <div class="checkbox-1 d-flex align-items-center flex-wrap">
             `+timeSlotsHTML+`
            </div>
          </div>
          
            </td>
        `;
    }
    tbody.appendChild(tr);
}












