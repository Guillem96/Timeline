var timeline = (function ( ) {
  var defaultOptions = {
    eventArray: [],
    eventsTemplate: '<div class="timeline-badge"><i class="icon"></i></div>' +
      '<div class="timeline-panel">' +
      ' <div class="timeline-heading">' +
      '<h4 class="timeline-title title"></h4>' +
      '<p><i class="text-muted fa fa-clock"></i> <small class="time text-muted"></small></p>' +
      ' </div>' +
      '<div class="timeline-body">' +
      '<small class="body"></small>' +
      '</div>' +
      '</div>',
    dateComparator: function (date1, date2) {
      return date1 - date2;
    },
    dateDisplay: function (date) {
      return date.getDate() + " " + TIMELINE_PREFERENCES.monthNames[date.getMonth()] + " " + date.getFullYear();
    },
    onClick: function (event) {},
    onRenerDone: function () {},
    vertical: true,
  };

  var htmlObj;
  var eventArray;
  var eventTemplate;
  var onRenerDone;
  var onClick;
  var comparator;
  var dateDisplay;
  var vertical;

  var render = function ( ) {
    var $eventsUl = $('<ul class="timeline timeline-' + (vertical ? 'vertical' : 'horizontal') + '"></ul>');
    htmlObj.html($eventsUl);
    for (var i = 0; i < eventArray.length; i++) {
      var $item = $('<li class="timeline-item ' + i + '"></li>');
  
      var newEvent = $(eventTemplate);
  
      $(newEvent[0]).addClass(eventArray[i].type || 'info');
      $(newEvent[1]).addClass(eventArray[i].type || 'info');
  
      for (var property in eventArray[i]) {
        if (eventArray[i].hasOwnProperty(property)) {
          if (property == 'icon') {
            newEvent.find('.icon').addClass(eventArray[i][property]);
          } else if (property === 'time') {
            newEvent.find('.time').html(dateDisplay(eventArray[i].time));
          } else {
            newEvent.find('.' + property).html(eventArray[i][property])
          }
        }
      }
      $item.append(newEvent);
  
      $item.click(function () {
        var element = $(this).attr('class').split(" ")[1];
        onClick(eventArray[element]);
      });
      $eventsUl.append($item);
    }

    onRenerDone( );
  };
  
  var addEvent = function (event) {
    eventArray.push(event);
  };

  var update = function ( ) {
    eventArray.sort(function (a, b) {
      return comparator(a.time, b.time)
    });
    render();
    htmlObj.hide().fadeIn("slow");
  };

  var create = function ($htmlObj, options) {
    htmlObj = $htmlObj;
    eventArray = options.eventArray || defaultOptions.eventArray;
    eventTemplate = options.eventsTemplate || defaultOptions.eventsTemplate;
    onRenerDone = options.onRenerDone || defaultOptions.onRenerDone;
    onClick = options.onClick || defaultOptions.onClick;
    comparator = options.dateComparator || defaultOptions.dateComparator;
    dateDisplay = options.dateDisplay || defaultOptions.dateDisplay;
    vertical = options.vertical || defaultOptions.vertical;

    update( );
  };

  return {
    create,
    addEvent,
    update: update,
  };
}());

var TIMELINE_PREFERENCES = {
  monthNames: [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ],
  defaultEvent: {
    title: "Event title",
    time: new Date(),
    body: "Event body",
    icon: "fa fa-question",
    type: "info"
  }
};