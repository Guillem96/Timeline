
var defaultEvent = {
    title: "Event title",
    body: "Event body",
    icon: "fa fa-question"
}

var Timeline = function ($htmlObj, options = {}) {
    var defaultOptions = {
        eventArray : [defaultEvent, defaultEvent, defaultEvent, defaultEvent],
        eventsTemplate :
            '<div class="timeline-badge primary"><i class="icon"></i></div>' + 
            '<div class="timeline-panel">' +
                ' <div class="timeline-heading">' +
                    '<h4 class="timeline-title title"></h4>' +
                    '<p><small class="text-muted name"><i class="fa fa-clock"></i></p>' +
                ' </div>' +
                '<div class="timeline-body">' +
                    '<p class="body"></p>' +
                '</div>' +
            '</div>',
        bodyHtml: false,
        onClickEvent: function () {  },
    }
    this.htmlObj = $htmlObj;
    this.eventArray = options.eventArray || defaultOptions.eventArray;
    this.eventTemplate = options.eventsTemplate || defaultOptions.eventsTemplate;
    this.bodyHtml = options.bodyHtml;

    this.update();
}

Timeline.prototype.addEvent = function (event) {

}

Timeline.prototype.update = function () {
    this.render();
    this.htmlObj.hide().fadeIn("slow");
}

Timeline.prototype.render = function () {
    var $eventsUl = $('<ul class="timeline timeline-horizontal"></ul>');
    this.htmlObj.html($eventsUl);
    for(var i = 0; i < this.eventArray.length; i++) {
        var $item = $('<li class="timeline-item"></li>');

        var newEvent = $(this.eventTemplate);
        
        for (var property in this.eventArray[i]) {
            if (this.eventArray[i].hasOwnProperty(property)) {
                if(property == 'icon') {
                    newEvent.find('.icon').addClass(this.eventArray[i][property]);
                    break;
                } else if(property === 'body') {
                    if(this.bodyHtml) {
                        newEvent.find('.body').html(this.eventArray[i].body);
                    } else {
                        newEvent.find('.body').text(this.eventArray[i].body);
                    }
                } else {
                    newEvent.find('.' + property).text(this.eventArray[i][property])
                }
            }
        }
        $item.append(newEvent);
        $eventsUl.append($item);
    }
}