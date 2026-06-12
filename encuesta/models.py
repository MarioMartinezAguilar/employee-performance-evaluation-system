from django.db import models
from django.core.exceptions import ValidationError


GENDER_OPTS = (
    ('Masculino','Masculino'),
    ('Femenino','Femenino')
)
# Create your models here.
class Employees(models.Model):
    name = models.CharField(max_length=100)
    job_position = models.CharField(max_length=100)
    payroll_number = models.CharField(max_length=30)
    gender = models.CharField(choices=GENDER_OPTS,max_length=20)
    union_number = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)

    # vamos a mostrar solamente el nombre del empleado en admin de Django
    def __str__(self):
        return self.name
     
# MODELO DE LAS PREGUNTAS
class Question(models.Model):
    question_text=models.CharField(max_length=255)
    order = models.PositiveIntegerField()

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.question_text

#modelo para las opciones de pregunta
class Choice(models.Model):
    question = models.ForeignKey(Question, related_name='choices',on_delete=models.CASCADE)
    text = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.question.question_text} - {self.text}"
    
#MODELO DE RESPUESTAS
class Answer(models.Model):
    employee = models.ForeignKey('Employees', on_delete=models.CASCADE, related_name='responses')
    question = models.ForeignKey('Question',on_delete=models.CASCADE)
    choice = models.ForeignKey('Choice', on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('employee', 'question')

    def clean(self):
            if self.choice.question != self.question:
                raise ValidationError("La opción no pertenece a la pregunta")

    def __str__(self):
            return f"{self.employee.name} - {self.question.question_text}"