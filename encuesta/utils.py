import os
from django.utils import timezone
from  .models import Answer, Employees
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, HRFlowable,KeepTogether,Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums  import TA_CENTER
from datetime import datetime
from openpyxl import Workbook
from openpyxl.styles import Font
#import textwrap
# function para traer la data organizada
def get_results_data():
    data={}
    answer = Answer.objects.select_related('question', 'choice')
    
    #recorremos con un for las preguntas con sus respuestas
    for a in answer:
        question = a.question.question_text #por cada pregunta traes el texto(question_text)
        choice = a.choice.text #por cada option vas a traer el choice_text(option de radio)
        
        #lógica si la pregunta no existe
        if question not in data:
            data[question] = {}
            
        #lógica si la option no existe
        if choice not in data[question]:
            data[question][choice] = 0 # nos dice que cero es decir nadie contesto esa option
        
        #contamos las opciones con las preguntas(que empleados contestaron esa option en esa pregunta)
        data[question][choice] += 1
    return data # finalmente retornamos la data al mismo nivel en el ciclo for 

#crear la función para generar la gráfica 
def create_chart(question, choices, filename):
    labels = list(choices.keys())
    values = list(choices.values())
    total = sum(values)
    #creamos la figura en blanco
    plt.figure(figsize=(10,6))
    # plt.bar(labels, values)
    bars = plt.bar(labels, values,color='#2563EB')
    plt.ylim(0, max(values) + 1)
    for bar in bars:
        height = bar.get_height() 
        percentage = (height / total) * 100
        plt.text(
            bar.get_x() + bar.get_width() / 2,
            height +(total * 0.02),
            f'{percentage:.1f}%',
            ha='center',
            va='bottom'
        )
        """ wrapped_title = "\n".join(
            textwrap.wrap(question, 40)
        ) """
    #plt.title(wrapped_title)
    #plt.subplots_adjust(top=0.85)
    plt.ylabel("Cantidad de respuestas")
    plt.xticks(rotation=30, ha='right')
    #generamos la imagen(archivo)
    plt.tight_layout()
    plt.savefig(filename)
    plt.close()
    return filename

# función para recorrer todas las preguntas
# genera una gráfica por pregunta
# guarda todas las imagen chart.png
# devuelve una lista de archivos
def generate_all_charts():
    data = get_results_data()
    files = []
    for i, (question, choices) in enumerate(data.items()):
        filename = os.path.join(
                'media',
                'reports',
                f'chart_{i}.png'
            )
        create_chart(question, choices, filename)
        files.append({
            'question': question,
            'file': filename
        })
    return files

