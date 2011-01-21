// copy pasted from zettwerk.ui

// little helper to get width of hidden elements
jQuery.fn.evenIfHidden = function( callback ) {
    return this.each( function() {
    var self = jq(this);
    var styleBackups = [];
    
    var hiddenElements = self.parents().andSelf().filter(':hidden');
    
    if ( ! hiddenElements.length ) {
        callback( self );
        return true; //continue the loop
    }
    
    hiddenElements.each( function() {
        var style = jq(this).attr('style');
        style = typeof style == 'undefined'? '': style;
        styleBackups.push( style );
        jq(this).attr( 'style', style + ' display: block !important;' );
    });
    
    hiddenElements.eq(0).css( 'left', -10000 );
    
    callback(self);
    
    hiddenElements.each( function() {
        jq(this).attr( 'style', styleBackups.shift() );
    });
    });
};

var rulesToRemove = {};

// this builds a data structure of all rules to remove
// its called by every "part" which must remove some of the
// default css rules of plone.
var removeRule = function(selector, styleCSS, styleJS) {
    if (!document.styleSheets[0]['cssRules']) { // IE don't like combined rules - they must be splitted
        if (selector.indexOf(', ') != -1) {
            var parts = selector.split(', ');
            for (var p=0; p<parts.length; p++) {
                removeRule(parts[p], styleCSS, styleJS);
            }
        }
    }
    if (rulesToRemove[selector]) {
        rulesToRemove[selector].push([styleCSS, styleJS]);
    } else {
        rulesToRemove[selector] = [[styleCSS, styleJS]];
    }
};

var getRulesOfSheetDOM = function(sheet) {
    try {
	
    if (sheet.cssRules[0].cssRules) {
        return sheet.cssRules[0].cssRules;
    }
    if (sheet.cssRules[0].styleSheet && sheet.cssRules[0].styleSheet.cssRules.length && sheet.cssRules[0].styleSheet.cssRules[0].cssRules) {

        return sheet.cssRules[0].styleSheet.cssRules[0].cssRules;
    }
    } catch (e) {}
    return [];
}

var getRulesOfSheetIE = function(sheet) {
    if (sheet.imports && sheet.imports.length) {
    return sheet.imports[0].rules;
    } else {
    return sheet.rules;
    }
}

// this uses the populated rulesToRemove list to remove
// (hopefully efficentally) the rules from the style objects
var removeRules = function() {
    if (document.styleSheets[0]['cssRules']) { // FF/Dom Variant
        for(var i=0; i<document.styleSheets.length; i++) {
            var sheet = document.styleSheets[i];
        var rules = getRulesOfSheetDOM(sheet);
        for (var j=0; j<rules.length; j++) {
        for (var selector in rulesToRemove) {
                    if (rules[j].selectorText == selector) {
            // we found the selector - now look at the style setting
            for (var s=0; s<rulesToRemove[selector].length; s++) {
                            var rule = rules[j];
                            var styleCSS = rulesToRemove[selector][s][0];
                            var styleJS = rulesToRemove[selector][s][1];
                            for (var k=0; k<rule.style.length; k++) {
                if (rule.style[k] == styleCSS) {
                                    rule.style[styleJS] = null;
                }
                            }
            }
                    }
        }
        }
        }
    }
    else { // IE variant
    for(var i=0; i<document.styleSheets.length; i++) {
            var sheet = document.styleSheets[i];
        var rules = getRulesOfSheetIE(sheet);
            for (var j=0; j<rules.length; j++) {
                for (var selector in rulesToRemove) {
                    if (rules[j].selectorText.toLowerCase() == selector.toLowerCase()) {
                        for (var s=0; s<rulesToRemove[selector].length; s++) {
                            var styleJS = rulesToRemove[selector][s][1];
                try {
                                rules[j].style[styleJS] = '';
                } catch(e) { null }; // somes are added for chrome and causing problems here
                        }
                    }
                }
            }
        }
    }
};

var enableFonts = function() {
/*    jq('body').addClass('ui-widget');
    removeRule('h1, h2, h3, h4, h5, h6', 'font-family', 'fontFamily');
    removeRule('#content .documentDescription, #content #description', 'font', 'font'); // needed for chrome
    removeRule('#content .documentDescription, #content #description', 'font-family', 'fontFamily');
*/
}

