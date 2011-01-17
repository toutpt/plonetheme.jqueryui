from zope import interface
from zope import schema
from zope.schema import vocabulary

from plonetheme.jqueryui import i18n
from plonetheme.jqueryui import config

#TODO: add themes from plone.resource
themes = []
themes.append(vocabulary.SimpleVocabulary.createTerm(config.BASE_THEMEID,config.BASE_THEMEID,config.BASE_THEMEID))
#themes.append(vocabulary.SimpleVocabulary.createTerm(config.CUSTOM_THEMEID,config.CUSTOM_THEMEID,config.CUSTOM_THEMEID))
#for theme in config.PRELOADEDS:
#    themes.append(vocabulary.SimpleTerm(theme, theme, theme))
theme_vocabulary = vocabulary.SimpleVocabulary(themes)

THEME_RESOURCE_NAME = "jqueryuitheme"

class IJQueryUIThemeLayer(interface.Interface):
    """Browser layer"""

class IJQueryUIThemeSettings(interface.Interface):
    """JQueryUIThem settings"""

#    version = schema.ASCIILine(title=i18n.label_version,
#                               description=i18n.desc_version)
#
#    cdn = schema.ASCIILine(title=i18n.label_cdn,
#                           description=i18n.desc_cdn,
#                           default=config.CDN_URL,
#                           required=False)

    theme = schema.Choice(title=i18n.label_theme,
                          required=True,
                          vocabulary=theme_vocabulary)


