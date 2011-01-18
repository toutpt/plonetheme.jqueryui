from zope import component
from plone.registry.interfaces import IRecordModifiedEvent
from plonetheme.jqueryui import interfaces
from plonetheme.jqueryui import controlpanel
from plonetheme.jqueryui import logger
from zExceptions import NotFound

@component.adapter(interfaces.IJQueryUIThemeSettings, IRecordModifiedEvent)
def handle_registry_modified(settings, event):
    #FIRST: remove old resource
    oldtheme = None
    if event.record.fieldName == 'theme':
        unregister_theme(event.oldValue)
        register_theme(settings.theme)

def unregister_theme(themeid):
    if themeid == 'sunburst':
        return
    elif themeid == 'collective.js.jqueryui':
        return

    #a theme in persistent directory
    plone = component.getSiteManager()
    csstool = plone.portal_css
    BASE = 'portal_resources/%s/css/'%interfaces.THEME_RESOURCE_NAME
    themeContainer = controlpanel.getOrCreatePersistentResourceDirectory()
    try:
        import pdb;pdb.set_trace()
        ids = themeContainer['css'][themeid].listDirectory()
        css_id = None
        for id in ids:
            if id.endswith('css'):
                css_id = id
        old_resource = BASE+themeid+'/'+css_id
        csstool.unregisterResource(old_resource)
    except NotFound, e:
        logger.info('the new theme has not been found in resource directory')
    except Exception, e:
        logger.error(e)

def register_theme(themeid):
    if themeid == 'sunburst':
        return
    elif themeid == 'collective.js.jqueryui':
        return

    #a theme in persistent directory
    plone = component.getSiteManager()
    csstool = plone.portal_css
    BASE = 'portal_resources/%s/css/'%interfaces.THEME_RESOURCE_NAME
    themeContainer = controlpanel.getOrCreatePersistentResourceDirectory()
    try:
        ids = themeContainer['css'][themeid].listDirectory()
        css_id = None
        for id in ids:
            if id.endswith('css'):
                css_id = id
        resource = BASE+themeid+'/'+css_id
        csstool.registerStylesheet(resource)
        csstool.cookResources()
    except NotFound, e:
        logger.info('the new theme has not been found in resource directory')
    except Exception, e:
        logger.error(e)