var enablePersonalTool = function() {
/*    removeRule('#portal-personaltools', 'background-color', 'backgroundColor');
    removeRule('#portal-personaltools', 'background-position', 'backgroundPosition');
    removeRule('#portal-personaltools', 'background-repeat', 'backgroundRepeat');
    removeRule('#portal-personaltools', 'background-image', 'backgroundImage');
    removeRule('#portal-personaltools dt.actionMenuHeader a:focus, #portal-personaltools dt.actionMenuHeader a:hover', 'color', 'color');
    removeRule('#portal-personaltools', '-moz-border-radius-bottomleft', 'MozBorderRadiusBottomleft');
    removeRule('#portal-personaltools', '-moz-border-radius-bottomright', 'MozBorderRadiusBottomright');

    jq('#portal-personaltools').addClass('ui-helper-reset ui-state-default ui-corner-bottom').hover(function() {
        jq(this).addClass('ui-state-hover');
    }, function() {
        jq(this).removeClass('ui-state-hover');
    });

    removeRule('#portal-personaltools dd', 'background-color', 'backgroundColor');
    removeRule('#portal-personaltools dd', 'background-position', 'backgroundPosition');
    removeRule('#portal-personaltools dd', 'background-repeat', 'backgroundRepeat');
    removeRule('#portal-personaltools dd', 'background-image', 'backgroundImage');
    removeRule('#portal-personaltools dd a:hover', 'background-color', 'backgroundColor');
    removeRule('#portal-personaltools dd a:hover', 'background-position', 'backgroundPosition');
    removeRule('#portal-personaltools dd a:hover', 'background-repeat', 'backgroundRepeat');
    removeRule('#portal-personaltools dd a:hover', 'background-image', 'backgroundImage');
    removeRule('#portal-personaltools dd a:hover', 'color', 'color');
    jq('#portal-personaltools dd').addClass('ui-helper-reset ui-state-default ui-corner-all').css('top', '22px');
    jq('#portal-personaltools dd a').hover(function() {
        jq(this).addClass('ui-state-hover');
    }, function() {
        jq(this).removeClass('ui-state-hover');
    });
*/

};

var enableStatusMessage = function() {
    var $status = jq('dl.portalMessage.info,dl.portalMessage.warning,dl.portalMessage.error');
    $status.each(function() {
             if (jq(this).attr('id') != 'kssPortalMessage') {
             jq(this).hide(); // hide the plone message
             var label = jq(this).find('dt').html();
             var content = jq(this).find('dd').html();
             if (jq(this).hasClass('error')) {
                 var template = '<div class="ui-custom-status-container ui-state-error ui-corner-all"><p><span style="float: left; margin-right: 0.3em;" class="ui-icon ui-icon-alert"></span><strong>'+label+'</strong>\n'+content+'</p></div>';
             } else {
                 var template = '<div class="ui-custom-status-container ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: 0.3em;" class="ui-icon ui-icon-info"></span><strong>'+label+'</strong>\n'+content+'</p></div>';
             }
             jq('#viewlet-above-content').after(template);
             }
         });
};

