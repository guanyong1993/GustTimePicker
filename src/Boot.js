/**
 * Created by GuanYong on 16/9/1.
 */

/**
 * 时间选择控件
 * @constructor GustTimePicker
 * @param dom {Object} 需要显示时间选择控件的文档对象(jQuery元素)
 */
var GustTimePicker = function (dom) {
    var open = false, container, self = this, currentTime;

    var getCursorPosition = function (el){
        return {start: el.selectionStart, length: el.selectionEnd - el.selectionStart};
    };

    this.onOpen = function () {
        open = true;

        var body = $(document.body);
        var x = dom.offset().left;
        var y = dom.offset().top + dom.outerHeight();
        if (dom[0].offsetParent.tagName.toLocaleLowerCase() != 'body') {
            x = x - body.offset().left;
            y = y - body.offset().top;
        }

        var maxX = body.width() - 140;
        var maxY = body.height() - 108;
        if (x > maxX) {
            x = maxX;
        }
        if (y > maxY) {
            y = maxY;
        }

        container = $('<div id="__gust_time_picker_container" style="left: ' + x + 'px; top: ' + y + 'px">' +
            '<div class="item hour">' +
                '<div class="minus">-</div>' +
                '<div class="value">' +
                    '<input type="text" class="text hour-text"/>' +
                '</div>' +
                '<div class="raise">+</div>' +
            '</div>' +
            '<div class="item minute">' +
                '<div class="minus">-</div>' +
                '<div class="value">' +
                    '<input type="text" class="text minute-text"/>' +
                '</div>' +
                '<div class="raise">+</div>' +
            '</div>' +
            '<div class="confirm">确定</div>' +
            '</div>').appendTo(body);

        var timeFormats = dom.val().split(':');

        if (null != timeFormats && timeFormats.length == 2) {
            currentTime = {
                hour: parseInt(timeFormats[0]),
                minute: parseInt(timeFormats[1])
            };
        } else {
            var date = new Date();
            currentTime = {
                hour: date.getHours(),
                minute: date.getMinutes()
            };
        }

        var hour = currentTime.hour < 10 ? '0' + currentTime.hour : currentTime.hour;
        var minute = currentTime.minute < 10 ? '0' + currentTime.minute : currentTime.minute;
        container.find('.hour .text').val(hour);
        container.find('.minute .text').val(minute);

        dom.val(hour + ':' + minute);

        var self = this;

        container.find('.hour .minus').click(function () {
            self.minus(1);
        });
        container.find('.hour .raise').click(function () {
            self.raise(1);
        });
        container.find('.text').focus(function () {
            $(this).select();
        });
        container.find('.text').keydown(function (e) {
            var el = $(this);
            var isNumberKey = (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105);
            var isCursorKey = e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 39;

            if (!isCursorKey) {
                if (isNumberKey) {
                    var numberKey = e.keyCode >= 96 ? e.keyCode - 96 : e.keyCode - 48;
                    var maxValue = 60;
                    if (el.hasClass('hour-text')) {
                        maxValue = 24;
                    }

                    var cursorPosition = getCursorPosition(this);
                    var lastVal = el.val();
                    lastVal = lastVal.split('');
                    lastVal.splice(cursorPosition.start, cursorPosition.length, numberKey + '');
                    var value = lastVal.join('');
                    value = parseInt(value);

                    if (value < maxValue) {
                        el.val(value);
                    }
                }
                return false;
            }
        });

        container.find('.text').keyup(function () {
            var el = $(this);
            var value = parseInt(el.val());
            if (isNaN(value)) {
                value = 0;
            }
            if (el.hasClass('hour-text')) {
                currentTime.hour = value;
            } else {
                currentTime.minute = value;
            }
            var hour = currentTime.hour < 10 ? '0' + currentTime.hour : currentTime.hour;
            var minute = currentTime.minute < 10 ? '0' + currentTime.minute : currentTime.minute;
            dom.val(hour + ':' + minute);
        });

        container.find('.text').blur(function () {
            var el = $(this);
            var value = parseInt(el.val());
            if (isNaN(value)) {
                if (el.hasClass('hour-text')) {
                    value = currentTime.hour;
                } else {
                    value = currentTime.minute;
                }
            }
            if (value < 10) {
                value = '0' + value;
            }
            el.val(value);
        });

        container.find('.minute .minus').click(function () {
            self.minus(2);
        });
        container.find('.minute .raise').click(function () {
            self.raise(2);
        });

        container.find('.confirm').click(function () {
            self.onClose();
        });
    };

    this.onClose = function () {
        open = false;

        if (null != container) {
            container.empty();
            container.remove();
        }
    };
    
    this.openDelegate = function () {
        if (!open) {
            self.onOpen();
        }
    };

    this.closeDelegate = function(e) {
        if (open) {
            if ($(e.target).closest(container).length == 0) {
                self.onClose();
            }
        }
    };
    
    this.enable = function () {
        dom[0].addEventListener('click', this.openDelegate, true);
        document.body.addEventListener('click', this.closeDelegate, true);
    };
    
    this.destroy = function () {
        dom[0].removeEventListener('click', this.openDelegate, true);
        document.body.removeEventListener('click', this.closeDelegate, true);
        this.onClose();

        container = null;
        self = null;
        dom = null;
    };

    var changeTime = function (type, value) {
        var newHour, newMinute;
        if (type == 'hour' || type == 1) {
            newHour = currentTime.hour + value;
            if (newHour < 0) {
                newHour = 23;
            } else if (newHour > 23) {
                newHour = 0;
            }
            newMinute = currentTime.minute;
        } else {
            newMinute = currentTime.minute + value;
            if (newMinute < 0) {
                newMinute = 59;
            } else if (newMinute > 59) {
                newMinute = 0;
            }
            newHour = currentTime.hour;
        }

        currentTime = {
            hour: newHour,
            minute: newMinute
        };

        var hour = currentTime.hour < 10 ? '0' + currentTime.hour : currentTime.hour;
        var minute = currentTime.minute < 10 ? '0' + currentTime.minute : currentTime.minute;
        container.find('.hour .text').val(hour);
        container.find('.minute .text').val(minute);
        dom.val(hour + ':' + minute);
    };

    this.minus = function (type) {
        changeTime(type, -1);
    };

    this.raise = function (type) {
        changeTime(type, 1);
    };
};