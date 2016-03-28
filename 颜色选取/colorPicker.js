/**
* @github https://github.com/evoluteur/colorpicker
*/

(function($) {
    $.fn.colorPicker = function(options) {
        options = options || {};
        
        var clickHandlerId      = this.attr('id');
        var colorPickerId       = clickHandlerId + '_color_picker';
        var colorPickerSelector = '#' + colorPickerId;
        var selectedColor       = options.initColor || '#000000';
        var firstShow           = true;
        this.die("click");
		this.live("click", function(){	
            if (!document.getElementById(colorPickerId)) {
                var colors      = [
                    '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ffffff', '#ebebeb', 
                    '#e1e1e1', '#d7d7d7', '#cccccc', '#c2c2c2', '#b7b7b7', '#acacac', '#a0a0a0', '#959595',
                    '#ee1d24', '#fff100', '#00a650', '#00aeef', '#2f3192', '#ed008c', '#898989', '#7d7d7d', 
                    '#707070', '#626262', '#555555', '#464646', '#363636', '#262626', '#111111', '#000000',
                    '#f7977a', '#fbad82', '#fdc68c', '#fff799', '#c6df9c', '#a4d49d', '#81ca9d', '#7bcdc9', 
                    '#6ccff7', '#7ca6db', '#8293ca', '#8881be', '#a286bd', '#bc8cbf', '#f49bc1', '#f5999d',
                    '#f16c4d', '#f68e54', '#fbaf5a', '#fff467', '#acd372', '#7dc473', '#39b778', '#16bcb4', 
                    '#00bff3', '#438ccb', '#5573b7', '#5e5ca7', '#855fa8', '#a763a9', '#ef6ea8', '#f16d7e',
                    '#ee1d24', '#f16522', '#f7941d', '#fff100', '#8fc63d', '#37b44a', '#00a650', '#00a99e', 
                    '#00aeef', '#0072bc', '#0054a5', '#2f3192', '#652c91', '#91278f', '#ed008c', '#ee105a',
                    '#9d0a0f', '#a1410d', '#a36209', '#aba000', '#588528', '#197b30', '#007236', '#00736a', 
                    '#0076a4', '#004a80', '#003370', '#1d1363', '#450e61', '#62055f', '#9e005c', '#9d0039',
                    '#790000', '#7b3000', '#7c4900', '#827a00', '#3e6617', '#045f20', '#005824', '#005951', 
                    '#005b7e', '#003562', '#002056', '#0c004b', '#3000ab', '#4b0048', '#7a0045', '#7a0026'
                ];
                var colorValue  = '#000000';
                var htmlDataArr = [
                    '<div id="', colorPickerId, '" class="color_picker" style="top:', top , '; left:', left, ';">',
                        '<table>',
                            '<thead>',
                                '<tr><td colspan="16" class="color_cell"></td></tr>',
                            '</thead>',
                            '<tbody>'
                ];
                for (var i = 0; i < 7; ++i) {
                    htmlDataArr.push('<tr>');
                    for (var j = 0; j < 16; ++j) {
                        colorValue = colors[i * 16 + j];
                        htmlDataArr.push('<td class="color_cell" color="' + colorValue + '" style="background-color:' + colorValue + '"></td>');
                    }
                    htmlDataArr.push('</tr>');
                }
                htmlDataArr.push([
                            '</tbody>',
                        '</table>',
                    '</div>'
                ].join(''));
                $(document.body).append(htmlDataArr.join(''));
                
                $(document).click(function(event) {
                    if ($(event.target).attr('id') != clickHandlerId) {
                        self.inShow = false;
                        $(colorPickerSelector)
                            .trigger('mouseout')
                            .hide();
                    }
                });
                $(colorPickerSelector).mouseout(function() {
                    $(colorPickerSelector + ' thead .color_cell').css('background-color', selectedColor);
                });
                $(colorPickerSelector + ' .color_cell')
                    .hover(function(event, color) {
                        $(colorPickerSelector + ' thead .color_cell').css('background-color', color || $(this).attr('color'));
                    })
                    .click(function() {
                        selectedColor = $(this).attr('color');
                        options.click(selectedColor);
                    });
            }
            
            if (self.inShow) {
                self.inShow = false;
                $(colorPickerSelector)
                    .trigger('mouseout')
                    .hide();
                return;
            } else {
                self.inShow = true;
            }
            var $colorPickerEl  = $(colorPickerSelector);
            var posObj          = $(this).offset();
            var top             = posObj.top  - $colorPickerEl.outerHeight() + 6 + 'px';
            var left            = posObj.left - 1 + 'px';
            delete posObj; posObj = null;
            
            $colorPickerEl.css('top',  top);
            $colorPickerEl.css('left', left);
            if (firstShow) {
                $(colorPickerSelector + ' thead .color_cell').css('background-color', options.initColor);
                firstShow = false;
            }
            $colorPickerEl.show();
            delete $colorPickerEl; $colorPickerEl = null;
        });
    };
}(jQuery));