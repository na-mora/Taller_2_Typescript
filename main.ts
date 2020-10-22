import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

// Taller 2
import {Student} from './student.js';
import {dataStudent} from './dataStudent.js';

//Taller 2
const studentBody: HTMLElement = document.getElementById('students')!;


const coursesTbody: HTMLElement = document.getElementById('courses')!;


const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
// Taller 2
const btnfilterByCred: HTMLElement = document.getElementById("button-filterByCred")!;
const inputMin: HTMLInputElement = <HTMLInputElement> document.getElementById("search-min")!;
const inputMax: HTMLInputElement = <HTMLInputElement> document.getElementById("search-max")!;


const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;



btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCred.onclick = ()=> filtroCreditos();

renderCoursesInTable(dataCourses);
desplegarAtributos(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
//
function desplegarAtributos(students: Student[]): void{
  console.log('Desplegando atributos estudiante');
  students.forEach((student)=>{
    let ele1 = document.createElement("tr");
    ele1.innerHTML =`<td> Cédula: </td> <td>${student.cedula}</td>
    `;
    let ele2 = document.createElement("tr");
    ele2.innerHTML =`<td> Edad: </td> <td>${student.edad}</td>
    `;
    let ele3 = document.createElement("tr");
    ele3.innerHTML =`<td> Dirección: </td> <td>${student.direccion}</td>
    `;
    let ele4 = document.createElement("tr");
    ele4.innerHTML =`<td> Teléfono: </td> <td>${student.telefono}</td>
    `;

    studentBody.appendChild(ele1);
    studentBody.appendChild(ele2);
    studentBody.appendChild(ele3);
    studentBody.appendChild(ele4);

  });
}



 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

// creditos
function filtroCreditos()
{
  let min = inputMin.value;
  let max = inputMax.value;
  let a : number;
  let b: number;
  if(min == null ||max == null){
    a = 0;
    b=30;
  }
  else 
  {
    a=Number(min)
    b=Number(max);
  }
  
  clearCoursesInTable();
  //For each
  let coursesFiltered: Course[] = searchIntervalo(a,b, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchIntervalo(min: number,max: number, courses: Course[]) 
{
  return courses.filter(c=>
    c.credits >= min && c.credits <= max)
  
}



function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number 
{
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}