from plone.app.registry.browser.controlpanel import RegistryEditForm
from plone.app.registry.browser.controlpanel import ControlPanelFormWrapper

from plonetheme.jqueryui.interfaces import IJQueryUIThemeSettings
from plone.z3cform import layout

class JQueryUIThemeControlPanelForm(RegistryEditForm):
    schema = IJQueryUIThemeSettings

JQueryUIThemeControlPanelView = layout.wrap_form(JQueryUIThemeControlPanelForm,
                                     ControlPanelFormWrapper)
