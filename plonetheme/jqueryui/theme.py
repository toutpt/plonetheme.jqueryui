from urlparse import urlparse
from urllib import urlencode, urlopen

from zope import component
from zope import interface
from zope.schema.interfaces import IVocabularyFactory
from zope.schema.vocabulary import SimpleTerm
from zope.schema.vocabulary import SimpleVocabulary
from zope.site.hooks import getSite

from plone.registry.interfaces import IRegistry

from plonetheme.jqueryui import config
from plonetheme.jqueryui import interfaces
from plonetheme.jqueryui import controlpanel

BASE = "http://jqueryui.com/themeroller/?ctl=themeroller&"

class JQueryUIThemeVocabulary(object):
    """Vocabulary factory for jqueryui themes.
    """
    interface.implements(IVocabularyFactory)

    def __call__(self, context):
        items = []
        site = getSite()
        themeContainer = controlpanel.getOrCreatePersistentResourceDirectory()
        items = [str(themeid) for themeid in themeContainer['css'].listDirectory()]
        items = [SimpleTerm(i, i, i) for i in items]
        items.insert(0, SimpleTerm('collective.js.jqueryui', 'collective.js.jqueryui', 'collective.js.jqueryui'))
        items.insert(0, SimpleTerm('sunburst', 'sunburst', 'sunburst'))
        return SimpleVocabulary(items)

JQueryUIThemeVocabularyFactory = JQueryUIThemeVocabulary()

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

