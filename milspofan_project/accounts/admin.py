from django.contrib import admin
from .models import MemberProfile, MemberLocation, MemberSocialLink
from django.contrib.auth.admin import UserAdmin

# add custom member forms to django admin panel
class MyUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'name_on_blog', 'artist_bio', 'website', 'image_url', 'hashtags')
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'name_on_blog', 'email', 'artist_bio', 'website', 'image_url', 'hashtags')}
        ),
    )


admin.site.register(MemberProfile, MyUserAdmin)
admin.site.register(MemberLocation)
admin.site.register(MemberSocialLink)
