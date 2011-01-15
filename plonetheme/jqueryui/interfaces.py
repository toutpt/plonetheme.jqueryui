from zope import interface
from zope import schema

from plonetheme.jqueryui import i18n

class IJQueryUIThemeLayer(interface.Interface):
    """Browser layer"""

class IJQueryUIThemeSettings(interface.Interface):
    """JQueryUIThem settings"""

    version = schema.ASCIILine(title=i18n.label_version,
                               description=i18n.desc_version)

    cdn = schema.ASCIILine(title=i18n.label_cdn,
                           description=i18n.desc_cdn,
                           required=False)

    theme = schema.ASCIILine(title=i18n.label_theme,
                             required=False)
