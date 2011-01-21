from plone.app.contentmenu import view
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile

class ContentMenuProvider(view.ContentMenuProvider):
    index = ViewPageTemplateFile('contentmenu.pt')
    