var forms_are_enabled = false; // gets set via tool.js()
var enableForms = function($content) {
    if (!$content) {
    var $content = jq('body');
    }

    $content.find('.optionsToggle').removeClass('optionsToggle');
    $content.find('input,select,textarea').addClass('ui-widget-content ui-corner-all ui-button-text hover');
//    $content.find('input,select,textarea').wrap('<span class="ui-button-text-only"></span>').css({'padding-left': '4px', 'padding-right': '4px'});
    
    $content.find('select, textarea, input:text, input:password').bind({
    focusin: function() {
            jq(this).addClass('ui-state-focus');
        },
        focusout: function() {
            jq(this).removeClass('ui-state-focus');
        }
    });

    $content.find('input:checkbox').each(function() {
        var $label = jq('<label />').insertBefore(jq(this));
        jq(this).hide();
        $label.css({width:16,height:16,display:"inline-block"});
        $label.wrap('<span class="ui-widget-content ui-corner-all" style="display:inline-block;width:16px;height:16px;margin-right:5px;"/>');
    if (jq(this).attr('disabled')) {
            $label.parent().addClass('ui-state-disabled');
    } else {
        $label.parent().addClass('hover');
            $label.parent("span").click(function(event) {
        jq(this).toggleClass("ui-state-active");
        $label.toggleClass("ui-icon ui-icon-check");

        // see http://www.bennadel.com/blog/1525-jQuery-s-Event-Triggering-Order-Of-Default-Behavior-And-triggerHandler-.htm
        // for why to not use .click() here
        jq(this).next()[0].checked = !jq(this).next()[0].checked;
        jq(this).next().triggerHandler("click");
        });
        }
    // initialize already checked ones
    if (jq(this).attr('checked')) {
        $label.parent("span").toggleClass("ui-state-active");
        $label.toggleClass("ui-icon ui-icon-check");
    }
    });

    $content.find('input:radio').each(function() {
    var $label = jq('<label />').insertBefore(jq(this));
    jq(this).hide();
    $label.addClass("ui-icon ui-icon-radio-off");
    $label.wrap('<span class="ui-widget-content ui-corner-all" style="display:inline-block;width:16px;height:16px;margin-right:5px;"/>');
    if (jq(this).attr('disabled')) {
            $label.parent().addClass('ui-state-disabled');
    } else {
        $label.parent().addClass('hover');
        $label.parent("span").click(function(event) {
        if (jq(this).next().attr('checked')) {
            return // do nothing, if radiobox is already checked
        }
        // disable other radios of this group
        var radio_name = jq(this).parent().find('input:radio').attr('name');
        var radio_value = jq(this).parent().find('input:radio').val(); 
        $content.find('input:radio[name='+radio_name+']').each(function() {
            if (jq(this).val() != radio_value && jq(this).attr('checked')) {
            jq(this).parent().find('label').parent('span').toggleClass("ui-state-active");
            jq(this).parent().find('label').toggleClass("ui-icon-radio-off ui-icon-bullet");
            jq(this).next().click();
            }
        });
        // check this radio
        jq(this).toggleClass("ui-state-active");
        $label.toggleClass("ui-icon-radio-off ui-icon-bullet");
        jq(this).next().click();
        });
    };
    // initialize already checked ones
    if (jq(this).attr('checked')) {
        $label.parent("span").toggleClass("ui-state-active");
        $label.toggleClass("ui-icon-radio-off ui-icon-bullet");
    }
    });

    $content.find(".hover").hover(function(){
        jq(this).addClass("ui-state-hover");
    },function(){
        jq(this).removeClass("ui-state-hover");
    });

    // buttons
    jq("input:submit").button();
    jq("button").button();

    // and livesearch
    removeRule('input.inputLabelActive', 'color', 'color');
    removeRule('#livesearchLegend', 'background-color', 'backgroundColor');
    
    jq('#LSResult').css('z-index', '100');
    jq('#LSShadow').addClass('ui-corner-all ui-state-focus');
}

var enableDialogs = function() {
    jq("a.link-overlay").unbind('click').click(function() {
        // remove old dialogs
        jq('#dialogContainer').remove();

        // use the links content as default title of the dialog
        var title = jq(this).html();
        $.get(jq(this).attr('href'),
              {},
          function(data) {
          showDialogContent(data,title)
          }
         );
        return false; // avoid the execution of the regular link
    });
};

var showDialogContent = function(data, title) {
    var $content = jq(data).find('#content');

    // take the first heading as dialog title, if available
    $content.find('h1.documentFirstHeading').each(function() {
        title = jq(this).html();
        jq(this).hide();
    });
    jq('<div id="dialogContainer" title="'+title+'"></div>').appendTo('body');
    
    // search for submit buttons and use them as dialog buttons
    var buttons = {};
    $content.find('input[type=submit]').each(function() {
        var buttonValue = jq(this).val();
        buttons[buttonValue] = function() {
            jq('input[type=submit][value='+buttonValue+']').click();
        };
        jq(this).hide();
    });
    
    // bring up the dialog
    $content.appendTo('#dialogContainer');
    if (forms_are_enabled) {
    enableForms($content);
    }
    var $dialog = jq('#dialogContainer').dialog({width: '60%', buttons: buttons});
};

