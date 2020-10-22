import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
//Taller 2
var studentBody = document.getElementById('students');
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
// Taller 2
var btnfilterByCred = document.getElementById("button-filterByCred");
var inputMin = document.getElementById("search-min");
var inputMax = document.getElementById("search-max");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCred.onclick = function () { return filtroCreditos(); };
renderCoursesInTable(dataCourses);
desplegarAtributos(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
//
function desplegarAtributos(students) {
    console.log('Desplegando atributos estudiante');
    students.forEach(function (student) {
        var ele1 = document.createElement("tr");
        ele1.innerHTML = "<td> C\u00E9dula: </td> <td>" + student.cedula + "</td>\n    ";
        var ele2 = document.createElement("tr");
        ele2.innerHTML = "<td> Edad: </td> <td>" + student.edad + "</td>\n    ";
        var ele3 = document.createElement("tr");
        ele3.innerHTML = "<td> Direcci\u00F3n: </td> <td>" + student.direccion + "</td>\n    ";
        var ele4 = document.createElement("tr");
        ele4.innerHTML = "<td> Tel\u00E9fono: </td> <td>" + student.telefono + "</td>\n    ";
        studentBody.appendChild(ele1);
        studentBody.appendChild(ele2);
        studentBody.appendChild(ele3);
        studentBody.appendChild(ele4);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
// creditos
function filtroCreditos() {
    var min = inputMin.value;
    var max = inputMax.value;
    var a;
    var b;
    if (min == null || max == null) {
        a = 0;
        b = 30;
    }
    else {
        a = Number(min);
        b = Number(max);
    }
    clearCoursesInTable();
    //For each
    var coursesFiltered = searchIntervalo(a, b, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchIntervalo(min, max, courses) {
    return courses.filter(function (c) {
        return c.credits >= min && c.credits <= max;
    });
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
