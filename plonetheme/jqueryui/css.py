from zope import component
from plone.registry.interfaces import IRecordModifiedEvent
from plonetheme.jqueryui import interfaces

@component.adapter(interfaces.IJQueryUIThemeSettings, IRecordModifiedEvent)
def handle_registry_modified(settings, event):
    #FIRST: remove old resource
    oldtheme = None
    if event.record.fieldName == 'theme':
        oldtheme = event.oldValue

    plone = component.getSiteManager()
    csstool = plone.portal_css
    try:
        old_resource = oldcdn%(oldversion, oldtheme)
        csstool.unregisterResource(old_resource)
    except:
        pass

    #NEXT: add the new one
    try:
        csstool.registerStylesheet(settings.cdn%(settings.version, settings.theme))
        csstool.cookResources()
    except:
        pass