# function para pdf
def create_pdf_reports():
    pdf_path = 'media/reports/report.pdf'
    
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize = letter,
        title="Reporte De Evaluación",
        author="Mario Martínez Aguilar",
        subject="Resultados De Evaluación",
    )
    
    styles = getSampleStyleSheet()
    
    question_style = ParagraphStyle(
        'QuestionStyle',
        parent=styles['Heading2'],
        alignment=TA_CENTER,
        textColor='#1E3A8A',
        spaceAfter=15
    )
        
    
    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Title'],
        alignment=TA_CENTER,
        fontSize=24,
        leading=30, # espaciado entre lineas
        textColor='#1E3A8A'
    )
    center_style = ParagraphStyle(
        'CenterStyle',
        parent=styles['Normal'],
        alignment=TA_CENTER
    )
    institution_style = ParagraphStyle(
        'InstitutionStyle',
        parent=styles['Heading1'],
        alignment=TA_CENTER,
        textColor='#374151'
    )
    
    elements = []
    
    logo = Image(
        'media/logo2.png',
        width=150,
        height=120
    )
    logo.hAlign = 'CENTER'
    elements.append(logo)
    elements.append(Spacer(1,50))
    
    institution = Paragraph(
        "PRESIDENCIA MUNICIPAL",
        institution_style
    )
    elements.append(institution)
    elements.append(Spacer(1,30))
    
    title = Paragraph(
        "Reporte De Evaluación<br/> De Desempeño Laboral",
        title_style
    )
    elements.append(title)
    elements.append(Spacer(1,50))
    # CREAR LA LINEA DIVISORIA
    line = HRFlowable(
        width= "100%", # ANCHO COMPLETO
        thickness=2, # GROSOR
        color="#1E3A8A" # COLOR
    )
    elements.append(line)
    elements.append(Spacer(1, 30))
    
    # datetime.now()-> fecha actual strftime formato de fecha
    current_date = datetime.now().strftime("%d/%m/%Y")
    date_paragraph = Paragraph(
        f"Fecha de generación: {current_date}",
        center_style
    )
    
    elements.append(date_paragraph)
    elements.append(Spacer(1, 50))
    elements.append(Spacer(1, 20))
    
    chart_files = generate_all_charts()
    
    for chart_data in chart_files:
        section = []
        question = chart_data['question']
        chart_file = chart_data['file']
        question_paragraph = Paragraph(
            question,
            question_style
        )
        
        section.append(question_paragraph)
        #elements.append(question_paragraph)
        section.append(Spacer(1, 10))
        #elements.append(Spacer(1, 10))
        img = Image(chart_file, width=400, height=250)
        section.append(img)
        """ img = Image('media/reports/chart_0.png', width=400, height=300) """
        #elements.append(img)
        section.append(Spacer(1,20))
        #elements.append(Spacer(1, 20))
        # CREAR LA LINEA DIVISORIA
        line = HRFlowable(
            width= "100%", # ANCHO COMPLETO
            thickness=2, # GROSOR
            color="#1E3A8A" # COLOR
        )
        #elements.append(line)
        section.append(line)
        section.append(Spacer(1,20))
        #elements.append(Spacer(1,20))
        elements.append(
            KeepTogether(section)
        )
    
    elements.append(PageBreak())    
    # crear tabla
    summary_title = Paragraph(
        "Resumen General",
        title_style
    )
    elements.append(summary_title)
    elements.append(Spacer(1, 20))
        
    table_data = [
        ['Pregunta', 'Resultado Principal'] # -> crear encabezado de la tabla
    ]

    data = get_results_data()
    table_style_text = ParagraphStyle(
        'TableText',
        fontSize=10,
        leading=14,
        alignment=TA_CENTER
    )
    for question,choices in data.items():
        top_choice = max( #->> buscar el valor máximo
            choices,
            key=choices.get
        )
        table_data.append([
            Paragraph(question, table_style_text),
            Paragraph(top_choice, table_style_text)
            
        ])
            
    summary_table = Table(
        table_data,
        colWidths=[300, 180]# definir ancho de la columnas
    )
    summary_table.hAlign = 'CENTER'
    summary_table.setStyle(
        TableStyle([
            ('BACKGROUND',(0,0),(-1,0), '#1E3A8A'), #(0,0)-> inicio(-1-0)-> toda la primera fila
            ('TEXTCOLOR',(0,0),(-1,0), 'white'), #texto blanco en encabezado
            ('ALIGN',(0,0),(-1,-1), 'CENTER'), #centrar todo
            ('FONTNAME',(0,0),(-1,0), 'Helvetica-Bold'),# encabezado en negrita
            ('BOTTOMPADDING',(0,0),(-1,0), 12),# mas espacio interno
            ('LEFTPADDING',(0,0),(-1,-1), 10),
            ('RIGHTPADDING',(0,0),(-1,-1), 10),
            ('TOPPADDING',(0,0),(-1,-1), 8),
            ('BOTTOMPADDING',(0,0),(-1,0), 8),
            ('GRID',(0,0),(-1,-1),1, 'black'),# dibuja bordes de la tabla
            ('VALIGN',(0,0),(-1,-1), 'MIDDLE'),
            
        ])
    )
    elements.append(summary_table)

    doc.build(
        elements,
        onFirstPage=add_page_footer, # Pie en la primera hoja
        onLaterPages=add_page_footer # Pie en las demás hoja
    )
    
    return pdf_path

#function para el pie de pagina
def add_page_footer(canvas, doc):
    canvas.saveState() # canvas hoja del pdf y doc-> documento completo
    #saveState()-> guarda configuration inicial
    footer_text = "Presidencia Municipal - Evaluación de Desempeño" # texto del pie
    canvas.setFont("Helvetica", 10) # -> fuente y tamaño
    canvas.drawString( #-> coordenadas x , y (200,20-> muy abajo de la hoja)
        200,
        20,
        footer_text
    )
    canvas.drawString(
        500,
        20,
        f"Página {doc.page}"#->obtienen number actual de la página
    )
    canvas.restoreState() # -> Restaura configuration original
    

# function para traer lo empleados por sexo para la gráfica circular
def get_employees_gender_stats():
    data = {}
    employees = Employees.objects.all()
    
    for employee in employees:
        gender = employee.gender
        if gender not in data:
            data[gender] = 0
        data[gender] += 1
    return data

# function para generar archivos de excel
def generate_employees_excel():
    #crear el libro de excel
    wb = Workbook()
    #activamos la hoja de excel
    ws = wb.active
    #nombre de la hoja
    ws.title = "Empleados"
    #crear encabezados para agregarlos a la primera fila
    ws.append([
        'Nombre',
        "Puesto",
        'Número de Nómina',
        'Sexo',
        'Número de Sindicato',
        'Fecha de Registro'
        
    ])
    #agregamos en negrita los encabezados
    header_font = Font(bold=True)
    for cell in ws[1]:# aplicamos a la fila 1
        cell.font = header_font
    # utilizamos el modelo de empleados
    employees = Employees.objects.all()
    # luego recorremos cada empleado para leer los datos de la tabla
    for employee in employees:
        #agregamos el contenido a cada fila
        ws.append([
            employee.name,
            employee.job_position,
            employee.payroll_number,
            employee.gender,
            employee.union_number,
            timezone.localtime(
                employee.created
            ).strftime('%d/%m/%Y')
            
        ])
    for column in ws.columns:
        max_length = 0
        column_letter = column[0].column_letter
        for cell in column:
            try:
                if len(str(cell.value)) > max_length:
                    max_length = len (str(cell.value))
            except:
                pass
        adjusted_width = max_length + 2
        ws.column_dimensions[column_letter].width = adjusted_width    
    #retornamos wb
    return wb
    
