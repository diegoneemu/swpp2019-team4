from django.urls import path, re_path, include
from assaapp import views

urlpatterns = [
    path('token/', views.api_token),
    path('signup/', views.api_signup),
    path('signin/', views.api_signin),
    path('signout/', views.api_signout),
    re_path(r'^verify/(?P<uidb64>[0-9A-Za-z_\-]+)/'
            r'(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', views.api_verify),
    path('user/', views.api_user),
    path('user/friend/', views.api_user_friend),
    path('user/friend/<int:user_id>/', views.api_user_friend_id),
    path('user/friend/search/', views.api_user_search),
    path('timetable/', views.api_timetable),
    path('timetable/main/<int:timetable_id>', views.api_timetable_main_id),
    path('timetable/<int:timetable_id>/', views.api_timetable_id, name='timetable_id'),
    path('timetable/<int:timetable_id>/course/',
         views.api_timetable_id_course, name='timetable_id_course'),
    path('timetable/<int:timetable_id>/customCourse/',
         views.api_timetable_id_custom_course, name='timetable_id_custom_course'),
    path('customCourse/<int:custom_course_id>/',
         views.api_custom_course_id, name='custom_course_id'),
    path('course/', views.api_course, name='course'),
    path('building/', views.api_building, name='building'),
    path('recommend/', include('recommend.urls'))
]