#class IJQueryUITheme(interface.Interface):
#    """Define a JQuery UI Theme"""
#    
#    def getURL():
#        """Return the url of the theme"""
#    
#    def update(url):
#        """Update this object from url"""
#    
#    #Fonts
#    fwDefault = schema.ASCIILine(title=i18n.fwDefault,
#                                 default='normal')
#    ffDefault = schema.ASCIILine(title=i18n.ffDefault,
#                                 default='Arial,FreeSans,sans-serif')
#    fsDefault = schema.ASCIILine(title=i18n.fsDefault,
#                                 default='1.2em')
#    
#    #corner
#    cornerRadius = schema.ASCIILine(title=i18n.cornerRadius,
#                                 default='5px')
#    
#    #header/toolbar
#    bgColorHeader = schema.TextLine(title=i18n.bgColorHeader,
#                                 default=u'#dddddd')
#    bgImgOpacityHeader = schema.ASCIILine(title=i18n.bgImgOpacityHeader,
#                                 default='75')
#    bgTextureHeader = schema.ASCIILine(title=i18n.bgTextureHeader,
#                                 default='01_flat.png')
#    borderColorHeader = schema.ASCIILine(title=i18n.borderColorHeader,
#                                 default='cccccc')
#    iconColorHeader = schema.ASCIILine(title=i18n.iconColorHeader,
#                                 default='205c90')
#    fcHeader = schema.ASCIILine(title=i18n.fcHeader,
#                                 default='444444')
#    
#    #content
#    bgColorContent = schema.ASCIILine(title=i18n.bgColorContent,
#                                 default='ffffff')
#    bgImgOpacityContent = schema.ASCIILine(title=i18n.bgImgOpacityContent,
#                                 default='100')
#    bgTextureContent = schema.ASCIILine(title=i18n.bgTextureContent,
#                                 default='01_flat.png')
#    borderColorContent = schema.ASCIILine(title=i18n.borderColorContent,
#                                 default='cccccc')
#    iconColorContent = schema.ASCIILine(title=i18n.iconColorContent,
#                                 default='205c90')
#    fcContent = schema.ASCIILine(title=i18n.fcContent,
#                                 default='444444')
#    
#    #clickable default state
#    bgColorDefault = schema.ASCIILine(title=i18n.bgColorDefault,
#                                 default='')
#    bgImgOpacityDefault = schema.ASCIILine(title=i18n.bgImgOpacityDefault,
#                                 default='')
#    bgTextureDefault = schema.ASCIILine(title=i18n.bgTextureDefault,
#                                 default='')
#    borderColorDefault = schema.ASCIILine(title=i18n.borderColorDefault,
#                                 default='')
#    iconColorDefault = schema.ASCIILine(title=i18n.iconColorDefault,
#                                 default='')
#    fcDefault = schema.ASCIILine(title=i18n.fcDefault,
#                                 default='')
#
#    #clickable hover state
#    bgColorHover = schema.ASCIILine(title=i18n.bgColorHover,
#                                 default='')
#    bgImgOpacityHover = schema.ASCIILine(title=i18n.bgImgOpacityHover,
#                                 default='')
#    bgTextureHover = schema.ASCIILine(title=i18n.bgTextureHover,
#                                 default='normal')
#    borderColorHover = schema.ASCIILine(title=i18n.borderColorHover,
#                                 default='')
#    iconColorHover = schema.ASCIILine(title=i18n.iconColorHover,
#                                 default='')
#    fcHover = schema.ASCIILine(title=i18n.fcHover,
#                                 default='')
#    
#    #clickable active state
#    fcActive = schema.ASCIILine(title=i18n.fcActive,
#                                 default='')
#    iconColorActive = schema.ASCIILine(title=i18n.iconColorActive,
#                                 default='')
#    borderColorActive = schema.ASCIILine(title=i18n.borderColorActive,
#                                 default='')
#    bgColorActive = schema.ASCIILine(title=i18n.bgColorActive,
#                                 default='')
#    bgTextureActive = schema.ASCIILine(title=i18n.bgTextureActive,
#                                 default='')
#    bgImgOpacityActive = schema.ASCIILine(title=i18n.bgImgOpacityActive,
#                                 default='')
#
#    #highlight
#    fcHighlight = schema.ASCIILine(title=i18n.fcHighlight,
#                                 default='')
#    borderColorHighlight = schema.ASCIILine(title=i18n.borderColorHighlight,
#                                 default='')
#    bgImgOpacityHighlight = schema.ASCIILine(title=i18n.bgImgOpacityHighlight,
#                                 default='')
#    iconColorHighlight = schema.ASCIILine(title=i18n.iconColorHighlight,
#                                 default='')
#    bgColorHighlight = schema.ASCIILine(title=i18n.bgColorHighlight,
#                                 default='')
#    bgTextureHighlight = schema.ASCIILine(title=i18n.bgTextureHighlight,
#                                 default='')
#
#    #error
#    bgColorError = schema.ASCIILine(title=i18n.bgColorError,
#                                 default='')
#    bgImgOpacityError = schema.ASCIILine(title=i18n.bgImgOpacityError,
#                                 default='')
#    fcError = schema.ASCIILine(title=i18n.fcError,
#                                 default='')
#    bgTextureError = schema.ASCIILine(title=i18n.bgTextureError,
#                                 default='')
#    borderColorError = schema.ASCIILine(title=i18n.borderColorError,
#                                 default='')
#    iconColorError = schema.ASCIILine(title=i18n.iconColorError,
#                                 default='')
#
#    #modal screen for overlay
#    bgTextureOverlay = schema.ASCIILine(title=i18n.bgTextureOverlay,
#                                 default='')
#    bgImgOpacityOverlay = schema.ASCIILine(title=i18n.bgImgOpacityOverlay,
#                                 default='')
#    bgColorOverlay = schema.ASCIILine(title=i18n.bgColorOverlay,
#                                 default='')
#    opacityOverlay = schema.ASCIILine(title=i18n.opacityOverlay,
#                                 default='')
#
#    #drop shadows
#    bgTextureShadow = schema.ASCIILine(title=i18n.bgTextureShadow,
#                                 default='')
#    thicknessShadow = schema.ASCIILine(title=i18n.thicknessShadow,
#                                 default='')
#    opacityShadow = schema.ASCIILine(title=i18n.opacityShadow,
#                                 default='')
#    bgColorShadow = schema.ASCIILine(title=i18n.bgColorShadow,
#                                 default='')
#    offsetLeftShadow = schema.ASCIILine(title=i18n.offsetLeftShadow,
#                                 default='')
#    bgImgOpacityShadow = schema.ASCIILine(title=i18n.bgImgOpacityShadow,
#                                 default='')
#    offsetTopShadow = schema.ASCIILine(title=i18n.offsetTopShadow,
#                                 default='')
#    cornerRadiusShadow = schema.ASCIILine(title=i18n.cornerRadiusShadow,
#                                 default='5px')
#
#from plone.autoform.interfaces import WIDGETS_KEY
#
#COLOR_WIDGETS = {}
#for i in config.THEME_SETTINGS:
#    if 'color' not in i.lower():continue
#    COLOR_WIDGETS[i] = 'collective.z3cform.colorpicker.colorpicker.ColorpickerFieldWidget'
#
#IJQueryUITheme.setTaggedValue(WIDGETS_KEY, COLOR_WIDGETS)
