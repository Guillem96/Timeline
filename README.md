# Timeline JS

## Description

Simple JS library to easily create a timeline.

## Documentation

### Create a timeline

```javascript
var options = { ... }
var timeline = new Timeline($('.here-goes-the-timeline'), options);
```

### Options

| Name | Value Type | Description | Default |
|------|------------|-------------|---------|
| eventArray | [Object] | Events are described in the next section. | [] |
| eventTemplate | HTMLString | Template where the event item is rendered. How to generate a new event template is described on the next section. | \* |
| dateComparator | function(date1:Date, date2:Date) | Method to sort dates. Dates are sorted internally on the Timeline. | `(date1, date2) => date1 - date2;` |
| dateDisplay | function(date:Date) | How date is displayed on the document. | `(date) => date.getDate() + monthName[date.getMonth()] + date.getYear()` |
| onRenderDone | function() | Function invoked after rendering the timeline. | `Empty` |
| onClick | function(target) | Function invoked when is clicked on a timeline item. The parameter target references the event represented by the clicked timeline item.  | `Empty` |
| vertical | Boolean | If vertical is equal to 'true' the timeline is diplayed vertically, else is displayed horizontally. | `true` |

### Events

Event objects have the following properties:

| Name | Value Type | Description | Default | Mandatory |
|------|------------|-------------|---------|---------|
| title | String | Name of the event, for example: 'Coffe time'. | "" |  Yes |
| time | Date | Time when the event is going to happen. | Today |  Yes |
| body | String | Event's description. | "" |  No |
| icon | String | Use any stylesheet to reference icons using the class attr. (For example, Fontawesome) | fa fa-question | Yes |
| type | String | Used for style puropses. Adds color to the icon and to the border-top of the 'timeline-panel'. The default possibilities are: 'primary', 'danger', 'success', 'info' | 'info' | No |

### Event tempaltes

#### Default template
```html
<div class="timeline-badge"><i class="icon"></i></div> 
<div class="timeline-panel">
    <div class="timeline-heading">
        <h4 class="timeline-title title"></h4>
        <p><i class="text-muted fa fa-clock"></i> <small class="time text-muted"></small></p>
    </div>
    <div class="timeline-body">
        <small class="body"></small>
    </div>
</div>
```

#### Defining new templates
- Templates must have two main objects:
    - The `.timeline-badge` div element with the nested `.icon`.
    - The `.timeline-panel` div, with the nested elements `timeline-title title` div and the `.time` small element.

- Each class name corresponds to the properties of event object. For example, if an event object has the property 'priority', the value of this property will be rendered inside the template element which its class contains 'priority'.

### Example

#### JS Code

```javascript
$(document).ready(function () {
    var timeline = new Timeline($(".here-goes-the-timeline"), {
        eventArray : [
        {
            title: "Coffee time",
            time: new Date("2015-03-25T8:00:00Z"),
            icon: "fa fa-coffee",
        },
        {
            title: "University",
            time: new Date("2015-03-25T9:00:00Z"),
            icon: "fa fa-book",

        },
        {
            title: "Launch time",
            time: new Date("2015-03-25T12:00:00Z"),
            icon: "fa fa-utensils",
            type: "warning"

        },
        {
            title: "Play Overwatch",
            time: new Date("2015-03-25T17:00:00Z"),
            icon: "fa fa-gamepad",
            type: "success"
        },
        ],
        dateDisplay: function (date) {
            return "Day " + date.getDate() + ", " + 
                (String(date.getHours()).length === 1 ? "0" + date.getHours() : date.getHours()) + ":" +
                (String(date.getMinutes()).length === 1 ? "0" + date.getMinutes() : date.getMinutes());
        }
    });
});
```

#### Output
The output which corresponds to the previous code, using the following [stylesheet](/example/css/style.css) is:

[example-output](/example/output/example.png)