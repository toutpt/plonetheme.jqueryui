import logging
import zipfile

from zope import component
from zope import interface
from zope import schema

from plone.resource.interfaces import IResourceDirectory
from plone.z3cform import layout

from plone.app.registry.browser.controlpanel import RegistryEditForm
from plone.app.registry.browser.controlpanel import ControlPanelFormWrapper

from plonetheme.jqueryui import interfaces
from plonetheme.jqueryui import i18n
from plonetheme.jqueryui import config
from Products.Five.browser import BrowserView
from Products.Five.browser.decode import processInputs



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


class ImportThemeForm(BrowserView):

    def __call__(self):
        if self.update():
            return self.index()
        return ''

    def authorize(self):
        authenticator = component.getMultiAdapter((self.context, self.request), name=u"authenticator")
        if not authenticator.verify():
            raise Unauthorized
    
    def update(self):
        self.errors = {}
        processInputs(self.request)
        form = self.request.form

        if 'form.button.Import' in form:
            self.authorize()
            submitted = True
            themeArchive = form.get('themeArchive', None)
            themeZip = None
            performImport = False
            
            try:
                themeZip = zipfile.ZipFile(themeArchive)
            except (zipfile.BadZipfile, zipfile.LargeZipFile,):
                logger.exception("Could not read zip file")
                self.errors['themeArchive'] = _('error_invalid_zip', 
                        default=u"The uploaded file is not a valid Zip archive"
                    )
            
            if themeZip:
                try:
                    infos = extractThemeInfo(themeZip)
                except (ValueError, KeyError,), e:
                    logger.warn(str(e))
                    self.errors['themeArchive'] = u"error_jqueryui_file"
                else:
                    themeContainer = getOrCreatePersistentResourceDirectory()
                themeContainer.importZip(themeZip)
                for i in ('index.html', 'development-bundle', 'js'):
                    del themeContainer[i]

        return True

import os

def extractThemeInfo(zipfile):
    """return a dict with info about the theme"""
    infos = {}

    for name in zipfile.namelist():
        member = zipfile.getinfo(name)
        path = member.filename.lstrip('/')
        starter = path.split('/')[0]
        if starter =='css' and 'name' not in infos:
            infos['name'] = path.split('/')[1]
        if starter == 'js' and 'version' not in infos:
            basename = os.path.basename(path)
            if basename.startswith('jquery-ui'):
                infos['version'] = basename[len('jquery-ui-'):len('.custom.min.js')]
    return infos

def getOrCreatePersistentResourceDirectory():
    """Obtain the 'theme' persistent resource directory, creating it if
    necessary.
    """
    
    persistentDirectory = component.getUtility(IResourceDirectory, name="persistent")
    if interfaces.THEME_RESOURCE_NAME not in persistentDirectory:
        persistentDirectory.makeDirectory(interfaces.THEME_RESOURCE_NAME)

    return persistentDirectory[interfaces.THEME_RESOURCE_NAME]
