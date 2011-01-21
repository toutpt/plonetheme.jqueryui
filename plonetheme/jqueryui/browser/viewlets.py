from plone.app.layout.viewlets import common
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile

class PersonalBarViewlet(common.PersonalBarViewlet):
    index = ViewPageTemplateFile('personal_bar.pt')

class GlobalSectionsViewlet(common.GlobalSectionsViewlet):
    index = ViewPageTemplateFile('sections.pt')

class FooterViewlet(common.FooterViewlet):
    index = ViewPageTemplateFile('footer.pt')

class ContentViewsViewlet(common.ContentViewsViewlet):
    index = ViewPageTemplateFile('contentviews.pt')