from plone.app.registry.browser.controlpanel import RegistryEditForm
from plone.app.registry.browser.controlpanel import ControlPanelFormWrapper

from plonetheme.jqueryui import interfaces
from plonetheme.jqueryui import i18n
from plonetheme.jqueryui import config
from plone.z3cform import layout


class MainControlPanelForm(RegistryEditForm):
    schema = interfaces.IJQueryUIThemeSettings

MainControlPanelView = layout.wrap_form(MainControlPanelForm,
                                     ControlPanelFormWrapper)
MainControlPanelView.label = i18n.maincontrolpanel_label


class CustomControlPanelForm(RegistryEditForm):
    schema = interfaces.IJQueryUITheme

#    schema['bgColorHeader'].widgetFactory = ColorpickerFieldWidget
#    for i in config.THEME_SETTINGS:
#        if 'color' in i.lower():
#            schema[i].widgetFactory = ColorpickerFieldWidget

CustomControlPanelView = layout.wrap_form(CustomControlPanelForm,
                                     ControlPanelFormWrapper)
CustomControlPanelView.label = i18n.customcontrolpanel_label
