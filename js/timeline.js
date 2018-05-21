
var TIMELINE_PREFERENCES = {
    monthNames: [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ],
    defaultEvent : {
        title: "Event title",
        time: new Date(),
        body: "Event body",
        icon: "fa fa-question",
        type: "danger"
    }
};

var Timeline = function ($htmlObj, options) {
    var defaultOptions = {
        eventArray : [TIMELINE_PREFERENCES.defaultEvent, TIMELINE_PREFERENCES.defaultEvent, TIMELINE_PREFERENCES.defaultEvent, TIMELINE_PREFERENCES.defaultEvent],
        eventsTemplate :
            '<div class="timeline-badge"><i class="icon"></i></div>' + 
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
        bodyHtml: false,
        onClick: function (event) { },
        onRenerDone: function () { },
        vertical: true,
    }

    this.htmlObj = $htmlObj;
    this.eventArray = options.eventArray || defaultOptions.eventArray;
    this.eventTemplate = options.eventsTemplate || defaultOptions.eventsTemplate;
    this.bodyHtml = options.bodyHtml;
    this.onRenerDone = options.onRenerDone || defaultOptions.onRenerDone;
    this.onClick = options.onClick || defaultOptions.onClick;
    this.comparator = options.dateComparator || defaultOptions.dateComparator;
    this.dateDisplay = options.dateDisplay || defaultOptions.dateDisplay;
    this.vertical = options.vertical || defaultOptions.vertical;

    this.update();
}

Timeline.prototype.addEvent = function (event) {
    this.eventArray.push(event);
}

Timeline.prototype.update = function () {
    var that = this;
    this.eventArray.sort(function (a, b) {
        return that.comparator(a.time, b.time)
    });
    this.render();
    this.htmlObj.hide().fadeIn("slow");
}

Timeline.prototype.render = function () {
    var $eventsUl = $('<ul class="timeline timeline-' + (this.vertical ? 'vertical' : 'horizontal') + '"></ul>');
    this.htmlObj.html($eventsUl);
    for(var i = 0; i < this.eventArray.length; i++) {
        var $item = $('<li class="timeline-item '+ i + '"></li>');

        var newEvent = $(this.eventTemplate);

        $(newEvent[0]).addClass(this.eventArray[i].type);
        $(newEvent[1]).addClass(this.eventArray[i].type);

        for (var property in this.eventArray[i]) {
            if (this.eventArray[i].hasOwnProperty(property)) {
                if(property == 'icon') {
                    newEvent.find('.icon').addClass(this.eventArray[i][property]);
                } else if (property === 'time') {
                    newEvent.find('.time').text(this.dateDisplay(this.eventArray[i].time));
                } else {
                    newEvent.find('.' + property).text(this.eventArray[i][property])
                }
            }
        }
        $item.append(newEvent);

        var that = this;
        $item.click(function() {
            var element = $(this).attr('class').split(" ")[1];
            that.onClick(that.eventArray[element]);
        });
        $eventsUl.append($item);
    }
    this.onRenerDone();
}