from zope import component
from plone.registry.interfaces import IRecordModifiedEvent
from plonetheme.jqueryui import interfaces

@component.adapter(interfaces.IJQueryUIThemeSettings, IRecordModifiedEvent)
def handle_registry_modified(settings, event):
    #FIRST: remove old resource
    oldcdn = oldversion = oldtheme = None
    if event.record.fieldName == 'version':
        oldversion = event.oldValue
        oldcdn = settings.cdn
        oldtheme = settings.theme
    elif event.record.fieldName == 'cdn':
        oldcdn = event.oldValue
        oldversion = settings.version
        oldtheme = settings.theme
    elif event.record.fieldName == 'theme':
        oldtheme = event.oldValue
        oldcdn = settings.cdn
        oldversion = settings.version

    plone = component.getSiteManager()
    csstool = plone.portal_css
    try:
        old_resource = oldcdn%(oldversion, oldtheme)
        csstool.unregisterResource(old_resource)
    except:
        pass

    #NEXT: add the new one
    csstool.registerStylesheet(settings.cdn%(settings.version, settings.theme))
    csstool.cookResources()