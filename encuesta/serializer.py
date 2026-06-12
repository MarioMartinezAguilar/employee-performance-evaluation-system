from rest_framework import serializers
from .models import Employees, Choice , Question,Answer

class EmployeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = '__all__'
        
        
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id','text']

# serializer anidado
class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'order', 'choices']
        
# serializer que se llenara desde React
class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'employee', 'question', 'choice']
    def validate(self, data):
        if data['choice'].question != data['question']:
            raise serializers.ValidationError("La opción no pertenece a la pregunta")
        return data

