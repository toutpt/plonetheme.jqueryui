from urlparse import urlparse
from urllib import urlencode, urlopen

from zope import component
from zope import interface
from plone.registry.interfaces import IRegistry

from plonetheme.jqueryui import config
from plonetheme.jqueryui import interfaces
BASE = "http://jqueryui.com/themeroller/?ctl=themeroller&"

class JQueryUITheme(object):
    """Base object represent a jqueryui theme loaded from registry"""
    interface.implements(interfaces.IJQueryUITheme)
    def __init__(self):
        self.registry = component.getUtility(IRegistry)
        self.settings = self.registry.forInterface(interfaces.IJQueryUIThemeSettings)

    def getURL(self):
        if self.settings.theme in config.PRELOADEDS:
            return BASE+urlencode(self.asDict())
        else:
            #TODO
            pass

    def asDict(self):
        #TODO
        return {'a':'a'}
    
    def update(self, url):
        if not url.startswith(BASE):
            return
        css = urlopen(url).read()
        #TODO
