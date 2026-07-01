from django.urls import path, include
from rest_framework import routers
from encuesta import views
from rest_framework_simplejwt.views import(TokenObtainPairView,TokenRefreshView)

# api versioning
router = routers.DefaultRouter()
router.register(r'employees',views.EmployeesView, 'employees')
router.register(r'questions', views.QuestionView, 'questions')
router.register(r'answer', views.AnswerView, 'answer')


urlpatterns = [
    *router.urls,
    path('results/', views.results_view, name="results"),
    #path('test-chart/',views.test_chart, name="test-chart")
    path('report/', views.generate_report, name="report"),
    path('pdf-report/', views.pdf_report, name='pdf-report'),
    path('dashboard-stats/', views.dashboard_stats, name='dashboard-stats'),
    path('employee-gender/', views.employee_gender, name='employee-gender'),
    path('export-employees/', views.export_employees_excel, name='export-employees'),
    # rutas para tokens
    path('token/', TokenObtainPairView.as_view(),name='token_obtain_pair'), 
    path('token/refresh/', TokenRefreshView.as_view(),name='token_refresh'), 
]


