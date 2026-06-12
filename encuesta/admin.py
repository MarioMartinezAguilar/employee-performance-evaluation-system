from django.contrib import admin
from .models import Employees, Question, Choice, Answer

# Register your models here.
#admin.site.register(Employees)
@admin.register(Employees)
class EmployeesAdmin(admin.ModelAdmin):
    list_display = ('name', 'job_position', 'payroll_number', 'gender')
    search_fields = ('name', 'payroll_number', 'union_number')
    list_filter = ('gender', 'job_position')
# admin.site.register(Question)
@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question_text', 'order')
    ordering = ('order',)
    list_editable = ('order',)

# admin.site.register(Choice)
@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('question', 'text')
    list_filter = ('question',)
    search_fields = ('text',)
admin.site.register(Answer)
""" @admin.register(Answer)
class ResponseAdmin(admin.ModelAdmin):
    list_display = ('employee', 'question', 'choice')
    list_filter = ('question', 'employee')
    search_fields = ('employee__name', 'question__question_text')
 """