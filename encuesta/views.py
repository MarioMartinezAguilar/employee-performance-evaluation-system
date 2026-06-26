from rest_framework import viewsets,status,mixins
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes
)
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializer import EmployeesSerializer ,QuestionSerializer, AnswerSerializer
from .models import Employees , Question , Answer
from .utils import (
    get_results_data, 
    get_employees_gender_stats,
    create_chart, 
    generate_all_charts, 
    create_pdf_reports,
    generate_employees_excel
)
from django.http import JsonResponse, FileResponse, HttpResponse



# Create your views here.
""" class EmployeesView(viewsets.ModelViewSet):
    serializer_class = EmployeesSerializer
    queryset = Employees.objects.all() """
    
class EmployeesView(
    mixins.CreateModelMixin,
    viewsets.GenericViewSet
):
    serializer_class = EmployeesSerializer
    queryset = Employees.objects.all()

# vamos a crear el viewSet pero como la encuesta va hacer fija nada mas
# tenemos que usar el método get nada mas para mostrar solo lectura
# es decir solo método GET entonces esta vista es diferente asi(solo lectura)
class QuestionView(viewsets.ReadOnlyModelViewSet):
    queryset = Question.objects.all().order_by('order')
    serializer_class = QuestionSerializer
    
class AnswerView(mixins.CreateModelMixin,viewsets.GenericViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

    def create(self, request, *args, **kwargs):
        many = isinstance(request.data, list)  #  detecta si es una lista

        serializer = self.get_serializer(data=request.data, many=many)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

#vista para reportes
@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def results_view(request):
    data = get_results_data()
    return JsonResponse(data)

""" def test_chart(request):
    data = get_results_data()
    # tomar solo la primera pregunta
    question = list(data.keys())[0]
    choices = data[question]
    file = create_chart(question, choices)
    return JsonResponse({
        "message": "Gráfica creada",
        "file": file
    }) 
"""   

# vista para generar el reporte de todas las gráficas cuando entre a la ruta
@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def generate_report(request):
    files = generate_all_charts()
    return JsonResponse({
        "message": "Reporte generado correctamente",
        "files": files
    })


# function para crear la vista de pdf
""" def pdf_report(request):
    pdf_file = create_pdf_reports()
    return JsonResponse({
        "message": "PDF generado correctamente",
        "file": pdf_file
    }) """
    
# function para crear la vista para generar la descarga del pdf
@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def pdf_report(request):
    pdf_file = create_pdf_reports()
    return FileResponse(
        open(pdf_file, 'rb'),
        as_attachment=True,
        filename='report.pdf'
        
    )
    
# vista para contar los empleados las preguntas y respuestas
# (resumen rápido del dashboard)
@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    employees_count = Employees.objects.count() # contamos los registro de empleados, preguntas y respuestas
    questions_count = Question.objects.count()
    answers_count = Answer.objects.count()
    
    return JsonResponse({
        'employees': employees_count,
        'questions': questions_count,
        'answers': answers_count
    })
    
# vista para el sexo de los empleados
@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def employee_gender(request):
    data = get_employees_gender_stats()
    return JsonResponse(data)


#vista para exportar el pdf
@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def export_employees_excel(request):
    # vamos a ejecutar la function para generar el excel
    wb = generate_employees_excel()
    #creamos la respuesta HTTP
    response = HttpResponse(
        #vamos a decirle al navegador que enviaremos un archivo de excel
        #content_type tipo MIME del archivo
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    #nombre del archivo le dice al navegador no abras el contenido
    #en pantalla Descárgalo como archivo y el nombre del archivo sera
    #empleados.xlsx
    response['Content-Disposition'] = (
        'attachment; filename=empleados.xlsx'
    )
    # guardamos el archivo en la respuesta
    wb.save(response)
    #retornamos la respuesta
    return response