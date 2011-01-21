// copy pasted from zettwerk.ui



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
             jq(this).after(template);
             }
         });
};

var forms_are_enabled = false; // gets set via tool.js()
var enableForms = function($content) {
    if (!$content) {
        var $content = jq('body');
    }

    $content.find('input,select,textarea').addClass('ui-widget-content ui-corner-all ui-button-text hover');

    $content.find('select, textarea, input:text, input:password').bind({
        focusin: function() {
            jq(this).addClass('ui-state-focus');
        },
        focusout: function() {
            jq(this).removeClass('ui-state-focus');
        }
    });

    // buttons
    jq("input:submit").button();
    jq("button").button();
}


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

var enableStateHover = function(){
    jq('#portal-personaltools').hover(function() {
        jq(this).removeClass('ui-state-default').addClass('ui-state-hover');
    }, function() {
        jq(this).removeClass('ui-state-hover').addClass('ui-state-default');
    });
    jq('#portal-personaltools dd a').hover(function() {
        jq(this).removeClass('ui-state-default').addClass('ui-state-hover');
    }, function() {
        jq(this).removeClass('ui-state-hover').addClass('ui-state-default');
    });
    jq('#portal-globalnav li').hover(function() {
        jq(this).removeClass('ui-state-default').addClass('ui-state-hover');
    }, function() {
        jq(this).removeClass('ui-state-hover').addClass('ui-state-default');
    });
    jq('#content-views li').hover(function() {
        jq(this).removeClass('ui-state-default').addClass('ui-state-hover');
    }, function() {
        jq(this).removeClass('ui-state-hover').addClass('ui-state-default');
    });
    jq('.actionMenuContent li').hover(function() {
        jq(this).removeClass('ui-state-default').addClass('ui-state-hover');
    }, function() {
        jq(this).removeClass('ui-state-hover').addClass('ui-state-default');
    });
    jq('.contentActionMenus li').hover(function() {
        jq(this).removeClass('ui-state-default').addClass('ui-state-hover');
    }, function() {
        jq(this).removeClass('ui-state-hover').addClass('ui-state-default');
    });

}

jq(document).ready(function() {
    enableStateHover();
    enableStatusMessage();
    enableForms();

});