var enableTabs = function() {
    removeRule('#content a:visited, dl.portlet a:visited', 'color', 'color');
    removeRule('#content a:link, dl.portlet a:link', 'color', 'color');
    removeRule('#content a:hover, dl.portlet a:hover', 'color', 'color');
    removeRule('#content a:focus, #content a:hover, dl.portlet a:focus, dl.portlet a:hover', 'color', 'color');

    jq('<div class="ui-tabs ui-widget ui-widget-content ui-corner-all"></div>').insertBefore(jq('ul.formTabs'));
    jq('ul.formTabs').appendTo('div.ui-tabs');

    jq('.enableFormTabbing fieldset').appendTo('div.ui-tabs');
    jq('dl.enableFormTabbing').appendTo('div.ui-tabs');

    jq('ul.formTabs').addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-top').removeClass('formTabs');
    jq('div.ui-tabs ul li.formTab').addClass('ui-state-default ui-corner-top').removeClass('formTab').css('display', 'inline').hover(function() {
        jq(this).addClass('ui-state-hover');
    }, function() {
        jq(this).removeClass('ui-state-hover');
    });
    jq('div.ui-tabs li a').click(function() {
        jq(this).parent().parent().find('.ui-state-active').removeClass('ui-state-active');
        jq(this).parent().addClass('ui-state-active');
    });
    jq('ul.ui-tabs-nav').find('.selected').parent().addClass('ui-state-active');
};

var enableGlobalTabs = function() {
  /*
    removeRule('#portal-globalnav', 'background-color', 'backgroundColor');
    removeRule('#portal-globalnav', 'background-position', 'backgroundPosition');
    removeRule('#portal-globalnav', 'background-repeat', 'backgroundRepeat');
    removeRule('#portal-globalnav', 'background-image', 'backgroundImage');

    removeRule('#portal-globalnav li a', 'background-color', 'backgroundColor');
    removeRule('#portal-globalnav li a', 'background-position', 'backgroundPosition');
    removeRule('#portal-globalnav li a', 'background-repeat', 'backgroundRepeat');
    removeRule('#portal-globalnav li a', 'background-image', 'backgroundImage');

    removeRule('#portal-globalnav .selected a, #portal-globalnav a:hover', 'background-color', 'backgroundColor');
    removeRule('#portal-globalnav .selected a, #portal-globalnav a:hover', 'background-position', 'backgroundPosition');
    removeRule('#portal-globalnav .selected a, #portal-globalnav a:hover', 'background-repeat', 'backgroundRepeat');
    removeRule('#portal-globalnav .selected a, #portal-globalnav a:hover', 'background-image', 'backgroundImage');

    removeRule('#portal-globalnav .selected a, #portal-globalnav a:focus, #portal-globalnav a:hover', 'background-color', 'backgroundColor');
    removeRule('#portal-globalnav .selected a, #portal-globalnav a:focus, #portal-globalnav a:hover', 'color', 'color');
    removeRule('#portal-globalnav .selected a:focus, #portal-globalnav .selected a:hover', 'background-color', 'backgroundColor');
    removeRule('#portal-globalnav .selected a:focus, #portal-globalnav .selected a:hover', 'color', 'color');

    removeRule('#portal-globalnav .selected a:hover', 'background-color', 'backgroundColor');
    removeRule('#portal-globalnav .selected a:hover', 'background-position', 'backgroundPosition');
    removeRule('#portal-globalnav .selected a:hover', 'background-repeat', 'backgroundRepeat');
    removeRule('#portal-globalnav .selected a:hover', 'background-image', 'backgroundImage');
    removeRule('#portal-globalnav .selected a:hover', 'color', 'color');

    removeRule('#portal-globalnav .selected a, #portal-globalnav a:hover', 'color', 'color');

/*    jq('<div id="ui-globalnav" class="ui-bottonset"></div>').insertBefore('#portal-globalnav');
    jq('#portal-globalnav').appendTo('#ui-globalnav');

    jq('#portal-globalnav').addClass('ui-state-default ui-corner-all');

    jq('#portal-globalnav li').addClass('ui-button ui-widget ui-state-default ui-botton-text-only').css('border', '0px solid black').hover(function() {
        jq(this).addClass('ui-state-hover');
    }, function() {
        jq(this).removeClass('ui-state-hover');
    });
    jq('#portal-globalnav li a').addClass('ui-button-text');
    jq('#portal-globalnav').find('.selected').addClass('ui-state-active');
    jq('#portal-globalnav li.ui-button').css('margin-right', '0px');
    */
    jq('#portal-globalnav li:first').addClass('ui-corner-left');
    
};

