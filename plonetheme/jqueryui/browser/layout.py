from plone.app.layout.globals import layout as base

class LayoutPolicy(base.LayoutPolicy):

    def bodyClass(self, template, view):
        body_class = super(LayoutPolicy, self).bodyClass(template, view)
        body_class += ' ui-widget'
        return body_class
