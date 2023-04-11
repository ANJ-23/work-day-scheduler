// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. 
  // HINT: What does `this` reference in the click listener function? 
  // How can DOM traversal be used to get the "hour-x" id of the time-block containing the button that was clicked? 
  // How might the id be useful when saving the description in local storage?

  // container that holds the schedule rows
  var schedContainer = $('.container-lg');

  // work day hours - parsed to TEXT (08 AM - 05 PM)
  var workDayHours = {
    hourOne: dayjs().hour(8),
    hourTwo: dayjs().hour(9),
    hourThree: dayjs().hour(10),
    hourFour: dayjs().hour(11),
    hourFive: dayjs().hour(12),
    hourSix: dayjs().hour(13),
    hourSeven: dayjs().hour(14),
    hourEight: dayjs().hour(15),
    hourNine: dayjs().hour(16),
    hourTen: dayjs().hour(17),
  };

  // stores object's keys as an array of names for IDs
  // var hourIDs = Object.keys(workDayHours);

  // sets rows of schedules
  function workSchedule() {
    // for each hour in the workDayHours object, create a row with its respective hour
    for (var i in workDayHours) {
      var rowContainer = $('<div>');
      rowContainer.addClass('row time-block');
      rowContainer.attr("id", i); // gives row an ID named after workDayHours's object index

      var rowHour = $('<div>');
      rowHour.addClass('col-2 col-md-1 hour text-center py-3');
      rowHour.text(workDayHours[i].format('hh A')); // parses dayjs() values into text

      var rowText = $('<textarea>');
      rowText.addClass('col-8 col-md-10 description');
      rowText.attr('rows', '3');

      var rowSave = $('<button>');
      rowSave.addClass('btn saveBtn col-2 col-md-1');
      rowSave.attr('aria-label', 'save')

      var saveIcon = $('<i>');
      saveIcon.addClass('fas fa-save');
      
      // creates new row with every element within (hour, text box, & save button)
      schedContainer.append(rowContainer);
      rowContainer.append(rowHour);
      rowContainer.append(rowText);
      rowContainer.append(rowSave);
      rowSave.append(saveIcon);

      // for each work hour, sets color of background based on whether it's in the past, present or future;
      // function is defined at bottom of code
      timeBlockColor(workDayHours[i], rowContainer);

      // takes IDs from the time row containers to set locally stored text
      // function is defined at bottom of code
      schedSetText(rowContainer, rowText);

      // upon pressing the save button, obtain the button's parent, then traverse to the "textarea" child, then store locally
      rowSave.on('click', function() {
        // navigates to current rowText's typed value
        var txtArea = $(this).parent().children("textarea");

        // navigates to current rowContainer's ID + sets it as a variable
        var timeID = $(this).parent().attr('id');

        // store in local storage
        localStorage.setItem(timeID, txtArea.val());
      });
    }
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  
  // colors a time block depending on if it's in the past, present, or future
  function timeBlockColor(hour, rowBG) {
    if (hour.diff(dayjs(), 'hour') < 0) {
      rowBG.addClass("past");
    }
    else if (hour.diff(dayjs(), 'hour') > 0) {
      rowBG.addClass("future");
    }
    else if (hour.diff(dayjs(), 'hour') == 0) {
      rowBG.addClass("present");
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // takes IDs from the time row containers to set locally stored text
  function schedSetText(hour, textBox) {
    textBox.text(localStorage.getItem(hour.attr('id')));
  }

  // TODO: Add code to display the current date in the header of the page.

  var today = dayjs();
  var todayText = $('#currentDay');
  todayText.text(today.format('MMM DD, YYYY; hh:mm:ss A'));

  // refreshes clock live
  var clock = setInterval(function () {
    today = dayjs();
    todayText.text(today.format('MMM DD, YYYY; hh:mm:ss A'));;
  }, 1000);

  workSchedule();

});