var enablePortlets = function() {
    removeRule('dl.portlet dt, div.portletAssignments div.portletHeader', 'background-color', 'backgroundColor');
    removeRule('dl.portlet dt, div.portletAssignments div.portletHeader', 'background-position', 'backgroundPosition');
    removeRule('dl.portlet dt, div.portletAssignments div.portletHeader', 'background-repeat', 'backgroundRepeat');
    removeRule('dl.portlet dt, div.portletAssignments div.portletHeader', 'background-image', 'backgroundImage');

    // special navportlet styling
    removeRule('div.managePortletsLink, a.managePortletsFallback', 'background-color', 'backgroundColor');
    removeRule('div.managePortletsLink, a.managePortletsFallback', 'background-position', 'backgroundPosition');
    removeRule('div.managePortletsLink, a.managePortletsFallback', 'background-repeat', 'backgroundRepeat');
    removeRule('div.managePortletsLink, a.managePortletsFallback', 'background-image', 'backgroundImage');
    jq('dl.portlet ul.navTree .navTreeCurrentItem').removeClass('navTreeCurrentItem').css('font-weight', 'bold');

    // special calendar styling
    // TODO: apply this after kss request
    jq('dl.portletCalendar .todaynoevent').removeClass('todaynoevent').addClass('ui-state-highlight');
    jq('dl.portletCalendar .event').removeClass('event').addClass('ui-state-default');
    removeRule('.ploneCalendar .weekdays th', 'background-color', 'backgroundColor');

    removeRule('dl.portlet dt a:link, dl.portlet dt a:visited, dl.portlet dt a:hover', 'color', 'color');

    jq('.portletHeader').addClass('ui-state-default ui-corner-all').removeClass('portletHeader');
    jq('dl.portlet').addClass('ui-widget-content ui-corner-all ui-helper-reset');
    jq('dl.portlet dt').css('margin', '4px')
    jq('.managePortletsLink').button();
};

var enableFooter = function() {
/*    removeRule('#portal-footer', 'background-color', 'backgroundColor');
    removeRule('#portal-footer', 'background-position', 'backgroundPosition');
    removeRule('#portal-footer', 'background-repeat', 'backgroundRepeat');
    removeRule('#portal-footer', 'background-image', 'backgroundImage');

    jq('#portal-footer').addClass('ui-state-active ui-corner-all');
*/
};

var edit_bar_interval = null;
var enableEditBar = function() {
    removeRule('#edit-bar', 'background-color', 'backgroundColor');
    removeRule('#edit-bar', 'border-left-color-value', 'borderLeftColor');
    removeRule('#edit-bar', 'border-left-width-value', 'borderLeftWidth');
    removeRule('#edit-bar', 'border-right-color-value', 'borderRightColor');
    removeRule('#edit-bar', 'border-right-width-value', 'borderRightWidth');
    removeRule('#edit-bar', 'border-left-color', 'borderLeftColor'); // needed for chrome
    removeRule('#edit-bar', 'border-left-width', 'borderLeftWidth'); // needed for chrome
    removeRule('#edit-bar', 'border-right-color', 'borderRightColor'); // needed for chrome
    removeRule('#edit-bar', 'border-right-width', 'borderRightWidth'); // needed for chrome
    removeRule('#edit-bar', 'border-top-color', 'borderTopColor');
    removeRule('#edit-bar', 'border-top-width', 'borderTopWidth');
    removeRule('#edit-bar, #content ul.formTabs', '-moz-border-radius-topleft', 'MozBorderRadiusTopleft');
    removeRule('#edit-bar, #content ul.formTabs', '-moz-border-radius-topright', 'MozBorderRadiusTopright');

    // left actions
    removeRule('#content-views', 'background-color', 'backgroundColor');
    removeRule('#content-views a', 'color', 'color');
    removeRule('#content-views li.selected a, #content-views li a:hover, #content li.formTab a.selected, #content li.formTab a:hover', 'background-color', 'backgroundColor');
    removeRule('#content-views li.selected a, #content-views li a:hover, #content li.formTab a.selected, #content li.formTab a:hover', 'background-image', 'backgroundImage');
    removeRule('#content-views li.selected a, #content-views li a:hover, #content li.formTab a.selected, #content li.formTab a:hover', 'background-position', 'backgroundPosition');
    removeRule('#content-views li.selected a, #content-views li a:hover, #content li.formTab a.selected, #content li.formTab a:hover', 'color', 'color');

    // right actions
    removeRule('#contentActionMenus', 'background-color', 'backgroundColor');
    removeRule('#contentActionMenus', '-moz-border-radius-topright', 'MozBorderRadiusTopright');
    removeRule('#contentActionMenus', 'border-top-right-radius', 'borderTopRightRadius');
                
    removeRule('#contentActionMenus dl.actionMenu a, #contentActionMenus dl.actionMenu.activated dd', 'background-color', 'backgroundColor');
    removeRule('#contentActionMenus dl.actionMenu a, #contentActionMenus dl.actionMenu.activated dd', 'color', 'color');

    removeRule('#contentActionMenus dl.actionMenu.activated dd', 'border-bottom-color', 'borderBottomColor');
    removeRule('#contentActionMenus dl.actionMenu.activated dd', 'border-bottom-style', 'borderBottomStyle');
    removeRule('#contentActionMenus dl.actionMenu.activated dd', 'border-bottom-width', 'borderBottomWidth');

    removeRule('#contentActionMenus dl.actionMenu.activated dd a:hover, #contentActionMenus dl.actionMenu.activated dd .actionMenuSelected', 'background-color', 'backgroundColor');
    removeRule('#contentActionMenus dl.actionMenu.activated dd a:hover, #contentActionMenus dl.actionMenu.activated dd .actionMenuSelected', 'color', 'color');
    removeRule('#contentActionMenus dl.actionMenu a:focus, #contentActionMenus dl.actionMenu a:hover', 'color', 'color');

    edit_bar_interval = window.setInterval('enableEditBar2()', 100);
}

