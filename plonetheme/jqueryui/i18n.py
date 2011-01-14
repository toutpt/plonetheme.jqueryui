from zope.i18nmessageid import MessageFactory

messageFactory = MessageFactory("plonetheme.jqueryui")
_ = messageFactory

label_version = _(u"label_version", default=u"JQuery UI Version")
desc_version = _(u"desc_version", default=u"Specify the version of jqueryui used")

label_cdn = _(u"label_cdn", default=u"CDN to use")
desc_cdn = _(u"desc_cdn", default=u"Default is http://ajax.googleapis.com/ajax/libs/jqueryui/%s/themes/%s/jquery-ui.css")

label_theme = _(u"label_theme", default=u"Theme")