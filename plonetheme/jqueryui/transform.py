from zope.interface import implements, Interface
from zope.component import adapts

from plone.transformchain.interfaces import ITransform
from plonetheme.jqueryui.interfaces import IJQueryUIThemeLayer

class JQueryUITransform(object):
    implements(ITransform)
    adapts(Interface, IJQueryUIThemeLayer) # any context, any request

    order = 8900

    def __init__(self, published, request):
        self.published = published
        self.request = request

    def transformBytes(self, result, encoding):
        return result

    def transformUnicode(self, result, encoding):
        return result

    def transformIterable(self, result, encoding):
        return result