var enableEditBar2 = function() {
    if (jq('#edit-bar').length) {
    window.clearInterval(edit_bar_interval);

    // using inverted colors
    jq('#edit-bar').addClass('ui-state-active ui-corner-top');
    jq('#content-views li.selected a').addClass('ui-state-default');
    jq('#content-views li a').hover(function() {
        jq(this).addClass('ui-state-hover');
    }, function() {
        jq(this).removeClass('ui-state-hover');
    });

    //jq('#contentActionMenus dd.actionMenuContent').addClass('ui-state-active ui-corner-bottom').css('right', '-1px').css('border-top', '0px').css('padding', '2px');
    var extra_spacer_height = jq('#edit-bar').height();
    jq('<div style="height: '+extra_spacer_height+'px" id="ui-spacer"></div>').insertAfter(jq('#content-views'));
    jq('#contentActionMenus').addClass('ui-state-active ui-corner-bottom').css('border', '0px').css('padding-right', '0px').css('right', '-1px').css('top', '0px');
    jq('#contentActionMenus li dl').css('margin', '0px').css('margin-left', '5px').find('a').css('font-weight', 'bold');
    jq('#contentActionMenus li dl:last').css('margin-left', '0px');  // the first is the last?

    jq('#contentActionMenus dl.actionMenu').hover(function() {
        jq(this).addClass('ui-state-hover ui-corner-bottom').css('border', '0px');
    }, function() {
        jq(this).removeClass('ui-state-hover ui-corner-bttom');
    });

    jq('#contentActionMenus a.actionMenuSelected').addClass('ui-state-default ui-corner-all');
    jq('#contentActionMenus a').hover(function() {
        jq(this).addClass('ui-state-hover ui-corner-all').css('border', '0px');
    }, function() {
        jq(this).removeClass('ui-state-hover ui-corner-all');
    });

    jq('dd.actionMenuContent').addClass('ui-state-active');
    jq('dd.actionMenuContent li a').css('padding-left', '3px').css('padding-right', '3px');
    }
}
jq(document).ready(function() {
    jq('#portal-personaltools').hover(function() {
        jq(this).addClass('ui-state-hover');
    }, function() {
        jq(this).removeClass('ui-state-hover');
    });
    jq('#portal-personaltools dd a').hover(function() {
        jq(this).addClass('ui-state-hover');
    }, function() {
        jq(this).removeClass('ui-state-hover');
    });
    jq('#portal-globalnav li').addClass('ui-button ui-widget ui-state-default ui-botton-text-only').css('border', '0px solid black').hover(function() {
        jq(this).addClass('ui-state-hover');
    }, function() {
        jq(this).removeClass('ui-state-hover');
    });
//    enableForms();

    jq('#content-views li a').hover(function() {
        jq(this).addClass('ui-state-hover');
    }, function() {
        jq(this).removeClass('ui-state-hover');
    });


});
